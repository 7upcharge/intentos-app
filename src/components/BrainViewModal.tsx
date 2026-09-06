import React, { useState } from 'react';
import { X, Brain, Code, Terminal, GitFork, ArrowDown } from 'lucide-react';
import type { DynamicGraph, SharedSystemState } from '../types';
import { GraphVisualizer } from './GraphVisualizer';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  state: SharedSystemState;
  graph: DynamicGraph | null;
}

export const BrainViewModal: React.FC<Props> = ({ isOpen, onClose, state, graph }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'agent_bus' | 'state_json' | 'second_brain'>('architecture');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 p-4 flex items-center justify-center">
      <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-scale-up">
        {/* Modal Header */}
        <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white tracking-wide flex items-center gap-2">
                Developer "Brain View" Inspector
              </h2>
              <p className="text-xs text-slate-400">
                Under-the-hood System Telemetry & Reasoning Engine Inspection
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-slate-950 px-4 pt-2 border-b border-slate-800 gap-2 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-2 px-3 rounded-t-xl border-t border-x transition flex items-center gap-1.5 ${
              activeTab === 'architecture' 
                ? 'bg-slate-900 border-cyan-500/50 text-cyan-400 font-bold' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <GitFork className="w-3.5 h-3.5" /> Architecture Pipeline
          </button>
          <button
            onClick={() => setActiveTab('agent_bus')}
            className={`py-2 px-3 rounded-t-xl border-t border-x transition flex items-center gap-1.5 ${
              activeTab === 'agent_bus' 
                ? 'bg-slate-900 border-cyan-500/50 text-cyan-400 font-bold' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" /> Agent Message Bus ({state.logs.length})
          </button>
          <button
            onClick={() => setActiveTab('state_json')}
            className={`py-2 px-3 rounded-t-xl border-t border-x transition flex items-center gap-1.5 ${
              activeTab === 'state_json' 
                ? 'bg-slate-900 border-cyan-500/50 text-cyan-400 font-bold' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" /> Shared State JSON
          </button>
          <button
            onClick={() => setActiveTab('second_brain')}
            className={`py-2 px-3 rounded-t-xl border-t border-x transition flex items-center gap-1.5 ${
              activeTab === 'second_brain' 
                ? 'bg-slate-900 border-cyan-500/50 text-cyan-400 font-bold' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Brain className="w-3.5 h-3.5" /> Second Brain Memory
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          {/* TAB 1: ARCHITECTURE PIPELINE */}
          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">1. User Intent</span>
                <p className="text-sm font-bold text-white">"{state.intent || 'No active intent'}"</p>
              </div>

              <div className="flex justify-center">
                <ArrowDown className="w-4 h-4 text-cyan-400 animate-bounce" />
              </div>

              {graph && <GraphVisualizer graph={graph} />}

              <div className="flex justify-center">
                <ArrowDown className="w-4 h-4 text-cyan-400 animate-bounce" />
              </div>

              <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-2">
                <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">3. Multi-Agent State Engine</span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                    <span className="text-cyan-400 font-bold block">Orchestrator ✓</span>
                    <span className="text-[9px] text-slate-500">Goal Graph</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                    <span className="text-cyan-400 font-bold block">Research ✓</span>
                    <span className="text-[9px] text-slate-500">Data Scraper</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                    <span className="text-cyan-400 font-bold block">Preference ✓</span>
                    <span className="text-[9px] text-slate-500">Second Brain</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                    <span className="text-cyan-400 font-bold block">Collaboration ✓</span>
                    <span className="text-[9px] text-slate-500">Roommate Sync</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                    <span className="text-cyan-400 font-bold block">Evaluator ✓</span>
                    <span className="text-[9px] text-slate-500">Score Matcher</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                    <span className="text-cyan-400 font-bold block">Action ✓</span>
                    <span className="text-[9px] text-slate-500">Software Compiler</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowDown className="w-4 h-4 text-cyan-400 animate-bounce" />
              </div>

              <div className="bg-gradient-to-r from-cyan-950 to-indigo-950 border border-cyan-500/50 p-3.5 rounded-2xl text-center space-y-1">
                <span className="text-[10px] text-cyan-300 font-mono uppercase font-bold">4. Purpose-Built Generated Workspace</span>
                <p className="text-sm font-extrabold text-white uppercase">{state.goalCategory.replace('_', ' ')} WORKSPACE READY</p>
              </div>
            </div>
          )}

          {/* TAB 2: AGENT MESSAGE BUS */}
          {activeTab === 'agent_bus' && (
            <div className="space-y-3 font-mono">
              {state.logs.map((log, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 p-3 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-cyan-400 font-bold">{log.agentName}</span>
                    <span className="text-slate-500">{log.timestamp} • Phase: {log.phase}</span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans">{log.findings}</p>
                  <pre className="bg-slate-900 p-2 rounded-lg text-[10px] text-emerald-400 overflow-x-auto">
                    {JSON.stringify(log.structuredPayload, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: SHARED STATE JSON */}
          {activeTab === 'state_json' && (
            <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl font-mono text-[11px]">
              <pre className="text-cyan-300 overflow-x-auto leading-relaxed">
                {JSON.stringify({
                  intent: state.intent,
                  category: state.goalCategory,
                  confidenceScore: state.confidenceScore,
                  activePhase: state.activePhase,
                  userProfile: {
                    name: state.userContext.name,
                    budget: state.userContext.budgetRange,
                    parkingRequired: state.userContext.parkingRequired
                  },
                  tasksCount: state.tasks.length,
                  nextAction: state.nextAction
                }, null, 2)}
              </pre>
            </div>
          )}

          {/* TAB 4: SECOND BRAIN MEMORY */}
          {activeTab === 'second_brain' && (
            <div className="space-y-3">
              <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-2">
                <h4 className="font-bold text-white">Active User Profile Context</h4>
                <div className="grid grid-cols-2 gap-2 text-slate-300 text-xs">
                  <div>Name: <span className="text-white font-semibold">{state.userContext.name}</span></div>
                  <div>Budget: <span className="text-emerald-400 font-semibold">{state.userContext.budgetRange}</span></div>
                  <div>Location: <span className="text-cyan-300 font-semibold">{state.userContext.preferredLocation}</span></div>
                  <div>Parking: <span className="text-amber-400 font-semibold">{state.userContext.parkingRequired ? 'Mandatory' : 'Optional'}</span></div>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl space-y-2">
                <h4 className="font-bold text-white">Past Learned Decisions (History Memory)</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs">
                  {state.userContext.pastDecisions.map((dec, i) => (
                    <li key={i}>{dec}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
