import { agentSystemInstance } from '../agents/agentSystem';
import { graphEngineInstance } from '../graph/graphEngine';
import { secondBrainInstance } from '../memory/secondBrain';
import type { AgentStructuredMessage, DynamicGraph, SharedSystemState, TaskNode } from '../types';

export interface LoopStepCallback {
  (state: SharedSystemState, currentGraph: DynamicGraph, activeStepIndex: number): void;
}

export class LoopController {
  private state: SharedSystemState;

  constructor() {
    this.state = this.createInitialState('');
  }

  private createInitialState(intent: string): SharedSystemState {
    return {
      intent,
      goalCategory: 'custom',
      userContext: secondBrainInstance.getContext(),
      tasks: [],
      evidence: {},
      confidenceScore: 0,
      blockers: [],
      nextAction: 'Awaiting User Intent',
      activePhase: 'IDLE',
      logs: []
    };
  }

  public async executeReasoningLoop(
    intent: string,
    onProgress: LoopStepCallback
  ): Promise<{ finalState: SharedSystemState; graph: DynamicGraph }> {
    const graph = graphEngineInstance.generateGraphFromIntent(intent);
    const userContext = secondBrainInstance.getContext();

    this.state = {
      intent,
      goalCategory: graph.category,
      userContext,
      tasks: graph.nodes,
      evidence: {},
      confidenceScore: 0,
      blockers: [],
      nextAction: 'Initializing Autonomous Workflow Graph...',
      activePhase: 'PLANNING',
      logs: []
    };

    onProgress({ ...this.state }, { ...graph }, 0);
    await this.delay(500);

    // STEP 1: PLAN (Orchestrator)
    this.updateNodeStatus(graph, 0, 'running');
    const msg1 = agentSystemInstance.runOrchestrator(intent, graph.category, userContext);
    this.appendLogAndScore(msg1);
    this.updateNodeStatus(graph, 0, 'completed');
    this.state.nextAction = 'Scouting Candidate Options...';
    onProgress({ ...this.state }, { ...graph }, 0);
    await this.delay(600);

    // STEP 2: SEARCH (Research Agent)
    if (graph.nodes.length > 1) {
      this.updateNodeStatus(graph, 1, 'running');
      const msg2 = agentSystemInstance.runResearchAgent(graph.category);
      this.appendLogAndScore(msg2);
      this.updateNodeStatus(graph, 1, 'completed');
      this.state.nextAction = 'Contacting Owner / Verification Agent...';
      onProgress({ ...this.state }, { ...graph }, 1);
      await this.delay(600);
    }

    // STEP 3: CONTACT OWNER (Communication Agent)
    if (graph.nodes.length > 2) {
      this.updateNodeStatus(graph, 2, 'running');
      const msg3 = agentSystemInstance.runCommunicationAgent('Mr. Sharma');
      this.appendLogAndScore(msg3);
      this.updateNodeStatus(graph, 2, 'completed');
      this.state.nextAction = 'Analyzing Photo Stream (Vision Agent)...';
      onProgress({ ...this.state }, { ...graph }, 2);
      await this.delay(600);
    }

    // STEP 4: VISION ANALYSIS (Vision Agent)
    if (graph.nodes.length > 4) {
      this.updateNodeStatus(graph, 4, 'running');
      const msg4 = agentSystemInstance.runVisionAgent();
      this.appendLogAndScore(msg4);
      this.updateNodeStatus(graph, 4, 'completed');
      this.state.nextAction = 'Matching Evidence against Second Brain...';
      onProgress({ ...this.state }, { ...graph }, 4);
      await this.delay(600);
    }

    // STEP 5: COMPARE PREFERENCES & IDENTIFY UNCERTAINTY (Evaluator Agent)
    if (graph.nodes.length > 6) {
      this.updateNodeStatus(graph, 6, 'running');
      const msg5 = agentSystemInstance.runEvaluatorAgent();
      this.appendLogAndScore(msg5);
      this.updateNodeStatus(graph, 6, 'completed');
      this.state.nextAction = 'Compiling Purpose-Built Dynamic Workspace...';
      onProgress({ ...this.state }, { ...graph }, 6);
      await this.delay(500);
    }

    // FINAL STEP: RECOMMENDATION READY
    const lastIdx = graph.nodes.length - 1;
    this.updateNodeStatus(graph, lastIdx, 'running');
    const msgFinal = agentSystemInstance.runActionAgent();
    this.appendLogAndScore(msgFinal);
    this.updateNodeStatus(graph, lastIdx, 'completed');

    this.state.activePhase = 'WORKSPACE_READY';
    this.state.confidenceScore = 76; // Initial score before resolving missing bathroom photo!
    this.state.nextAction = 'Review Verified IntentOS Workspace';

    onProgress({ ...this.state }, { ...graph }, lastIdx);
    return { finalState: this.state, graph };
  }

  private updateNodeStatus(graph: DynamicGraph, index: number, status: TaskNode['status']) {
    if (graph.nodes[index]) {
      graph.nodes[index].status = status;
    }
  }

  private appendLogAndScore(msg: AgentStructuredMessage) {
    this.state.logs.push(msg);
    this.state.confidenceScore = Math.min(95, this.state.confidenceScore + msg.confidenceDelta);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const loopControllerInstance = new LoopController();
