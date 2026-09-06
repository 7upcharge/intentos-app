import React, { useState } from 'react';
import { 
  Palmtree, Sparkles, Train, CheckCircle2, Users, Vote
} from 'lucide-react';
import type { TripData, UserContext } from '../types';

interface Props {
  userContext: UserContext;
  onResetGoal: () => void;
}

const MOCK_TRIP: TripData = {
  destination: 'Goa (North Coast & Anjuna Beach)',
  totalBudgetPerPerson: 15000,
  groupSize: 4,
  dates: 'Oct 12 – Oct 16 (4 Days / 3 Nights)',
  transportOptions: [
    { mode: 'Tejas Express Train', costPerPerson: 2100, duration: '9 hrs', recommended: true },
    { mode: 'Indigo Morning Flight', costPerPerson: 4800, duration: '1.5 hrs', recommended: false },
    { mode: 'Sleeper Volvo Bus', costPerPerson: 1600, duration: '12 hrs', recommended: false }
  ],
  stays: [
    {
      name: 'Sunshine Beachfront Pool Villa',
      costPerNight: 6400,
      rating: 4.9,
      location: 'Anjuna Beach (100m from shore)',
      tags: ['Private Pool', 'Free Breakfast', 'Scooter Rental Partner'],
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Baga Palms Heritage Cottage',
      costPerNight: 4800,
      rating: 4.6,
      location: 'Baga Strip',
      tags: ['Garden Lawn', 'Kitchenette', 'High-Speed Wi-Fi'],
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=600&q=80'
    }
  ],
  itinerary: [
    { day: 1, title: 'Arrival & Anjuna Sunset', activities: ['Check-in at Pool Villa', 'Sunset drinks at Curlies Beach Shack', 'Seafood Grill dinner'] },
    { day: 2, title: 'Watersports & Fort Aguada', activities: ['Parasailing & Jet Ski at Baga', 'Explore 17th-century Fort Aguada', 'Night market at Arpora'] },
    { day: 3, title: 'South Goa Heritage & Island Cruise', activities: ['Old Goa Churches walkthrough', 'Mandovi river sunset catamaran cruise', 'Club Cubana party'] },
    { day: 4, title: 'Cafe Hopping & Souvenirs', activities: ['Brunch at French Bakery', 'Flea market shopping', 'Evening return journey'] }
  ],
  groupSplit: [
    { name: 'Alex (You)', share: 13500, paid: true },
    { name: 'Rohan (Roommate)', share: 13500, paid: true },
    { name: 'Sameer', share: 13500, paid: false },
    { name: 'Kabir', share: 13500, paid: false }
  ]
};

