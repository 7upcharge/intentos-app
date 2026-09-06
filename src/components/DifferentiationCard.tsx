import React from 'react';
import { MessageSquare, Bot, Sparkles } from 'lucide-react';

export const DifferentiationCard: React.FC = () => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 space-y-3 shadow-xl">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <Sparkles className="w-4 h-4 text-cyan-400" />
        <h3 className="text-xs font-extrabold text-white tracking-wider uppercase">
          Why IntentOS is Different
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-2 text-[11px]">
        <div className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-2xl space-y-1">
          <div className="flex items-center gap-1 text-slate-400 font-bold text-[10px]">
            <MessageSquare className="w-3 h-3 text-slate-500" /> TRADITIONAL AI
          </div>
          <p className="text-[11px] text-slate-400 leading-snug font-medium">
            Answers your question with text.
          </p>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-2xl space-y-1">
          <div className="flex items-center gap-1 text-blue-400 font-bold text-[10px]">
            <Bot className="w-3 h-3 text-blue-400" /> AI AGENT
          </div>
          <p className="text-[11px] text-slate-400 leading-snug font-medium">
            Uses existing tools to execute tasks.
          </p>
        </div>

        <div className="bg-gradient-to-br from-cyan-950 to-blue-950 border border-cyan-500/50 p-2.5 rounded-2xl space-y-1 shadow-lg shadow-cyan-950/40">
          <div className="flex items-center gap-1 text-cyan-300 font-black text-[10px]">
            <Sparkles className="w-3 h-3 text-cyan-400 fill-cyan-400" /> INTENTOS
          </div>
          <p className="text-[11px] text-white font-bold leading-snug">
            Understands goal, builds workflow, & creates the software tool.
          </p>
        </div>
      </div>
    </div>
  );
};
