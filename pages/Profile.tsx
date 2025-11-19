import React, { useState, useEffect } from 'react';
import { MapPin, Edit2, Plus, Trash2, Award, Sparkles, ExternalLink, Briefcase } from 'lucide-react';
import { User, SkillCategory, PortfolioItem } from '../types';
import { suggestSkills } from '../services/geminiService';

const INITIAL_PROFILE: User = {
  id: '1',
  name: 'Alex Rivera',
  avatar: 'https://picsum.photos/200/200',
  bio: 'Software engineer engaging in creative writing and piano. Looking to expand my horizons!',
  reputationPoints: 1250,
  level: 12,
  badges: ['Top Teacher', 'Fast Learner', 'Community Pillar'],
  isPro: true,
  skillsOffered: [
    { id: '1', name: 'React.js', category: SkillCategory.TECHNOLOGY, level: 'Expert' },
    { id: '2', name: 'Creative Writing', category: SkillCategory.ART, level: 'Intermediate' }
  ],
  skillsWanted: [
    { id: '3', name: 'Piano', category: SkillCategory.MUSIC, level: 'Beginner' }
  ],
  portfolio: [
    {
      id: '1',
      title: 'E-Commerce Dashboard',
      description: 'A full-stack dashboard built with React and Node.js. Deployed on Vercel.',
      image: 'https://picsum.photos/seed/dashboard/300/200',
      skillsUsed: ['React', 'Node.js', 'Tailwind'],
      link: '#'
    },
    {
      id: '2',
      title: 'Sci-Fi Short Story Collection',
      description: 'Published a collection of 5 short stories in local magazines.',
      image: 'https://picsum.photos/seed/book/300/200',
      skillsUsed: ['Writing', 'Editing'],
      link: '#'
    }
  ]
};

export const Profile: React.FC = () => {
  const [user, setUser] = useState<User>(INITIAL_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);

  useEffect(() => {
    // Load AI suggestions on mount
    suggestSkills(user.bio).then(setSuggestedSkills);
  }, [user.bio]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Profile Header */}
      <div className="bg-dark-card rounded-3xl shadow-lg border border-dark-border overflow-hidden relative group">
        {/* Banner */}
        <div className={`h-48 relative ${user.isPro ? 'bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700' : 'bg-gradient-to-r from-neon-cyan/80 via-blue-600/80 to-neon-purple/80'}`}>
            <div className="absolute inset-0 bg-black/20"></div>
            {user.isPro && (
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-yellow-400 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Sparkles size={12} fill="currentColor" /> PRO MEMBER
              </div>
            )}
        </div>

        <div className="px-8 pb-8 relative">
          <div className="flex flex-col md:flex-row justify-between items-end md:items-start -mt-16 mb-6">
            <div className="flex items-end gap-6">
              <div className={`w-32 h-32 rounded-3xl border-4 shadow-2xl overflow-hidden bg-dark-card relative z-10 ${user.isPro ? 'border-yellow-500' : 'border-dark-card'}`}>
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div className="mb-2 relative z-10">
                <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                  {user.name}
                  {user.isPro && <Sparkles className="text-yellow-500" fill="currentColor" size={20} />}
                </h1>
                <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                  <MapPin size={16} className="text-neon-cyan" /> San Francisco, CA
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="mt-4 md:mt-0 px-4 py-2 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 hover:text-neon-cyan transition-colors flex items-center gap-2 text-sm border border-gray-700"
            >
              <Edit2 size={16} /> {isEditing ? 'Save Profile' : 'Edit Profile'}
            </button>
          </div>

          <p className="text-gray-300 max-w-2xl leading-relaxed text-lg mb-8 font-light">
            {user.bio}
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 px-4 py-2 rounded-xl font-bold flex items-center gap-2">
              <Award size={18} /> Level {user.level}
            </div>
            {user.badges.map((badge, i) => (
              <div key={i} className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-4 py-2 rounded-xl font-bold flex items-center gap-2 shadow-[0_0_10px_rgba(234,179,8,0.1)]">
                <Sparkles size={14} /> {badge}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Skills */}
        <div className="lg:col-span-1 space-y-6">
           {/* Offering Column */}
          <div className="bg-dark-card p-6 rounded-2xl border border-dark-border shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-neon-cyan"></div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Teaching</h2>
              <button className="p-2 hover:bg-white/10 rounded-full text-neon-cyan transition-colors">
                <Plus size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {user.skillsOffered.map(skill => (
                <div key={skill.id} className="flex items-center justify-between p-3 rounded-xl bg-dark-bg border border-gray-800">
                  <div>
                    <p className="font-bold text-white text-sm">{skill.name}</p>
                    <span className="text-[10px] font-medium text-neon-cyan bg-neon-cyan/10 px-2 py-0.5 rounded-md mt-1 inline-block">{skill.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Column */}
          <div className="bg-dark-card p-6 rounded-2xl border border-dark-border shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-neon-purple"></div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Learning</h2>
              <button className="p-2 hover:bg-white/10 rounded-full text-neon-purple transition-colors">
                <Plus size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {user.skillsWanted.map(skill => (
                <div key={skill.id} className="flex items-center justify-between p-3 rounded-xl bg-dark-bg border border-gray-800">
                  <div>
                    <p className="font-bold text-white text-sm">{skill.name}</p>
                    <span className="text-[10px] font-medium text-neon-purple bg-neon-purple/10 px-2 py-0.5 rounded-md mt-1 inline-block">{skill.level}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Suggestions */}
            {suggestedSkills.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-800">
                <div className="flex items-center gap-2 mb-3 text-xs font-bold text-gray-500 uppercase tracking-wide">
                  <Sparkles size={12} className="text-neon-cyan" />
                  Recommended
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestedSkills.slice(0, 3).map((skill, i) => (
                    <button key={i} className="px-3 py-1 rounded-full border border-gray-700 text-gray-300 text-xs font-medium hover:bg-gray-800 hover:text-neon-cyan transition-all">
                      + {skill}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Portfolio */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-dark-card p-6 rounded-2xl border border-dark-border shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Briefcase className="text-neon-cyan" /> Skill Portfolio
                </h2>
                <button className="px-4 py-2 bg-white/5 text-white text-sm font-bold rounded-lg hover:bg-white/10 transition-colors border border-gray-700">
                  + Add Project
                </button>
              </div>

              <div className="grid gap-6">
                {user.portfolio?.map(item => (
                  <div key={item.id} className="bg-dark-bg rounded-xl overflow-hidden border border-gray-800 flex flex-col md:flex-row hover:border-gray-600 transition-colors group">
                    <div className="w-full md:w-48 h-32 bg-gray-800 flex-shrink-0 relative overflow-hidden">
                       <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5 flex-1">
                       <div className="flex justify-between items-start mb-2">
                         <h3 className="text-lg font-bold text-white">{item.title}</h3>
                         <button className="text-gray-500 hover:text-white transition-colors">
                           <ExternalLink size={16} />
                         </button>
                       </div>
                       <p className="text-sm text-gray-400 mb-4 leading-relaxed">{item.description}</p>
                       <div className="flex flex-wrap gap-2">
                         {item.skillsUsed.map((skill, i) => (
                           <span key={i} className="text-[10px] font-bold px-2 py-1 bg-gray-800 text-gray-300 rounded border border-gray-700">
                             {skill}
                           </span>
                         ))}
                       </div>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};