import type { AgentStructuredMessage, GoalCategory, UserContext } from '../types';

export class MultiAgentSystem {
  public runOrchestrator(
    intent: string,
    category: GoalCategory,
    userContext: UserContext
  ): AgentStructuredMessage {
    const timestamp = new Date().toLocaleTimeString();

    return {
      agentName: 'Orchestrator Agent',
      role: 'orchestrator',
      timestamp,
      phase: 'PLAN',
      findings: `Goal decomposed for [${category.toUpperCase()}]. Initiated multi-agent verification DAG.`,
      structuredPayload: {
        rawIntent: intent,
        goalCategory: category,
        user: userContext.name,
        targetBudget: userContext.budgetRange
      },
      confidenceDelta: 15
    };
  }

  public runResearchAgent(category: GoalCategory): AgentStructuredMessage {
    const timestamp = new Date().toLocaleTimeString();
    return {
      agentName: 'Research Agent',
      role: 'research',
      timestamp,
      phase: 'OBSERVE',
      findings: category === 'flat_hunt' 
        ? 'Scraped candidate properties. Identified Skyline Heights 2BHK as top 92% match candidate.'
        : category === 'laptop_buy'
        ? 'Scraped 15 tech retailers. Identified MacBook Air M2 & Asus ROG G15 as candidates.'
        : category === 'sink_leak'
        ? 'Diagnosed plumbing leak issue. Found 3 licensed emergency plumbers near campus.'
        : 'Found candidate options matching target parameters.',
      structuredPayload: { candidateFound: true, totalScraped: 18 },
      confidenceDelta: 15
    };
  }

  public runCommunicationAgent(ownerName: string): AgentStructuredMessage {
    const timestamp = new Date().toLocaleTimeString();
    return {
      agentName: 'Communication Agent',
      role: 'communication',
      timestamp,
      phase: 'VERIFY',
      findings: `Initiated direct automated inquiry with ${ownerName}. Verified rent (₹18.5K), deposit (₹35K), and availability. Requested photos.`,
      structuredPayload: {
        ownerContacted: ownerName,
        rentVerified: true,
        parkingConfirmed: true,
        photosRequested: true
      },
      confidenceDelta: 20
    };
  }

  public runVisionAgent(): AgentStructuredMessage {
    const timestamp = new Date().toLocaleTimeString();
    return {
      agentName: 'Vision Agent',
      role: 'vision',
      timestamp,
      phase: 'VERIFY',
      findings: 'Analyzed received photo stream. Living room, bedroom, kitchen & parking slot verified. Flagged missing bathroom photo.',
      structuredPayload: {
        photosAnalyzedCount: 4,
        verifiedRooms: ['Living Room', 'Bedroom', 'Kitchen', 'Parking'],
        flaggedUncertainty: 'Bathroom photo missing'
      },
      confidenceDelta: 20
    };
  }

  public runPreferenceAgent(userContext: UserContext): AgentStructuredMessage {
    const timestamp = new Date().toLocaleTimeString();
    return {
      agentName: 'Preference Agent',
      role: 'preference',
      timestamp,
      phase: 'EVALUATE',
      findings: `Cross-referenced Second Brain: ₹18.5K is within ${userContext.budgetRange}. Dedicated parking slot verified.`,
      structuredPayload: {
        budgetCheck: 'Pass',
        parkingCheck: 'Pass',
        distanceCheck: '1.2 km (Pass)'
      },
      confidenceDelta: 15
    };
  }

  public runEvaluatorAgent(): AgentStructuredMessage {
    const timestamp = new Date().toLocaleTimeString();
    return {
      agentName: 'Evaluator Agent',
      role: 'evaluator',
      timestamp,
      phase: 'REFINE',
      findings: 'Calculated 92% match score. Detected 1 uncertainty: Bathroom condition. Prompting follow-up trigger.',
      structuredPayload: {
        matchScore: 92,
        missingInfoCount: 1,
        uncertaintyItem: 'Bathroom condition'
      },
      confidenceDelta: 10
    };
  }

  public runActionAgent(): AgentStructuredMessage {
    const timestamp = new Date().toLocaleTimeString();
    return {
      agentName: 'Action Agent',
      role: 'action',
      timestamp,
      phase: 'ACT',
      findings: 'Compiled verified Dynamic Workspace. Generated Schedule Visit & Ask Owner action buttons.',
      structuredPayload: { workspaceCompiled: true },
      confidenceDelta: 5
    };
  }
}

export const agentSystemInstance = new MultiAgentSystem();
