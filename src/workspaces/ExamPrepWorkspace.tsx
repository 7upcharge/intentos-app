import React, { useState } from 'react';
import { 
  BookOpen, AlertTriangle, Target, 
  Sparkles, Award, Play 
} from 'lucide-react';
import type { ExamData, UserContext } from '../types';

interface Props {
  userContext: UserContext;
  onResetGoal: () => void;
}

const MOCK_EXAM: ExamData = {
  subject: 'Data Structures & Algorithms (CS302)',
  daysRemaining: 5,
  targetScore: 'Grade A / 90%+',
  weakTopics: ['Dynamic Programming (Knapsack & LIS)', 'Graph Shortest Path (Dijkstra/Bellman-Ford)', 'Red-Black Tree Balancing'],
  studyPlan: [
    { day: 1, topic: 'Dynamic Programming Core & Memoization', durationHours: 4, completed: true },
    { day: 2, topic: 'Graph Traversals (BFS/DFS) & Dijkstra', durationHours: 3.5, completed: true },
    { day: 3, topic: 'Trees & Heap Priority Queues', durationHours: 4, completed: false },
    { day: 4, topic: 'String Matching & Sorting Deep Dive', durationHours: 3, completed: false },
    { day: 5, topic: 'Full Mock Test & Formula Sheet Revision', durationHours: 5, completed: false }
  ],
  mockTests: [
    { testName: 'Diagnostic Drill 1 (DP focus)', score: '74%', status: 'Completed' },
    { testName: 'Graph Algorithms Speed Test', score: '88%', status: 'Completed' },
    { testName: 'Full Length Comprehensive Mock Exam', status: 'Ready' }
  ]
};

export const ExamPrepWorkspace: React.FC<Props> = ({ onResetGoal }) => {
  const [examData, setExamData] = useState<ExamData>(MOCK_EXAM);
  const [mockStarted, setMockStarted] = useState(false);

  const toggleTask = (index: number) => {
    setExamData(prev => {
      const updated = [...prev.studyPlan];
      updated[index].completed = !updated[index].completed;
      return { ...prev, studyPlan: updated };
    });
  };

  const completedCount = examData.studyPlan.filter((x: { completed: boolean }) => x.completed).length;
  const progressPercent = Math.round((completedCount / examData.studyPlan.length) * 100);

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      <div className="bg-gradient-to-r from-purple-950/90 via-slate-900 to-indigo-950/90 border border-purple-500/30 rounded-2xl p-4 shadow-xl relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-500/10 rounded-full blur-xl pointer-events-none"></div>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-400" />
                Dynamic Software Generated
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              Exam Accelerator OS
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {examData.subject} • Target: <span className="text-purple-300 font-bold">{examData.targetScore}</span>
            </p>
          </div>
          <button 
            onClick={onResetGoal}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 font-medium transition flex items-center gap-1"
          >
            New Goal
          </button>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-400">Study Masterplan Completion</span>
            <span className="text-purple-400">{progressPercent}% ({completedCount}/{examData.studyPlan.length} Days)</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-3.5 space-y-2">
        <h3 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-amber-400" /> Isolated Knowledge Gaps (Preference Agent)
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {examData.weakTopics.map((topic: string, idx: number) => (
            <span key={idx} className="bg-amber-950/80 text-amber-200 border border-amber-800/60 text-[10px] px-2 py-1 rounded-lg font-medium">
              ⚠️ {topic}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-2.5">
        <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
          <Target className="w-4 h-4 text-purple-400" /> Daywise Adaptive Schedule
        </h3>
        <div className="space-y-2 text-xs">
          {examData.studyPlan.map((plan: { day: number; topic: string; durationHours: number; completed: boolean }, idx: number) => (
            <div
              key={plan.day}
              onClick={() => toggleTask(idx)}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                plan.completed 
                  ? 'bg-purple-950/40 border-purple-500/50 text-slate-300' 
                  : 'bg-slate-800/60 border-slate-700/60 text-white hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <input 
                  type="checkbox" 
                  checked={plan.completed}
                  onChange={() => {}}
                  className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 accent-purple-500" 
                />
                <div>
                  <span className="font-bold text-slate-200 block text-xs">Day {plan.day}: {plan.topic}</span>
                  <span className="text-[10px] text-slate-400">{plan.durationHours} hrs focused revision</span>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${plan.completed ? 'bg-purple-900 text-purple-200' : 'bg-slate-700 text-slate-300'}`}>
                {plan.completed ? 'Completed' : 'Pending'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-2.5">
        <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
          <Award className="w-4 h-4 text-emerald-400" /> AI Mock Test Drills
        </h3>
        <div className="space-y-2 text-xs">
          {examData.mockTests.map((mock: { testName: string; score?: string; status: 'Ready' | 'Completed' | 'Pending' }, idx: number) => (
            <div key={idx} className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">{mock.testName}</span>
                <span className="text-[10px] text-slate-400">Evaluator Agent Scoring</span>
              </div>
              <div>
                {mock.status === 'Completed' ? (
                  <span className="text-emerald-400 font-bold bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-800 text-xs">
                    Score: {mock.score}
                  </span>
                ) : (
                  <button 
                    onClick={() => setMockStarted(true)}
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-3 py-1 rounded-md transition flex items-center gap-1"
                  >
                    <Play className="w-3 h-3" /> Start Drill
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {mockStarted && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 p-4 flex items-center justify-center">
          <div className="bg-slate-900 border border-purple-500/50 rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" /> Live Mock Diagnostic
            </h3>
            <p className="text-xs text-slate-300">
              Q1: Given an array of integers, find the contiguous subarray with maximum sum (Kadane Algorithm).
            </p>
            <div className="space-y-2 text-xs">
              {['O(N) Time, O(1) Space', 'O(N log N) Divide & Conquer', 'O(N^2) Nested Loops'].map((opt, i) => (
                <button 
                  key={i}
                  onClick={() => {
                    alert('Correct! Kadane algorithm operates in O(N) time.');
                    setMockStarted(false);
                  }}
                  className="w-full bg-slate-800 hover:bg-purple-900/60 p-2.5 rounded-xl border border-slate-700 text-slate-200 text-left font-medium transition"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
