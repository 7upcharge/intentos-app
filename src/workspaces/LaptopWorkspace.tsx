import React, { useState } from 'react';
import { Laptop, Sparkles, CheckCircle2, ShoppingCart } from 'lucide-react';
import type { UserContext } from '../types';

interface Props {
  userContext: UserContext;
  onResetGoal: () => void;
}

export const LaptopWorkspace: React.FC<Props> = ({ userContext, onResetGoal }) => {
  const [purchased, setPurchased] = useState(false);

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      <div className="bg-gradient-to-r from-blue-950/90 via-slate-900 to-indigo-950/90 border border-blue-500/40 rounded-3xl p-4 shadow-2xl relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <span className="bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 w-fit mb-1">
              <Sparkles className="w-3 h-3 text-blue-400" />
              Dynamic Software Generated
            </span>
            <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Laptop className="w-5 h-5 text-blue-400" />
              Laptop Buying Accelerator
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Compiled for <span className="text-slate-200 font-semibold">{userContext.name}</span> (CS College Workloads)
            </p>
          </div>
          <button 
            onClick={onResetGoal}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-xl border border-slate-700 font-medium transition"
          >
            New Goal
          </button>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-slate-900/90 rounded-xl p-2 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-medium">Budget</span>
            <span className="font-bold text-emerald-400">₹85,000 Max</span>
          </div>
          <div className="bg-slate-900/90 rounded-xl p-2 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-medium">Battery</span>
            <span className="font-bold text-cyan-300">18 Hrs +</span>
          </div>
          <div className="bg-slate-900/90 rounded-xl p-2 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-medium">RAM</span>
            <span className="font-bold text-purple-400">16 GB Unified</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="bg-emerald-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full shadow-lg">
            96% MATCH • RECOMMENDED
          </span>
          <span className="text-xs text-slate-400 font-mono">Verified by Communication Agent</span>
        </div>

        <div className="flex gap-3 pt-1">
          <img 
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" 
            alt="MacBook Air M2"
            className="w-28 h-24 rounded-2xl object-cover border border-slate-700" 
          />
          <div className="flex-1 space-y-1">
            <h3 className="text-sm font-extrabold text-white">Apple MacBook Air M2 (16GB / 512GB)</h3>
            <p className="text-[11px] text-slate-400">Official Apple Authorized Retailer • Midnight Edition</p>
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-lg font-black text-emerald-400">₹84,900</span>
              <span className="line-through text-slate-500 text-[11px]">₹99,900</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs space-y-1.5">
          <span className="text-[10px] text-blue-400 font-bold uppercase">Automated Verification Findings:</span>
          <ul className="space-y-1 text-slate-300 text-[11px]">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Apple Student Discount verified (Save ₹15,000)</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Includes 1-Year Official AppleCare Warranty</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Same-Day Campus Store pickup verified</span>
            </li>
          </ul>
        </div>

        <button
          onClick={() => setPurchased(true)}
          className={`w-full py-2.5 rounded-xl font-extrabold text-xs transition flex items-center justify-center gap-1.5 ${
            purchased 
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500' 
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {purchased ? 'Order Reserved at Campus Apple Store ✓' : 'Reserve & Apply Student Discount (₹84,900)'}
        </button>
      </div>
    </div>
  );
};
