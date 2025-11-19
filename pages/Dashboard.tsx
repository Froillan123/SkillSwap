
import React, { useState } from 'react';
import { Trophy, Star, BookOpen, Flame, ArrowRight, Sparkles, Loader, Clock, Zap, Shuffle, Coins } from 'lucide-react';
import { User } from '../types';
import { generateSkillAdvice, translateSkillConcept } from '../services/geminiService';
import { Link } from 'react-router-dom';

const MOCK_USER: User = {
  id: '1',
  name: 'Alex Rivera',
  avatar: 'https://picsum.photos/200/200',
  bio: 'Software engineer engaging in creative writing and piano.',
  reputationPoints: 1250,
  level: 12,
  badges: ['Top Teacher', 'Fast Learner', 'Community Pillar'],
  skillsOffered: [],
  skillsWanted: [],
  wallet: {
    skillCoins: 450
  }
};

const AIWidget = () => {
  const [mode, setMode] = useState<'coach' | 'translator'>('coach');
  const [query, setQuery] = useState('');
  const [analogy, setAnalogy] = useState(''); // For translator
  const [result, setResult] = useState<{ advice?: string; roadmap?: string[]; translation?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);

    if (mode === 'coach') {
      const res = await generateSkillAdvice(query, ["JavaScript", "React", "Piano"]);
      setResult(res);
    } else {
      const text = await translateSkillConcept(query, analogy || "cooking");
      setResult({ translation: text });
    }
    setLoading(false);
  };

  return (
    <div className="bg-dark-card border border-neon-cyan/30 rounded-2xl p-6 shadow-[0_0_20px_rgba(0,255,209,0.05)] relative overflow-hidden group hover:border-neon-cyan/60 transition-all duration-500">
      <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 rounded-full -translate-y-32 translate-x-20 blur-3xl pointer-events-none"></div>
      
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex items-center gap-2">
           <Sparkles className="text-neon-cyan animate-pulse" size={20} />
           <h2 className="text-lg font-bold text-white tracking-wide">AI Assistant</h2>
        </div>
        <div className="flex bg-black/40 rounded-lg p-1 text-xs font-bold border border-gray-700">
          <button 
            onClick={() => { setMode('coach'); setResult(null); }}
            className={`px-3 py-1 rounded ${mode === 'coach' ? 'bg-neon-cyan text-black' : 'text-gray-400 hover:text-white'}`}
          >
            Coach
          </button>
          <button 
             onClick={() => { setMode('translator'); setResult(null); }}
             className={`px-3 py-1 rounded ${mode === 'translator' ? 'bg-neon-cyan text-black' : 'text-gray-400 hover:text-white'}`}
          >
            Translator
          </button>
        </div>
      </div>
      
      <p className="text-gray-400 mb-4 text-sm">
        {mode === 'coach' ? 'Ask for a personalized learning roadmap.' : 'Translate complex ideas into simple analogies.'}
      </p>

      <div className="space-y-2 mb-4 relative z-10">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={mode === 'coach' ? "I want to learn..." : "Concept (e.g. Recursion)"}
          className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all font-mono text-sm"
          onKeyDown={(e) => e.key === 'Enter' && handleAction()}
        />
        
        {mode === 'translator' && (
          <input 
            type="text" 
            value={analogy}
            onChange={(e) => setAnalogy(e.target.value)}
            placeholder="Using analogy... (e.g. Basketball, Cooking)"
            className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all font-mono text-sm"
            onKeyDown={(e) => e.key === 'Enter' && handleAction()}
          />
        )}

        <button 
          onClick={handleAction}
          disabled={loading}
          className="w-full bg-neon-cyan text-black px-4 py-2 rounded-lg font-bold hover:shadow-[0_0_15px_#00FFD1] transition-all disabled:opacity-50 disabled:hover:shadow-none flex justify-center"
        >
          {loading ? <Loader className="animate-spin" size={20} /> : (mode === 'coach' ? 'Generate Plan' : 'Translate Concept')}
        </button>
      </div>

      {result && (
        <div className="bg-[#121212]/80 backdrop-blur-sm rounded-xl p-4 border border-gray-800 animate-in fade-in slide-in-from-bottom-4">
          {mode === 'coach' && result.advice && (
            <>
              <p className="text-sm text-gray-300 mb-4 leading-relaxed border-l-2 border-neon-cyan pl-3">{result.advice}</p>
              <ul className="space-y-3">
                {result.roadmap?.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-gray-400">
                    <span className="bg-gray-800 text-neon-cyan font-mono w-5 h-5 rounded flex items-center justify-center text-[10px] flex-shrink-0 border border-gray-700">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          {mode === 'translator' && result.translation && (
            <div className="flex gap-3">
              <Shuffle className="text-neon-cyan flex-shrink-0" size={20} />
              <p className="text-sm text-white italic">"{result.translation}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-white">{MOCK_USER.name}</span>!</h1>
          <p className="text-gray-500 font-mono text-sm">System Status: Ready to Learn</p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-3 bg-dark-card px-5 py-3 rounded-xl border border-dark-border shadow-lg hover:border-neon-cyan/50 transition-colors">
            <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center text-yellow-500 border border-yellow-500/20">
              <Coins size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">SkillCoins</p>
              <p className="text-xl font-bold text-white">{MOCK_USER.wallet?.skillCoins}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-dark-card px-5 py-3 rounded-xl border border-dark-border shadow-lg hover:border-neon-red/50 transition-colors">
            <div className="w-10 h-10 bg-neon-red/10 rounded-lg flex items-center justify-center text-neon-red border border-neon-red/20">
              <Flame size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Streak</p>
              <p className="text-xl font-bold text-white">5 Days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pro Banner */}
      <div className="bg-gradient-to-r from-yellow-900/20 to-yellow-600/20 border border-yellow-500/30 rounded-2xl p-4 flex items-center justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
        <div className="flex items-center gap-4 relative z-10">
           <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-500">
             <Zap fill="currentColor" />
           </div>
           <div>
             <h3 className="text-white font-bold text-lg">Upgrade to SkillSwap+</h3>
             <p className="text-gray-400 text-sm">Get unlimited AI roadmaps and hire top mentors.</p>
           </div>
        </div>
        <button className="bg-yellow-500 text-black font-bold px-6 py-2 rounded-lg hover:bg-yellow-400 transition-colors relative z-10">
          Go Pro
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: AI & Up Next */}
        <div className="lg:col-span-2 space-y-8">
          <AIWidget />

          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="text-neon-cyan" size={20} />
              Incoming Sessions
            </h3>
            <div className="grid gap-4">
              {/* Session Card 1 */}
              <div className="bg-dark-card p-5 rounded-xl border border-dark-border hover:border-neon-red transition-all group cursor-pointer shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-neon-red"></div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gray-800 bg-cover bg-center border-2 border-gray-700" style={{ backgroundImage: 'url(https://picsum.photos/seed/sarah/200)' }}></div>
                  <div>
                    <p className="font-bold text-white text-lg group-hover:text-neon-red transition-colors">Spanish Conversation</p>
                    <p className="text-sm text-gray-400 flex items-center gap-1">with <span className="text-gray-200">Sarah Jenkins</span></p>
                  </div>
                </div>
                <div className="text-right w-full sm:w-auto pl-4 sm:pl-0 border-l sm:border-l-0 border-gray-800">
                  <p className="text-sm font-bold text-neon-red flex items-center gap-2 sm:justify-end">
                    <Clock size={14} /> Today
                  </p>
                  <p className="text-xs text-gray-500 font-mono">14:00 - 15:00</p>
                </div>
              </div>
              
              {/* Session Card 2 */}
              <div className="bg-dark-card p-5 rounded-xl border border-dark-border hover:border-neon-cyan transition-all group cursor-pointer shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-neon-cyan"></div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gray-800 bg-cover bg-center border-2 border-gray-700" style={{ backgroundImage: 'url(https://picsum.photos/seed/mike/200)' }}></div>
                  <div>
                    <p className="font-bold text-white text-lg group-hover:text-neon-cyan transition-colors">React Hooks Basics</p>
                    <p className="text-sm text-gray-400 flex items-center gap-1">Teaching <span className="text-gray-200">Mike T.</span></p>
                  </div>
                </div>
                <div className="text-right w-full sm:w-auto pl-4 sm:pl-0 border-l sm:border-l-0 border-gray-800">
                  <p className="text-sm font-bold text-neon-cyan flex items-center gap-2 sm:justify-end">
                    <Clock size={14} /> Tomorrow
                  </p>
                  <p className="text-xs text-gray-500 font-mono">10:00 - 11:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Trending Skills */}
        <div className="space-y-6">
          <div className="bg-dark-card rounded-2xl border border-dark-border p-6 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Star className="text-yellow-500" size={20} />
              Trending Network
            </h3>
            <div className="space-y-5">
              {['Flutter Development', 'Digital Photography', 'Synthwave Production', 'Yoga for Hackers'].map((skill, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                  <span className="font-mono text-2xl font-bold text-gray-800 group-hover:text-neon-cyan transition-colors">0{i + 1}</span>
                  <div className="flex-1 pb-2 border-b border-gray-800 group-hover:border-gray-600 transition-colors">
                     <p className="font-medium text-gray-300 group-hover:text-white transition-colors">{skill}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/marketplace" className="block w-full mt-8 py-3 text-sm font-bold text-black bg-white rounded-xl hover:bg-neon-cyan hover:shadow-[0_0_15px_#00FFD1] transition-all text-center">
              Explore Marketplace
            </Link>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 text-center border border-gray-800 relative overflow-hidden">
             <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl border border-gray-700 relative z-10">
              🚀
            </div>
            <h3 className="font-bold text-white text-lg mb-2 relative z-10">Boost Your Rank</h3>
            <p className="text-gray-400 text-sm mb-5 relative z-10">Invite a peer to the network and earn 50 reputation points instantly.</p>
            <button className="bg-gray-800 text-white border border-gray-700 text-sm font-bold px-6 py-2 rounded-full hover:border-neon-cyan hover:text-neon-cyan transition-all relative z-10">
              Generate Invite Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
