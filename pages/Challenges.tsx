
import React, { useState } from 'react';
import { Trophy, Flame, Clock, Users, ArrowRight, Target, Check } from 'lucide-react';
import { Challenge } from '../types';

const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: '1',
    title: 'Speed Coding: React Components',
    description: 'Build a responsive weather card in under 30 minutes using standard CSS.',
    participants: 142,
    timeLeft: '4h 20m',
    prize: '500 XP + Gold Badge',
    image: 'https://picsum.photos/seed/code/400/200',
    difficulty: 'Hard',
    userJoined: false
  },
  {
    id: '2',
    title: 'Daily UI: Landing Page',
    description: 'Design a landing page for a futuristic coffee shop. Best vote wins.',
    participants: 89,
    timeLeft: '12h 00m',
    prize: '300 XP + Featured Profile',
    image: 'https://picsum.photos/seed/design/400/200',
    difficulty: 'Medium',
    userJoined: false
  },
  {
    id: '3',
    title: 'Speak Like a Local: French',
    description: 'Record a 1-minute video ordering food in French without hesitation.',
    participants: 56,
    timeLeft: '1d 4h',
    prize: '200 XP',
    image: 'https://picsum.photos/seed/french/400/200',
    difficulty: 'Easy',
    userJoined: true // Mock existing join
  }
];

export const ChallengesPage: React.FC = () => {
  const [challenges, setChallenges] = useState(INITIAL_CHALLENGES);

  const handleJoin = (id: string) => {
    setChallenges(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, userJoined: !c.userJoined, participants: c.userJoined ? c.participants - 1 : c.participants + 1 };
      }
      return c;
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Weekly Skill Challenges</h1>
        <p className="text-gray-400 text-lg">Compete with the community, earn reputation, and unlock exclusive mentor discounts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured Challenge (Hero) */}
        <div className="lg:col-span-2 bg-gradient-to-br from-neon-red/20 to-transparent border border-neon-red/50 rounded-3xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-red/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="flex items-center gap-3 mb-4 text-neon-red">
             <Flame className="animate-pulse" /> 
             <span className="font-bold tracking-wider uppercase text-sm">Trending Now</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 max-w-lg">
            The 48-Hour Full Stack Hackathon
          </h2>
          <p className="text-gray-300 mb-8 max-w-lg text-lg">
            Build a complete To-Do app with authentication. Top 3 winners get a free 1-on-1 session with a Grandmaster Mentor.
          </p>

          <div className="flex flex-wrap gap-6 mb-8">
            <div className="bg-black/40 px-4 py-2 rounded-lg border border-gray-700 flex items-center gap-2">
              <Users size={18} className="text-gray-400" />
              <span className="text-white font-bold">340 Joined</span>
            </div>
            <div className="bg-black/40 px-4 py-2 rounded-lg border border-gray-700 flex items-center gap-2">
              <Clock size={18} className="text-gray-400" />
              <span className="text-white font-bold text-neon-red">Ends in 14h</span>
            </div>
             <div className="bg-black/40 px-4 py-2 rounded-lg border border-gray-700 flex items-center gap-2">
              <Trophy size={18} className="text-yellow-500" />
              <span className="text-white font-bold">Top Prize: $100 Credit</span>
            </div>
          </div>

          <button className="bg-neon-red text-black font-bold px-8 py-4 rounded-xl hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_#FF5E5E]">
            Accept Challenge
          </button>
        </div>

        {/* Leaderboard Teaser */}
        <div className="bg-dark-card border border-dark-border rounded-3xl p-6 relative">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Trophy className="text-yellow-500" /> Top Challengers
          </h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((rank) => (
              <div key={rank} className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                <span className={`font-mono font-bold w-6 ${rank === 1 ? 'text-yellow-500' : rank === 2 ? 'text-gray-300' : rank === 3 ? 'text-orange-500' : 'text-gray-600'}`}>
                  #{rank}
                </span>
                <div className="w-8 h-8 rounded-full bg-gray-700 bg-cover" style={{backgroundImage: `url(https://picsum.photos/seed/${rank}/100)`}}></div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">User_{rank}82</p>
                  <p className="text-xs text-gray-500">24,500 XP</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 border border-gray-700 rounded-xl text-gray-400 text-sm font-bold hover:text-white hover:border-gray-500 transition-all">
            View Global Rankings
          </button>
        </div>
      </div>

      {/* Challenge Grid */}
      <h3 className="text-2xl font-bold text-white mt-12 mb-6">Active Challenges</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden hover:border-gray-600 transition-all group">
            <div className="h-40 bg-cover bg-center relative" style={{backgroundImage: `url(${challenge.image})`}}>
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
              <div className="absolute top-3 right-3 bg-black/80 px-3 py-1 rounded-full text-xs font-bold text-white border border-gray-700">
                {challenge.difficulty}
              </div>
            </div>
            <div className="p-6">
              <h4 className="text-lg font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">{challenge.title}</h4>
              <p className="text-sm text-gray-400 mb-4 line-clamp-2">{challenge.description}</p>
              
              <div className="flex justify-between items-center text-xs text-gray-500 font-mono mb-6">
                <span className="flex items-center gap-1"><Users size={12} /> {challenge.participants}</span>
                <span className="flex items-center gap-1 text-neon-cyan"><Clock size={12} /> {challenge.timeLeft}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-yellow-500 text-xs font-bold flex items-center gap-1">
                   <Target size={12} /> {challenge.prize}
                </span>
                <button 
                  onClick={() => handleJoin(challenge.id)}
                  className={`p-2 rounded-full transition-all ${
                    challenge.userJoined 
                    ? 'bg-green-500/20 text-green-500 hover:bg-red-500/20 hover:text-red-500' 
                    : 'bg-white/5 text-white hover:bg-neon-cyan hover:text-black'
                  }`}
                >
                  {challenge.userJoined ? <Check size={18} /> : <ArrowRight size={18} />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
