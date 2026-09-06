import React, { useState } from 'react';
import { PhoneContainer } from './components/PhoneContainer';
import { IntentInput } from './components/IntentInput';
import { ReasoningLoopView } from './components/ReasoningLoopView';
import { GraphVisualizer } from './components/GraphVisualizer';
import { BrainViewModal } from './components/BrainViewModal';
import { DifferentiationCard } from './components/DifferentiationCard';
import { TransformationBar } from './components/TransformationBar';
import { FinalBanner } from './components/FinalBanner';

import { FlatHuntWorkspace } from './workspaces/FlatHuntWorkspace';
import { LaptopWorkspace } from './workspaces/LaptopWorkspace';
import { MaintenanceWorkspace } from './workspaces/MaintenanceWorkspace';
import { GoaTripWorkspace } from './workspaces/GoaTripWorkspace';
import { CustomWorkspace } from './workspaces/CustomWorkspace';

import { loopControllerInstance } from './loop/loopController';
import { secondBrainInstance } from './memory/secondBrain';
import type { DynamicGraph, SharedSystemState } from './types';

export const App: React.FC = () => {
  const [systemState, setSystemState] = useState<SharedSystemState>({
    intent: '',
    goalCategory: 'custom',
    userContext: secondBrainInstance.getContext(),
    tasks: [],
    evidence: {},
    confidenceScore: 0,
    blockers: [],
    nextAction: 'Awaiting User Intent',
    activePhase: 'IDLE',
    logs: []
  });

  const [currentGraph, setCurrentGraph] = useState<DynamicGraph | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [brainViewOpen, setBrainViewOpen] = useState(false);

  const handleRunIntent = async (intent: string) => {
    setIsProcessing(true);

    try {
      await loopControllerInstance.executeReasoningLoop(intent, (updatedState, graph, stepIndex) => {
        setSystemState(updatedState);
        setCurrentGraph(graph);
        setActiveStepIndex(stepIndex);
      });
    } catch (err) {
      console.error('Error executing reasoning loop:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetGoal = () => {
    setSystemState({
      intent: '',
      goalCategory: 'custom',
      userContext: secondBrainInstance.getContext(),
      tasks: [],
      evidence: {},
      confidenceScore: 0,
      blockers: [],
      nextAction: 'Awaiting User Intent',
      activePhase: 'IDLE',
      logs: []
    });
    setCurrentGraph(null);
    setActiveStepIndex(0);
  };

  return (
    <PhoneContainer
      onOpenBrainView={() => setBrainViewOpen(true)}
      onReset={handleResetGoal}
      confidenceScore={systemState.confidenceScore}
    >
      {/* PHASE 1: IDLE / INTENT INPUT */}
      {systemState.activePhase === 'IDLE' && (
        <div className="space-y-4">
          <IntentInput onSubmitIntent={handleRunIntent} isProcessing={isProcessing} />
          <DifferentiationCard />
          <TransformationBar 
            currentCategory={systemState.goalCategory} 
            onTransform={handleRunIntent} 
            isProcessing={isProcessing} 
          />
          <FinalBanner />
        </div>
      )}

      {/* PHASE 2: REASONING LOOP STREAM */}
      {(systemState.activePhase === 'PLANNING' || isProcessing) && (
        <div className="space-y-4">
          <ReasoningLoopView 
            state={systemState} 
            graph={currentGraph} 
            activeStepIndex={activeStepIndex} 
          />
          {currentGraph && <GraphVisualizer graph={currentGraph} />}
          <DifferentiationCard />
        </div>
      )}

      {/* PHASE 3: WORKSPACE GENERATED & READY */}
      {systemState.activePhase === 'WORKSPACE_READY' && !isProcessing && (
        <div className="space-y-4">
          <TransformationBar 
            currentCategory={systemState.goalCategory} 
            onTransform={handleRunIntent} 
            isProcessing={isProcessing} 
          />

          {/* DYNAMIC GENERATED WORKSPACES */}
          {systemState.goalCategory === 'flat_hunt' && (
            <FlatHuntWorkspace 
              userContext={systemState.userContext} 
              onResetGoal={handleResetGoal} 
            />
          )}

          {systemState.goalCategory === 'laptop_buy' && (
            <LaptopWorkspace 
              userContext={systemState.userContext} 
              onResetGoal={handleResetGoal} 
            />
          )}

          {systemState.goalCategory === 'sink_leak' && (
            <MaintenanceWorkspace 
              userContext={systemState.userContext} 
              onResetGoal={handleResetGoal} 
            />
          )}

          {systemState.goalCategory === 'goa_trip' && (
            <GoaTripWorkspace 
              userContext={systemState.userContext} 
              onResetGoal={handleResetGoal} 
            />
          )}

          {systemState.goalCategory === 'custom' && (
            <CustomWorkspace 
              intentRaw={systemState.intent} 
              userContext={systemState.userContext} 
              onResetGoal={handleResetGoal} 
            />
          )}

          <DifferentiationCard />
          <FinalBanner />
        </div>
      )}

      {/* DEVELOPER BRAIN VIEW MODAL */}
      <BrainViewModal 
        isOpen={brainViewOpen} 
        onClose={() => setBrainViewOpen(false)} 
        state={systemState} 
        graph={currentGraph} 
      />
    </PhoneContainer>
  );
};

export default App;
