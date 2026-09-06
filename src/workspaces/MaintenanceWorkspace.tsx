import React, { useState } from 'react';
import { Wrench, Sparkles, CheckCircle2, Calendar } from 'lucide-react';
import type { UserContext } from '../types';

interface Props {
  userContext: UserContext;
  onResetGoal: () => void;
}

export const MaintenanceWorkspace: React.FC<Props> = ({ onResetGoal }) => {
  const [scheduled, setScheduled] = useState(false);

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      <div className="bg-gradient-to-r from-amber-950/90 via-slate-900 to-orange-950/90 border border-amber-500/40 rounded-3xl p-4 shadow-2xl relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 w-fit mb-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Dynamic Software Generated
            </span>
            <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Wrench className="w-5 h-5 text-amber-400" />
              Leaking Sink Autonomous Repair OS
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Target Location: <span className="text-slate-200 font-semibold">Campus Flat Kitchen</span>
            </p>
          </div>
          <button 
            onClick={onResetGoal}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-xl border border-slate-700 font-medium transition"
          >
            New Goal
          </button>
        </div>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="bg-amber-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full shadow-lg">
            DIAGNOSED & QUOTE VERIFIED
          </span>
          <span className="text-xs text-slate-400 font-mono">Vision Agent Diagnostic</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-2xl space-y-1">
            <span className="text-[10px] text-amber-400 font-bold uppercase block">1. Vision AI Diagnosis</span>
            <p className="text-white font-bold">Corroded P-Trap Washer Leak</p>
            <p className="text-[10px] text-slate-400">Severity: Moderate (Drip rate 15ml/min)</p>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-2xl space-y-1">
            <span className="text-[10px] text-cyan-400 font-bold uppercase block">2. Plumber Contacted</span>
            <p className="text-white font-bold">Ramesh Plumbing Services</p>
            <p className="text-[10px] text-slate-400">Licensed • 4.9★ (120 reviews)</p>
          </div>
        </div>

        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white">Negotiated Service Quote:</span>
            <span className="text-lg font-black text-emerald-400">₹450 Total</span>
          </div>
          <ul className="space-y-1 text-slate-300 text-[11px]">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Communication Agent verified quote includes replacement washer & labor</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Plumber available for 2:00 PM today</span>
            </li>
          </ul>
        </div>

        <button
          onClick={() => setScheduled(true)}
          className={`w-full py-2.5 rounded-xl font-extrabold text-xs transition flex items-center justify-center gap-1.5 ${
            scheduled 
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500' 
              : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
          }`}
        >
          <Calendar className="w-4 h-4" />
          {scheduled ? 'Plumber Scheduled for Today 2:00 PM ✓' : 'Approve ₹450 Quote & Schedule Plumber Visit'}
        </button>
      </div>
    </div>
  );
};