export const GoaTripWorkspace: React.FC<Props> = ({ onResetGoal }) => {
  const [selectedTransport, setSelectedTransport] = useState(0);
  const [selectedStay, setSelectedStay] = useState(0);
  const [activeTab, setActiveTab] = useState<'itinerary' | 'budget' | 'group'>('itinerary');
  const [voted, setVoted] = useState(false);

  const totalCalculatedCost = MOCK_TRIP.transportOptions[selectedTransport].costPerPerson + 
    (MOCK_TRIP.stays[selectedStay].costPerNight * 3 / 4) + 3500;

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      <div className="bg-gradient-to-r from-emerald-950/90 via-slate-900 to-teal-950/90 border border-emerald-500/30 rounded-2xl p-4 shadow-xl relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                Dynamic Software Generated
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Palmtree className="w-5 h-5 text-emerald-400" />
              Goa Trip Workspace
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {MOCK_TRIP.destination} • {MOCK_TRIP.dates}
            </p>
          </div>
          <button 
            onClick={onResetGoal}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 font-medium transition flex items-center gap-1"
          >
            New Goal
          </button>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-slate-900/90 rounded-xl p-2 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-medium">Target Budget</span>
            <span className="font-bold text-emerald-400">₹{MOCK_TRIP.totalBudgetPerPerson.toLocaleString()}/person</span>
          </div>
          <div className="bg-slate-900/90 rounded-xl p-2 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-medium">Group Size</span>
            <span className="font-bold text-cyan-300 flex items-center justify-center gap-1">
              <Users className="w-3 h-3" /> 4 Friends
            </span>
          </div>
          <div className="bg-slate-900/90 rounded-xl p-2 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-medium">Est. Total Head</span>
            <span className="font-bold text-amber-400">₹{Math.round(totalCalculatedCost).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="flex bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
        <button
          onClick={() => setActiveTab('itinerary')}
          className={`flex-1 py-1.5 rounded-lg font-semibold transition ${
            activeTab === 'itinerary' ? 'bg-emerald-600 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          4-Day Itinerary
        </button>
        <button
          onClick={() => setActiveTab('budget')}
          className={`flex-1 py-1.5 rounded-lg font-semibold transition ${
            activeTab === 'budget' ? 'bg-emerald-600 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          Transport & Stay
        </button>
        <button
          onClick={() => setActiveTab('group')}
          className={`flex-1 py-1.5 rounded-lg font-semibold transition ${
            activeTab === 'group' ? 'bg-emerald-600 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          Group Vote & Split
        </button>
      </div>

      {activeTab === 'itinerary' && (
        <div className="space-y-3">
          {MOCK_TRIP.itinerary.map((day: { day: number; title: string; activities: string[] }) => (
            <div key={day.day} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  Day {day.day}
                </span>
                <span className="text-xs font-bold text-white">{day.title}</span>
              </div>
              <ul className="space-y-1 text-xs text-slate-300">
                {day.activities.map((act: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'budget' && (
        <div className="space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-2">
            <h3 className="text-xs font-bold text-white flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Train className="w-4 h-4 text-cyan-400" /> Select Transport
              </span>
              <span className="text-[10px] text-slate-400">Optimized by Research Agent</span>
            </h3>
            <div className="space-y-2 text-xs">
              {MOCK_TRIP.transportOptions.map((opt: { mode: string; costPerPerson: number; duration: string; recommended: boolean }, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedTransport(idx)}
                  className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition ${
                    selectedTransport === idx 
                      ? 'bg-emerald-950/80 border-emerald-500 text-white' 
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div>
                    <div className="font-bold flex items-center gap-1.5">
                      {opt.mode}
                      {opt.recommended && (
                        <span className="bg-emerald-500 text-slate-950 text-[9px] px-1.5 py-0.2 rounded font-black">
                          BEST VALUE
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400">{opt.duration} duration</span>
                  </div>
                  <span className="font-bold text-emerald-400">₹{opt.costPerPerson.toLocaleString()}/head</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-3">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Palmtree className="w-4 h-4 text-emerald-400" /> Selected Villa Accommodation
            </h3>
            {MOCK_TRIP.stays.map((stay: { name: string; costPerNight: number; rating: number; location: string; tags: string[]; image: string }, idx: number) => (
              <div 
                key={idx}
                onClick={() => setSelectedStay(idx)}
                className={`border rounded-xl p-3 cursor-pointer transition ${
                  selectedStay === idx ? 'border-emerald-500 bg-emerald-950/40' : 'border-slate-800 bg-slate-800/40'
                }`}
              >
                <div className="flex gap-3">
                  <img src={stay.image} alt={stay.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1 space-y-1">
                    <h4 className="text-xs font-bold text-white leading-snug">{stay.name}</h4>
                    <p className="text-[10px] text-slate-400">{stay.location}</p>
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="font-bold text-emerald-400">₹{stay.costPerNight.toLocaleString()} / night</span>
                      <span className="text-amber-400 text-[10px] font-bold">★ {stay.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'group' && (
        <div className="space-y-3">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Vote className="w-4 h-4 text-purple-400" /> Group Decision Poll
              </h3>
              <span className="text-[10px] bg-purple-950 text-purple-300 border border-purple-800 px-2 py-0.5 rounded-full font-bold">
                3/4 Approved
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Collaboration Agent created group vote link. Approve Sunshine Pool Villa & Tejas Express.
            </p>

            <button
              onClick={() => setVoted(true)}
              className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                voted 
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500' 
                  : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {voted ? 'You Approved Itinerary & Villa ✓' : 'Vote Approve Trip Proposal'}
            </button>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-2">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              Group Expense Split (Equal 4-way)
            </h3>
            <div className="space-y-1.5 text-xs">
              {MOCK_TRIP.groupSplit.map((item: { name: string; share: number; paid: boolean }, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                  <span className="font-semibold text-white">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">₹{item.share.toLocaleString()}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded ${item.paid ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'}`}>
                      {item.paid ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
