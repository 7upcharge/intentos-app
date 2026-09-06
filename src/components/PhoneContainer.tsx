import React, { useState } from 'react';
import { 
  Wifi, Battery, Signal, Brain, Smartphone, Monitor, 
  RefreshCw
} from 'lucide-react';

interface Props {
  children: React.ReactNode;
  onOpenBrainView: () => void;
  onReset: () => void;
  confidenceScore: number;
}

export const PhoneContainer: React.FC<Props> = ({ 
  children, 
  onOpenBrainView, 
  onReset,
  confidenceScore
}) => {
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);

  return (
    <div className="min-h-screen bg-[#08090e] text-slate-100 flex flex-col items-center justify-start p-2 sm:p-6 font-sans select-none overflow-x-hidden">
      <div className="w-full max-w-md sm:max-w-xl mb-4 flex items-center justify-between bg-slate-900/80 border border-slate-800 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></div>
          <span className="font-extrabold tracking-wider text-white text-xs">INTENTOS</span>
          <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded-full font-bold">
            PROTOTYPE v1.0
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenBrainView}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-3 py-1 rounded-xl font-bold flex items-center gap-1.5 transition shadow-lg shadow-cyan-500/20"
          >
            <Brain className="w-3.5 h-3.5 fill-slate-950" />
            <span>Brain View</span>
          </button>

          <button
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-1.5 rounded-xl border border-slate-700 transition"
            title="Toggle Phone Frame View vs Full View"
          >
            {isPhoneFrame ? <Monitor className="w-4 h-4 text-slate-400" /> : <Smartphone className="w-4 h-4 text-cyan-400" />}
          </button>

          <button
            onClick={onReset}
            className="bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white p-1.5 rounded-xl border border-slate-700 transition"
            title="Reset Intent OS State"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div 
        className={`w-full transition-all duration-300 ${
          isPhoneFrame 
            ? 'max-w-[390px] min-h-[844px] bg-[#0b0d14] border-[6px] border-slate-800 rounded-[44px] shadow-[0_0_50px_rgba(0,242,254,0.15)] relative overflow-hidden flex flex-col' 
            : 'max-w-xl bg-[#0b0d14] border border-slate-800 rounded-3xl p-2 shadow-2xl'
        }`}
      >
        {isPhoneFrame && (
          <div className="sticky top-0 bg-[#0b0d14]/90 backdrop-blur-md z-40 px-6 pt-3 pb-2 flex items-center justify-between border-b border-slate-800/50">
            <span className="text-xs font-semibold tracking-tight text-white">9:41</span>
            
            <div 
              onClick={onOpenBrainView}
              className="bg-slate-900 border border-cyan-500/40 rounded-full px-3 py-0.5 flex items-center gap-1.5 cursor-pointer hover:border-cyan-400 transition"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></div>
              <span className="text-[10px] text-cyan-300 font-bold font-mono">Brain {confidenceScore}%</span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-400">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-3.5 h-3.5 text-slate-300" />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {children}
        </div>

        {isPhoneFrame && (
          <div className="py-2 flex items-center justify-center bg-[#0b0d14]/90 backdrop-blur-md border-t border-slate-900">
            <div className="w-32 h-1 bg-slate-700 rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};
