import React from 'react';
import { Building2, Laptop, Wrench, Palmtree, Brain } from 'lucide-react';
import type { GoalCategory } from '../types';

interface Props {
  currentCategory: GoalCategory;
  onTransform: (intent: string) => void;
  isProcessing: boolean;
}

export const TransformationBar: React.FC<Props> = ({ currentCategory, onTransform, isProcessing }) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-3.5 space-y-2.5 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-cyan-500/20 text-cyan-400">
            <Brain className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-black text-white tracking-wide uppercase">Same Brain. Different Goal.</h3>
            <p className="text-[10px] text-slate-400">The same engine generates entirely different workspaces for any intent.</p>
          </div>
        </div>
        <span className="text-[9px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded-full font-bold">
          1-Click Morph
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
        <button
          onClick={() => onTransform('Find me a flat under ₹20K near college, with parking, for me and my roommate.')}
          disabled={isProcessing}
          className={`p-2.5 rounded-2xl border text-left transition flex flex-col justify-between ${
            currentCategory === 'flat_hunt'
              ? 'bg-cyan-950 border-cyan-500 text-white font-bold shadow-md shadow-cyan-950/50'
              : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Building2 className={`w-4 h-4 mb-1 ${currentCategory === 'flat_hunt' ? 'text-cyan-400' : 'text-slate-500'}`} />
          <div>
            <span className="block font-bold text-xs">Flat Verification</span>
            <span className="text-[9px] text-slate-500">Hero Takeover</span>
          </div>
        </button>

        <button
          onClick={() => onTransform('I need to buy a laptop for college and coding.')}
          disabled={isProcessing}
          className={`p-2.5 rounded-2xl border text-left transition flex flex-col justify-between ${
            currentCategory === 'laptop_buy'
              ? 'bg-blue-950 border-blue-500 text-white font-bold shadow-md shadow-blue-950/50'
              : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Laptop className={`w-4 h-4 mb-1 ${currentCategory === 'laptop_buy' ? 'text-blue-400' : 'text-slate-500'}`} />
          <div>
            <span className="block font-bold text-xs">Laptop Buying</span>
            <span className="text-[9px] text-slate-500">Warranty Check</span>
          </div>
        </button>

        <button
          onClick={() => onTransform('My kitchen sink is leaking and needs repair.')}
          disabled={isProcessing}
          className={`p-2.5 rounded-2xl border text-left transition flex flex-col justify-between ${
            currentCategory === 'sink_leak'
              ? 'bg-amber-950 border-amber-500 text-white font-bold shadow-md shadow-amber-950/50'
              : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Wrench className={`w-4 h-4 mb-1 ${currentCategory === 'sink_leak' ? 'text-amber-400' : 'text-slate-500'}`} />
          <div>
            <span className="block font-bold text-xs">Sink Repair</span>
            <span className="text-[9px] text-slate-500">Vision Diagnosis</span>
          </div>
        </button>

        <button
          onClick={() => onTransform('I need to plan a 4-day Goa trip with 3 friends under ₹15K each.')}
          disabled={isProcessing}
          className={`p-2.5 rounded-2xl border text-left transition flex flex-col justify-between ${
            currentCategory === 'goa_trip'
              ? 'bg-emerald-950 border-emerald-500 text-white font-bold shadow-md shadow-emerald-950/50'
              : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Palmtree className={`w-4 h-4 mb-1 ${currentCategory === 'goa_trip' ? 'text-emerald-400' : 'text-slate-500'}`} />
          <div>
            <span className="block font-bold text-xs">Goa Trip</span>
            <span className="text-[9px] text-slate-500">Group Split</span>
          </div>
        </button>
      </div>
    </div>
  );
};
