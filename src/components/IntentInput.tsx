import React, { useState } from 'react';
import { Mic, Sparkles, Brain, Compass, ArrowRight } from 'lucide-react';

interface Props {
  onSubmitIntent: (intent: string) => void;
  isProcessing: boolean;
}

const PRESET_INTENTS = [
  {
    title: 'Flat Hunt',
    icon: '🏠',
    text: 'I need to find a flat with my roommate under ₹20K, near college, with parking.'
  },
  {
    title: 'Goa Trip Transformation',
    icon: '🌴',
    text: 'I need to plan a 4-day Goa trip with 3 friends under ₹15K each.'
  },
  {
    title: 'Exam Prep OS',
    icon: '📚',
    text: 'I need to prepare for my Data Structures exam in 5 days.'
  }
];

export const IntentInput: React.FC<Props> = ({ onSubmitIntent, isProcessing }) => {
  const [input, setInput] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    onSubmitIntent(input.trim());
  };

  const handleSelectPreset = (text: string) => {
    setInput(text);
    onSubmitIntent(text);
  };

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
    if (!isVoiceActive) {
      setTimeout(() => {
        setInput('I need to find a flat with my roommate under ₹20K, near college, with parking.');
        setIsVoiceActive(false);
      }, 2500);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
            <Brain className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide">SECOND BRAIN</h2>
            <p className="text-[11px] text-slate-400">What's on your mind?</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Give IntentOS an intent... e.g. 'I need to find a flat under ₹20K near campus with parking.'"
              rows={3}
              disabled={isProcessing}
              className="w-full bg-slate-950/90 border border-slate-800 focus:border-cyan-500/80 rounded-2xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none transition resize-none leading-relaxed"
            />

            {isVoiceActive && (
              <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm rounded-2xl flex items-center justify-center gap-3 p-3 animate-fade-in">
                <div className="flex items-center gap-1">
                  <span className="w-1 h-4 bg-cyan-400 rounded-full animate-bounce"></span>
                  <span className="w-1 h-6 bg-cyan-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1 h-8 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  <span className="w-1 h-5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.1s]"></span>
                </div>
                <span className="text-xs text-cyan-300 font-semibold">Listening to Intent Voice Stream...</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={toggleVoice}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
                isVoiceActive 
                  ? 'bg-rose-950 border-rose-500 text-rose-300' 
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <Mic className={`w-4 h-4 ${isVoiceActive ? 'text-rose-400 animate-pulse' : 'text-cyan-400'}`} />
              <span>Voice</span>
            </button>

            <button
              type="submit"
              disabled={!input.trim() || isProcessing}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs py-2.5 px-4 rounded-xl transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>{isProcessing ? 'Engineering Workflow...' : 'Execute Intent'}</span>
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 px-1">
          <Compass className="w-3.5 h-3.5 text-cyan-400" /> Demo Intent Presets
        </span>
        <div className="space-y-2">
          {PRESET_INTENTS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(preset.text)}
              disabled={isProcessing}
              className="w-full text-left bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800/80 hover:border-cyan-500/40 p-3 rounded-2xl transition group flex items-start gap-3"
            >
              <span className="text-lg p-1 bg-slate-800 rounded-xl">{preset.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition">{preset.title}</h4>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{preset.text}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
