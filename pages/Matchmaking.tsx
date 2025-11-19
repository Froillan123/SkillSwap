
import React, { useState } from 'react';
import { X, Heart, MessageSquare, Star, Zap, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SkillCategory } from '../types';

interface MatchProfile {
  id: string;
  name: string;
  age: number;
  bio: string;
  avatar: string;
  wantsToLearn: string;
  canTeach: string;
  matchPercentage: number;
  category: SkillCategory;
}

const MOCK_PROFILES: MatchProfile[] = [
  {
    id: '1',
    name: 'Jessica Lee',
    age: 24,
    bio: 'Guitarist looking for a coding buddy. I can teach you scales if you teach me Python!',
    avatar: 'https://picsum.photos/seed/jessica/400/600',
    wantsToLearn: 'Python Programming',
    canTeach: 'Acoustic Guitar',
    matchPercentage: 94,
    category: SkillCategory.MUSIC
  },
  {
    id: '2',
    name: 'Ryan Chen',
    age: 28,
    bio: 'Full stack dev wanting to get into digital art. Let\'s swap skills!',
    avatar: 'https://picsum.photos/seed/ryan/400/600',
    wantsToLearn: 'Digital Illustration',
    canTeach: 'React & Node.js',
    matchPercentage: 88,
    category: SkillCategory.TECHNOLOGY
  },
  {
    id: '3',
    name: 'Emily Watson',
    age: 22,
    bio: 'French native speaker. I need help with my Calculus homework.',
    avatar: 'https://picsum.photos/seed/emily/400/600',
    wantsToLearn: 'Calculus',
    canTeach: 'French Language',
    matchPercentage: 82,
    category: SkillCategory.LANGUAGE
  }
];

export const Matchmaking: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matched, setMatched] = useState<MatchProfile | null>(null);
  const [animation, setAnimation] = useState<'none' | 'left' | 'right'>('none');

  const currentProfile = MOCK_PROFILES[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    setAnimation(direction);
    
    setTimeout(() => {
      if (direction === 'right') {
        // Simulate random match
        if (Math.random() > 0.3) {
          setMatched(currentProfile);
        } else {
           advanceProfile();
        }
      } else {
        advanceProfile();
      }
    }, 300);
  };

  const advanceProfile = () => {
    setAnimation('none');
    if (currentIndex < MOCK_PROFILES.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Reset for demo purposes or show empty state
      setCurrentIndex(0);
    }
  };

  const handleCloseMatch = () => {
    setMatched(null);
    advanceProfile();
  };

  if (!currentProfile) return null;

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <Flame className="text-neon-red fill-neon-red" /> Skill Match
        </h1>
        <p className="text-gray-500 text-sm">Swipe right to swap skills</p>
      </div>

      {/* Card Stack */}
      <div className="relative w-full max-w-md h-[500px]">
        {/* Background Card (Next Profile) */}
        {currentIndex < MOCK_PROFILES.length - 1 && (
          <div className="absolute top-4 left-0 right-0 mx-auto w-[90%] h-full bg-gray-800 rounded-3xl opacity-50 scale-95 -z-10"></div>
        )}

        {/* Active Card */}
        <div 
          className={`absolute inset-0 bg-dark-card rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-gray-700 transition-transform duration-300 ${
            animation === 'left' ? '-translate-x-full rotate-[-20deg] opacity-0' : 
            animation === 'right' ? 'translate-x-full rotate-[20deg] opacity-0' : ''
          }`}
        >
          <div className="h-3/5 bg-cover bg-center relative" style={{ backgroundImage: `url(${currentProfile.avatar})` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                {currentProfile.name}, {currentProfile.age}
              </h2>
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/30">
                {currentProfile.category}
              </span>
            </div>
            <div className="absolute top-4 right-4 bg-neon-cyan text-black font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
              <Zap size={14} fill="currentColor" /> {currentProfile.matchPercentage}% Match
            </div>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-gray-300 italic">"{currentProfile.bio}"</p>
            
            <div className="flex gap-4">
              <div className="flex-1 bg-neon-red/10 p-3 rounded-xl border border-neon-red/20">
                <p className="text-[10px] font-bold text-neon-red uppercase tracking-wider">Wants to Learn</p>
                <p className="font-bold text-white">{currentProfile.wantsToLearn}</p>
              </div>
              <div className="flex-1 bg-neon-cyan/10 p-3 rounded-xl border border-neon-cyan/20">
                <p className="text-[10px] font-bold text-neon-cyan uppercase tracking-wider">Can Teach</p>
                <p className="font-bold text-white">{currentProfile.canTeach}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mt-8">
        <button 
          onClick={() => handleSwipe('left')}
          className="w-16 h-16 rounded-full bg-gray-800 text-neon-red border border-gray-700 hover:bg-gray-700 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
        >
          <X size={32} />
        </button>
        <button 
          onClick={() => handleSwipe('right')}
          className="w-20 h-20 rounded-full bg-gradient-to-tr from-neon-cyan to-blue-500 text-black flex items-center justify-center transition-all hover:scale-110 hover:shadow-[0_0_25px_#00FFD1] shadow-xl"
        >
          <Heart size={40} fill="black" />
        </button>
        <button className="w-16 h-16 rounded-full bg-gray-800 text-white border border-gray-700 hover:bg-gray-700 flex items-center justify-center transition-all hover:scale-110 shadow-lg">
          <Star size={28} />
        </button>
      </div>

      {/* It's a Match Overlay */}
      {matched && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="text-center p-8">
            <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple mb-2 italic transform -rotate-6">
              It's a Match!
            </h2>
            <p className="text-white text-lg mb-8">You and {matched.name} want to swap skills.</p>
            
            <div className="flex justify-center items-center gap-8 mb-10">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-neon-cyan shadow-[0_0_20px_#00FFD1]">
                <img src="https://picsum.photos/200/200" alt="Me" className="w-full h-full object-cover" />
              </div>
              <Zap size={32} className="text-white animate-pulse" />
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-neon-purple shadow-[0_0_20px_#B026FF]">
                <img src={matched.avatar} alt={matched.name} className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link to="/messages" className="bg-neon-cyan text-black font-bold px-8 py-4 rounded-full hover:bg-white hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg">
                <MessageSquare size={20} /> Send a Message
              </Link>
              <button 
                onClick={handleCloseMatch}
                className="text-gray-400 font-bold hover:text-white transition-colors"
              >
                Keep Swiping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
