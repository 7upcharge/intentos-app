import React, { useState, useEffect } from 'react';
import { 
  Building2, CheckCircle2, Car, Sparkles, 
  MessageSquare, Eye, AlertTriangle, Calendar, Check,
  ShieldCheck, PhoneCall, RefreshCw, Layers
} from 'lucide-react';
import type { UserContext, OwnerMessage, VisionAnalysis } from '../types';
import { INITIAL_OWNER_CHAT, INITIAL_VISION_ANALYSIS, FOLLOWUP_OWNER_CHAT } from '../verification/verificationEngine';

interface Props {
  userContext: UserContext;
  onResetGoal: () => void;
}

export const FlatHuntWorkspace: React.FC<Props> = ({ userContext, onResetGoal }) => {
  const [isBuildingWorkspace, setIsBuildingWorkspace] = useState(true);
  const [chatMessages, setChatMessages] = useState<OwnerMessage[]>(INITIAL_OWNER_CHAT);
  const [visionItems, setVisionItems] = useState<VisionAnalysis[]>(INITIAL_VISION_ANALYSIS);
  const [parkingVerified, setParkingVerified] = useState<boolean>(false);
  const [isRequestingEvidence, setIsRequestingEvidence] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'verification' | 'chat' | 'vision'>('verification');
  const [visitScheduled, setVisitScheduled] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBuildingWorkspace(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  const handleRequestParkingEvidence = async () => {
    setIsRequestingEvidence(true);
    await new Promise(resolve => setTimeout(resolve, 900));

    setChatMessages(prev => [...prev, ...FOLLOWUP_OWNER_CHAT]);

    setVisionItems(prev => prev.map(item => {
      if (item.id === 'vis_4') {
        return {
          ...item,
          status: 'Verified',
          imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80',
          findings: ['Dedicated Basement Slot #4B marked', 'SUV/Bike clearance verified', 'CCTV surveillance'],
          confidence: 95
        };
      }
      return item;
    }));

    setParkingVerified(true);
    setIsRequestingEvidence(false);
  };

  if (isBuildingWorkspace) {
    return (
      <div className="bg-slate-900/90 border border-cyan-500/40 rounded-3xl p-8 text-center space-y-4 shadow-2xl animate-fade-in my-8">
        <div className="w-12 h-12 mx-auto rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center">
          <Layers className="w-6 h-6 text-cyan-400 animate-spin" />
        </div>
        <div>
          <h2 className="text-base font-extrabold text-white tracking-wide uppercase">
            Building Your Workspace...
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Assembling Candidate + Verification + Vision AI + Second Brain Rules
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Generated Banner */}
      <div className="bg-gradient-to-r from-blue-950/90 via-slate-900 to-indigo-950/90 border border-cyan-500/40 rounded-3xl p-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                Workspace Assembled for Your Goal
              </span>
            </div>
            <h2 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
              <Building2 className="w-5 h-5 text-cyan-400" />
              Skyline Heights 2BHK Takeover
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Compiled for <span className="text-cyan-300 font-semibold">{userContext.name}</span> & Roommate
            </p>
          </div>
          <button 
            onClick={onResetGoal}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-xl border border-slate-700 font-medium transition"
          >
            New Goal
          </button>
        </div>

        {/* Second Brain Matching Constraints Bar */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-slate-900/90 rounded-xl p-2 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-medium">Budget Limit</span>
            <span className="font-bold text-emerald-400">₹18,500 / mo (Pass)</span>
          </div>
          <div className="bg-slate-900/90 rounded-xl p-2 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-medium">Commute</span>
            <span className="font-bold text-cyan-300">1.1 km from College</span>
          </div>
          <div className="bg-slate-900/90 rounded-xl p-2 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-medium">Parking Requirement</span>
            <span className={`font-bold flex items-center justify-center gap-1 ${parkingVerified ? 'text-emerald-400' : 'text-amber-400'}`}>
              <Car className="w-3 h-3" /> {parkingVerified ? 'Verified Slot #4B ✓' : 'Unverified'}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-slate-900/80 p-1 rounded-2xl border border-slate-800 text-xs">
        <button
          onClick={() => setActiveTab('verification')}
          className={`flex-1 py-2 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
            activeTab === 'verification' ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" /> Verification Hub
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-2 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
            activeTab === 'chat' ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" /> Owner Chat ({chatMessages.length})
        </button>
        <button
          onClick={() => setActiveTab('vision')}
          className={`flex-1 py-2 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
            activeTab === 'vision' ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Eye className="w-3.5 h-3.5" /> Vision Agent ({visionItems.length})
        </button>
      </div>

      {/* SECTION 1: VERIFICATION HUB & LOOP ENGINE */}
      {activeTab === 'verification' && (
        <div className="space-y-4">
          {/* Match Score & Recommendation Banner */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-xl font-black px-3 py-1 rounded-2xl border ${
                  parkingVerified 
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/30' 
                    : 'bg-amber-400 text-slate-950 border-amber-300'
                }`}>
                  {parkingVerified ? '92% MATCH' : '76% MATCH'}
                </span>
                <div>
                  <h3 className="text-sm font-extrabold text-white">
                    {parkingVerified ? 'VERIFIED MATCH — RECOMMENDED BY SECOND BRAIN' : 'UNVERIFIED EVIDENCE DETECTED'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {parkingVerified ? 'Parking evidence verified by Vision Agent' : 'Listing & owner text claim parking, but photo proof is missing'}
                  </p>
                </div>
              </div>
            </div>

            {/* Why This Matches YOU (Second Brain Personalization) */}
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">Why This Matches YOU (Second Brain Personalization):</span>
              <div className="grid grid-cols-1 gap-1.5 text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>₹18,500 rent is within your ₹20,000 budget limit</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>1.1 km from your IIIT Delhi college campus</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {parkingVerified ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  )}
                  <span className={parkingVerified ? 'text-slate-300' : 'text-amber-300 font-semibold'}>
                    {parkingVerified ? 'Dedicated parking slot #4B photo verified' : 'Dedicated parking is MANDATORY for you (Photo proof missing)'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Matches your 50/50 roommate rent split constraint</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Avoids 45-min transit bottleneck you rejected in past decisions</span>
                </div>
              </div>
            </div>

            {/* UNCERTAINTY & LOOP REFINEMENT TRIGGER CARD */}
            {!parkingVerified ? (
              <div className="bg-amber-950/60 border border-amber-500/50 p-3.5 rounded-2xl space-y-2.5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <h4 className="text-xs font-bold text-amber-200">1 Requirement Still Unverified</h4>
                  </div>
                  <div className="text-[11px] text-slate-300 space-y-0.5 pl-7">
                    <p className="text-slate-400">• Listing says: <span className="text-white font-medium">"Parking available"</span></p>
                    <p className="text-slate-400">• Owner confirms: <span className="text-white font-medium">"Parking available"</span></p>
                    <p className="text-amber-300 font-bold">• Vision Agent: <span className="text-amber-300">"Parking slot evidence missing from photo set"</span></p>
                  </div>
                </div>

                <button
                  onClick={handleRequestParkingEvidence}
                  disabled={isRequestingEvidence}
                  className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
                >
                  <RefreshCw className={`w-4 h-4 ${isRequestingEvidence ? 'animate-spin' : ''}`} />
                  <span>{isRequestingEvidence ? 'Requesting Parking Photo from Owner...' : 'Request Parking Photo from Owner & Re-evaluate'}</span>
                </button>
              </div>
            ) : (
              <div className="bg-emerald-950/60 border border-emerald-500/50 p-3 rounded-2xl flex items-center gap-2 text-xs text-emerald-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>Loop Refinement Complete! Owner delivered basement parking slot #4B photo. Dedicated parking confirmed. Match upgraded: 76% → 92%.</span>
              </div>
            )}

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button 
                onClick={() => setVisitScheduled('Tomorrow, 4:30 PM')}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-lg"
              >
                <Calendar className="w-4 h-4 fill-slate-950" /> Schedule Visit
              </button>
              <button 
                onClick={() => alert('Connecting to Mr. Sharma at +91 98765 43210')}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs py-2.5 rounded-xl border border-slate-700 transition flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-4 h-4 text-cyan-400" /> Call Owner
              </button>
            </div>

            {visitScheduled && (
              <div className="bg-cyan-950 border border-cyan-500/50 text-cyan-200 px-3 py-2 rounded-xl text-xs flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Visit scheduled for {visitScheduled}! Second Brain calendar updated.
                </span>
              </div>
            )}
          </div>

          {/* Vision Summary Grid Preview */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 space-y-3">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-cyan-400" /> Vision Agent Inspection Evidence ({visionItems.length} Rooms)
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {visionItems.map((item) => (
                <div key={item.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-2 space-y-1.5">
                  <div className="relative h-20 w-full rounded-xl overflow-hidden">
                    <img src={item.imageUrl} alt={item.roomType} className="w-full h-full object-cover" />
                    <span className={`absolute top-1.5 left-1.5 text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === 'Verified' ? 'bg-emerald-500 text-slate-950' : 'bg-amber-500 text-slate-950'
                    }`}>
                      {item.status} ({item.confidence}%)
                    </span>
                  </div>
                  <span className="font-bold text-white block text-[11px] truncate">{item.roomType}</span>
                  <ul className="text-[10px] text-slate-400 space-y-0.5">
                    {item.findings.map((f, i) => (
                      <li key={i} className="truncate">• {f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: SIMULATED OWNER CHAT STREAM */}
      {activeTab === 'chat' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 space-y-3 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold text-white">Communication Agent Stream</h3>
            </div>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono italic">
              (Simulated Owner Verification Stream)
            </span>
          </div>

          <div className="space-y-3 text-xs max-h-96 overflow-y-auto pr-1">
            {chatMessages.map((msg) => {
              const isAgent = msg.sender === 'agent';
              return (
                <div key={msg.id} className={`flex flex-col ${isAgent ? 'items-end' : 'items-start'}`}>
                  <span className="text-[9px] text-slate-500 mb-1">{msg.senderName} • {msg.timestamp}</span>
                  <div className={`p-3 rounded-2xl max-w-[85%] space-y-2 ${
                    isAgent ? 'bg-cyan-950 border border-cyan-800 text-slate-200' : 'bg-slate-800 border border-slate-700 text-white'
                  }`}>
                    <p className="leading-relaxed">{msg.text}</p>
                    {msg.attachedPhotos && (
                      <div className="grid grid-cols-2 gap-1.5 pt-1">
                        {msg.attachedPhotos.map((photo, i) => (
                          <div key={i} className="relative h-16 rounded-lg overflow-hidden border border-slate-700">
                            <img src={photo.url} alt={photo.label} className="w-full h-full object-cover" />
                            <span className="absolute bottom-0 inset-x-0 bg-slate-950/80 text-[8px] text-slate-300 p-0.5 text-center truncate">
                              {photo.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 3: VISION AGENT DETAILED GRID */}
      {activeTab === 'vision' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 space-y-3 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold text-white">Vision AI Photo Feature Extraction</h3>
            </div>
            <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded font-mono">
              Model: Vision-Pro-v2
            </span>
          </div>

          <div className="space-y-3">
            {visionItems.map((item) => (
              <div key={item.id} className="bg-slate-950 border border-slate-800 p-3 rounded-2xl flex gap-3 text-xs">
                <img src={item.imageUrl} alt={item.roomType} className="w-24 h-24 rounded-xl object-cover" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white">{item.roomType}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === 'Verified' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {item.status} ({item.confidence}%)
                    </span>
                  </div>
                  <ul className="text-[11px] text-slate-300 space-y-1 pt-1">
                    {item.findings.map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
