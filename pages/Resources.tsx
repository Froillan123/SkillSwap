import React, { useState } from 'react';
import { Search, Filter, Play, BookOpen, Github, ExternalLink, Lock, Zap, Layers } from 'lucide-react';
import { Resource, SkillCategory } from '../types';
import { generateSkillAdvice } from '../services/geminiService';

// Simulated "Scraped" Content Feed
const MOCK_RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'Mastering React Hooks in 2024',
    type: 'video',
    source: 'YouTube',
    url: '#',
    thumbnail: 'https://picsum.photos/seed/react/400/250',
    category: SkillCategory.TECHNOLOGY,
    likes: 1240,
    isPremium: false
  },
  {
    id: '2',
    title: 'The Complete Guide to Color Theory',
    type: 'article',
    source: 'Medium',
    url: '#',
    thumbnail: 'https://picsum.photos/seed/color/400/250',
    category: SkillCategory.ART,
    likes: 850,
    isPremium: false
  },
  {
    id: '3',
    title: 'Python-Zero-to-Hero-Repo',
    type: 'repo',
    source: 'GitHub',
    url: '#',
    thumbnail: 'https://picsum.photos/seed/code/400/250',
    category: SkillCategory.TECHNOLOGY,
    likes: 3200,
    isPremium: false
  },
  {
    id: '4',
    title: 'Advanced Jazz Improvisation Masterclass',
    type: 'course',
    source: 'Coursera',
    url: '#',
    thumbnail: 'https://picsum.photos/seed/jazz/400/250',
    category: SkillCategory.MUSIC,
    likes: 500,
    isPremium: true
  },
  {
    id: '5',
    title: 'Conversational Spanish: Slang & Idioms',
    type: 'video',
    source: 'TikTok',
    url: '#',
    thumbnail: 'https://picsum.photos/seed/spanish/400/250',
    category: SkillCategory.LANGUAGE,
    likes: 15000,
    isPremium: false
  }
];

export const ResourcesPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [roadmapLoading, setRoadmapLoading] = useState(false);
  const [generatedRoadmap, setGeneratedRoadmap] = useState<string[] | null>(null);

  const handleGenerateRoadmap = async () => {
    setRoadmapLoading(true);
    // Simulate AI analyzing the feed content
    const result = await generateSkillAdvice("My current interests based on feed", ["React", "Design"]);
    setGeneratedRoadmap(result.roadmap);
    setRoadmapLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Layers className="text-neon-purple" /> Global Skill Feed
          </h1>
          <p className="text-gray-500 mt-1">Curated resources from around the web, tailored to your interests.</p>
        </div>
        
        <button 
          onClick={handleGenerateRoadmap}
          disabled={roadmapLoading}
          className="bg-gradient-to-r from-neon-cyan to-blue-600 text-black font-bold px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(0,255,209,0.3)] hover:shadow-[0_0_30px_rgba(0,255,209,0.5)] transition-all flex items-center gap-2"
        >
          {roadmapLoading ? <Zap className="animate-spin" /> : <Zap fill="currentColor" />}
          {roadmapLoading ? 'Analyzing Feed...' : 'Generate AI Roadmap'}
        </button>
      </div>

      {/* AI Generated Roadmap Section */}
      {generatedRoadmap && (
        <div className="bg-dark-card border border-neon-cyan/50 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-neon-cyan/5 pointer-events-none"></div>
          <h3 className="text-xl font-bold text-white mb-4 relative z-10">🎯 Your Custom Learning Path</h3>
          <div className="space-y-3 relative z-10">
            {generatedRoadmap.map((step, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 bg-black/40 rounded-lg border border-gray-700">
                 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-neon-cyan text-black font-bold text-sm">
                   {idx + 1}
                 </span>
                 <span className="text-gray-200">{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['All', 'Video', 'Article', 'Course', 'Repo', 'Premium'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all whitespace-nowrap ${
              filter === f 
                ? 'bg-white text-black border-white' 
                : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_RESOURCES.map((res) => (
          <div key={res.id} className="bg-dark-card rounded-xl overflow-hidden border border-dark-border group hover:border-neon-purple/50 hover:shadow-lg transition-all flex flex-col">
            {/* Thumbnail */}
            <div className="h-48 bg-gray-800 relative overflow-hidden">
              <img src={res.thumbnail} alt={res.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-2 right-2">
                {res.isPremium ? (
                  <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                    <Lock size={10} /> PRO
                  </span>
                ) : (
                  <span className="bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded">
                    Free
                  </span>
                )}
              </div>
              <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-1 rounded flex items-center gap-1 text-xs font-bold text-white">
                {res.source === 'YouTube' && <Play size={10} fill="currentColor" className="text-red-500" />}
                {res.source === 'Medium' && <BookOpen size={10} className="text-white" />}
                {res.source === 'GitHub' && <Github size={10} className="text-white" />}
                {res.source}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
              <span className="text-xs font-bold text-neon-purple mb-2 block">{res.category}</span>
              <h3 className="text-lg font-bold text-white leading-tight mb-3 group-hover:text-neon-purple transition-colors">
                {res.title}
              </h3>
              
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-800">
                <span className="text-xs text-gray-500 font-mono">{res.likes.toLocaleString()} interested</span>
                <button className="text-sm font-bold text-gray-300 hover:text-white flex items-center gap-1">
                  Open <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};