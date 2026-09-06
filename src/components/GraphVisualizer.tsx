import React from 'react';
import type { DynamicGraph, TaskNode } from '../types';
import { GitCommit, Check, Loader2 } from 'lucide-react';

interface Props {
  graph: DynamicGraph;
  onSelectNode?: (node: TaskNode) => void;
}

export const GraphVisualizer: React.FC<Props> = ({ graph, onSelectNode }) => {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-3xl p-4 space-y-3 relative overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <GitCommit className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">{graph.title} Task Graph</h3>
        </div>
        <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
          {graph.nodes.length} Nodes • DAG Pipeline
        </span>
      </div>

      <div className="relative py-2 space-y-3">
        {graph.nodes.map((node, index) => {
          const isCompleted = node.status === 'completed';
          const isRunning = node.status === 'running';

          return (
            <div key={node.id} className="relative flex items-center gap-3">
              {index < graph.nodes.length - 1 && (
                <div 
                  className={`absolute left-3.5 top-8 w-0.5 h-6 z-0 transition-colors duration-500 ${
                    isCompleted ? 'bg-cyan-400' : 'bg-slate-800'
                  }`}
                ></div>
              )}

              <div 
                className={`w-7 h-7 rounded-full z-10 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/50 ring-2 ring-cyan-400' 
                    : isRunning 
                    ? 'bg-amber-400 text-slate-950 animate-pulse ring-4 ring-amber-400/30' 
                    : 'bg-slate-900 border border-slate-700 text-slate-500'
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : isRunning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : index + 1}
              </div>

              <div 
                onClick={() => onSelectNode && onSelectNode(node)}
                className={`flex-1 p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                  isRunning 
                    ? 'bg-cyan-950/60 border-cyan-500 text-white' 
                    : isCompleted 
                    ? 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700' 
                    : 'bg-slate-950/60 border-slate-900 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">{node.title}</span>
                  <span className="text-[9px] text-cyan-400 font-mono">{node.agentRole}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
