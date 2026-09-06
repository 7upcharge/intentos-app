import React from 'react';
import { Brain } from 'lucide-react';

export const FinalBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/40 rounded-3xl p-6 text-center space-y-4 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-emerald-500/5 pointer-events-none"></div>

      <div className="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
        <Brain className="w-3.5 h-3.5" /> IntentOS Thesis
      </div>

      <div className="space-y-1">
        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">PEOPLE DON'T THINK:</p>
        <p className="text-sm font-extrabold text-slate-300 italic">"WHICH APP SHOULD I USE?"</p>
      </div>

      <div className="space-y-1 pt-1">
        <p className="text-xs text-cyan-400 uppercase font-bold tracking-wider">THEY THINK:</p>
        <h2 className="text-lg font-black text-white tracking-tight">"I NEED TO GET THIS DONE."</h2>
      </div>

      <div className="pt-3 border-t border-slate-800/80">
        <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 tracking-wider">
          INTENTOS
        </span>
        <p className="text-xs text-slate-300 font-semibold mt-1">
          YOUR SECOND BRAIN BUILDS THE REST.
        </p>
      </div>
    </div>
  );
};
