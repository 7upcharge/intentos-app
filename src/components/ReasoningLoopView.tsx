import React from 'react';
import { CheckCircle2, Loader2, ArrowRight, Activity } from 'lucide-react';
import type { DynamicGraph, SharedSystemState } from '../types';

interface Props {
  state: SharedSystemState;
  graph: DynamicGraph | null;
  activeStepIndex: number;
}

export const ReasoningLoopView: React.FC<Props> = ({ state, graph }) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 space-y-4 shadow-xl animate-fade-in">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></div>
          <span className="text-xs font-extrabold text-white tracking-wide uppercase flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-cyan-400" /> Loop Engine Stream
          </span>
        </div>
        <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-2.5 py-0.5 rounded-full font-bold">
          Confidence: {state.confidenceScore}%
        </span>
      </div>

      <div className="space-y-2 text-xs">
        {graph?.nodes.map((node, index) => {
          const isCompleted = node.status === 'completed';
          const isRunning = node.status === 'running';
          const isPending = node.status === 'pending';

          return (
            <div 
              key={node.id} 
              className={`p-2.5 rounded-2xl border transition-all duration-300 flex items-start gap-2.5 ${
                isRunning 
                  ? 'bg-cyan-950/70 border-cyan-500/60 shadow-lg shadow-cyan-950/30' 
                  : isCompleted 
                  ? 'bg-slate-800/50 border-slate-700/60' 
                  : 'bg-slate-950/40 border-slate-800/40 opacity-40'
              }`}
            >
              <div className="mt-0.5">
                {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                {isRunning && <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />}
                {isPending && <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[9px] text-slate-500">{index + 1}</div>}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`font-bold ${isRunning ? 'text-cyan-300' : isCompleted ? 'text-white' : 'text-slate-500'}`}>
                    {node.title}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                    {node.agentRole}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{node.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between text-xs">
        <span className="text-slate-400 font-medium">NEXT ACTION:</span>
        <span className="text-cyan-300 font-bold flex items-center gap-1">
          {state.nextAction} <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
