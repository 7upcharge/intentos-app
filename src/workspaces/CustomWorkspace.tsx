import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ListTodo, Plus, Zap } from 'lucide-react';
import type { UserContext } from '../types';

interface Props {
  intentRaw: string;
  userContext: UserContext;
  onResetGoal: () => void;
}

export const CustomWorkspace: React.FC<Props> = ({ intentRaw, userContext, onResetGoal }) => {
  const [items, setItems] = useState([
    { id: 1, text: 'Analyze key constraints & Second Brain budget rules', done: true },
    { id: 2, text: 'Evaluate 3 optimal solution pathways', done: true },
    { id: 3, text: 'Execute automated multi-agent coordination check', done: false },
    { id: 4, text: 'Finalize action items & user approval state', done: false }
  ]);
  const [newItem, setNewItem] = useState('');

  const toggleItem = (id: number) => {
    setItems(prev => prev.map(x => x.id === id ? { ...x, done: !x.done } : x));
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    setItems(prev => [...prev, { id: Date.now(), text: newItem.trim(), done: false }]);
    setNewItem('');
  };

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      <div className="bg-gradient-to-r from-cyan-950/90 via-slate-900 to-blue-950/90 border border-cyan-500/30 rounded-2xl p-4 shadow-xl relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 w-fit mb-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Dynamic Custom Workspace
            </span>
            <h2 className="text-lg font-extrabold text-white tracking-tight leading-snug">
              "{intentRaw}"
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Synthesized by Action Agent for <span className="text-slate-200 font-semibold">{userContext.name}</span>
            </p>
          </div>
          <button 
            onClick={onResetGoal}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 font-medium transition"
          >
            New Goal
          </button>
        </div>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-3">
        <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
          <ListTodo className="w-4 h-4 text-cyan-400" /> Generated Dynamic Workflow Checklist
        </h3>

        <div className="space-y-2 text-xs">
          {items.map(item => (
            <div 
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition ${
                item.done ? 'bg-cyan-950/40 border-cyan-800 text-slate-400 line-through' : 'bg-slate-800/60 border-slate-700 text-white'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${item.done ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        <form onSubmit={addItem} className="flex gap-2 text-xs">
          <input 
            type="text" 
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add custom task or parameter..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500" 
          />
          <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold px-3 py-2 rounded-xl transition">
            <Plus className="w-4 h-4" />
          </button>
        </form>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-2">
        <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-amber-400" /> System Confidence Metrics
        </h3>
        <div className="grid grid-cols-2 gap-2 text-xs text-center">
          <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700">
            <span className="text-[10px] text-slate-400 block">Agent Consensus</span>
            <span className="font-bold text-emerald-400 text-sm">95% High</span>
          </div>
          <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700">
            <span className="text-[10px] text-slate-400 block">Execution Speed</span>
            <span className="font-bold text-cyan-400 text-sm">Instant / Local</span>
          </div>
        </div>
      </div>
    </div>
  );
};
