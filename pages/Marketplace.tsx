
import React, { useState } from 'react';
import { Search, Filter, Star, Clock, User as UserIcon, Briefcase, Zap, CheckCircle, X, Calendar } from 'lucide-react';
import { SkillCategory, Mentor } from '../types';

// Combined type for display
type ListingType = 'peer' | 'mentor';

interface MarketplaceListing {
  id: string;
  type: ListingType;
  name: string;
  avatar: string;
  skillName: string;
  category: SkillCategory;
  rating: number;
  reviewCount: number;
  level: string;
  description: string;
  hourlyRate?: number; // For mentors
  verified?: boolean; // For mentors
}

const MOCK_LISTINGS: MarketplaceListing[] = [
  {
    id: '1',
    type: 'mentor',
    name: 'Sarah Jenkins',
    avatar: 'https://picsum.photos/seed/sarah/100',
    skillName: 'Professional Guitar & Theory',
    category: SkillCategory.MUSIC,
    rating: 5.0,
    reviewCount: 128,
    level: 'Grandmaster',
    description: 'Touring musician with 10 years experience. I teach advanced improvisation.',
    hourlyRate: 45,
    verified: true
  },
  {
    id: '2',
    type: 'peer',
    name: 'David C.',
    avatar: 'https://picsum.photos/seed/david/100',
    skillName: 'Intro to Python',
    category: SkillCategory.TECHNOLOGY,
    rating: 4.8,
    reviewCount: 15,
    level: 'Beginner',
    description: 'Zero to hero in Python. We will build 3 projects together.',
  },
  {
    id: '3',
    type: 'mentor',
    name: 'Dr. Elena R.',
    avatar: 'https://picsum.photos/seed/elena/100',
    skillName: 'Academic Writing & Thesis',
    category: SkillCategory.ACADEMIC,
    rating: 5.0,
    reviewCount: 89,
    level: 'Expert',
    description: 'Published author helping you structure your thesis or dissertation.',
    hourlyRate: 60,
    verified: true
  },
  {
    id: '4',
    type: 'peer',
    name: 'Marcus T.',
    avatar: 'https://picsum.photos/seed/marcus/100',
    skillName: 'French Conversation',
    category: SkillCategory.LANGUAGE,
    rating: 4.7,
    reviewCount: 45,
    level: 'All Levels',
    description: 'Native speaker. Casual conversation practice to boost confidence.',
  },
   {
    id: '5',
    type: 'peer',
    name: 'Jenny W.',
    avatar: 'https://picsum.photos/seed/jenny/100',
    skillName: 'Organic Gardening',
    category: SkillCategory.LIFESTYLE,
    rating: 4.9,
    reviewCount: 12,
    level: 'Beginner',
    description: 'Start your own vegetable garden in small spaces.',
  }
];

// Modal Component
const BookingModal = ({ 
  listing, 
  onClose, 
  onConfirm 
}: { 
  listing: MarketplaceListing; 
  onClose: () => void; 
  onConfirm: () => void; 
}) => {
  const [step, setStep] = useState(1);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-dark-card w-full max-w-md rounded-2xl border border-dark-border shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-dark-card">
          <h3 className="text-xl font-bold text-white">
            {listing.type === 'mentor' ? 'Hire Mentor' : 'Request Swap'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={24} /></button>
        </div>

        <div className="overflow-y-auto p-6 custom-scrollbar">
          {step === 1 ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img src={listing.avatar} className="w-16 h-16 rounded-full object-cover border-2 border-gray-700" alt="" />
                <div>
                  <p className="font-bold text-white text-lg">{listing.name}</p>
                  <p className="text-gray-400">{listing.skillName}</p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-300">Select Date</label>
                <input type="date" className="w-full bg-dark-bg border border-gray-700 rounded-lg p-3 text-white focus:border-neon-cyan outline-none" />
                
                <label className="block text-sm font-bold text-gray-300">Select Time</label>
                <select className="w-full bg-dark-bg border border-gray-700 rounded-lg p-3 text-white focus:border-neon-cyan outline-none">
                  <option>10:00 AM</option>
                  <option>02:00 PM</option>
                  <option>04:30 PM</option>
                </select>
              </div>

              {listing.type === 'mentor' && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex justify-between items-center">
                  <span className="text-yellow-500 font-bold">Total (1 hr)</span>
                  <span className="text-white font-bold text-xl">${listing.hourlyRate}</span>
                </div>
              )}

              <button 
                onClick={() => setStep(2)}
                className="w-full py-3 rounded-xl bg-neon-cyan text-black font-bold hover:bg-white transition-colors"
              >
                {listing.type === 'mentor' ? 'Proceed to Payment' : 'Send Request'}
              </button>
            </div>
          ) : (
            <div className="text-center space-y-4 py-4">
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white">Success!</h3>
              <p className="text-gray-400">
                {listing.type === 'mentor' 
                  ? 'Your session has been booked. Check your email for details.' 
                  : 'Swap request sent! Wait for them to accept.'}
              </p>
              <button 
                onClick={onConfirm}
                className="w-full py-3 rounded-xl bg-gray-800 text-white font-bold hover:bg-gray-700 transition-colors mt-4"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const Marketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'peer' | 'mentor'>('peer');
  const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(null);

  const filteredListings = MOCK_LISTINGS.filter(listing => {
    const matchesSearch = listing.skillName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          listing.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || listing.category === selectedCategory;
    const matchesTab = listing.type === activeTab;
    return matchesSearch && matchesCategory && matchesTab;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {selectedListing && (
        <BookingModal 
          listing={selectedListing} 
          onClose={() => setSelectedListing(null)} 
          onConfirm={() => setSelectedListing(null)}
        />
      )}

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white">Skill Marketplace</h1>
        <p className="text-gray-500">Find your next mentor or swap partner in the network.</p>
      </div>

      {/* Mode Toggle Tabs */}
      <div className="flex p-1 bg-black/30 rounded-xl border border-gray-800 w-full md:w-fit">
        <button 
          onClick={() => setActiveTab('peer')}
          className={`flex-1 md:flex-none px-8 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'peer' 
              ? 'bg-gray-800 text-white shadow-lg' 
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <UserIcon size={18} /> Free Swap
        </button>
        <button 
          onClick={() => setActiveTab('mentor')}
          className={`flex-1 md:flex-none px-8 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'mentor' 
              ? 'bg-gradient-to-r from-yellow-500 to-yellow-700 text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]' 
              : 'text-gray-500 hover:text-yellow-500'
          }`}
        >
          <Briefcase size={18} /> Hire Pro
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-dark-card p-4 rounded-2xl border border-dark-border shadow-lg flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder={activeTab === 'peer' ? "Search for skills to swap..." : "Find expert mentors..."}
            className="w-full pl-10 pr-4 py-3 bg-dark-bg border border-gray-800 rounded-xl text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all placeholder:text-gray-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <Filter size={20} className="text-gray-500 hidden md:block" />
          <select 
            className="bg-dark-bg border border-gray-800 text-gray-300 text-sm rounded-xl focus:border-neon-cyan focus:ring-neon-cyan block p-3 min-w-[140px] outline-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {Object.values(SkillCategory).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <div 
            key={listing.id} 
            className={`bg-dark-card rounded-2xl overflow-hidden transition-all duration-300 group relative flex flex-col ${
              listing.type === 'mentor' 
                ? 'border border-yellow-500/30 hover:border-yellow-500 shadow-[0_0_0_1px_rgba(234,179,8,0.1)]' 
                : 'border border-dark-border hover:border-neon-cyan/40 hover:shadow-[0_0_20px_rgba(0,255,209,0.1)]'
            }`}
          >
            {/* Mentor Gold Glow */}
            {listing.type === 'mentor' && (
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-50 pointer-events-none" />
            )}
            
            <div className="p-6 relative z-10 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={listing.avatar} alt={listing.name} className={`w-12 h-12 rounded-full object-cover ${listing.type === 'mentor' ? 'ring-2 ring-yellow-500' : 'border border-gray-600'}`} />
                    {listing.verified && <CheckCircle size={14} className="absolute bottom-0 right-0 text-blue-400 bg-black rounded-full" fill="currentColor" />}
                  </div>
                  <div>
                    <p className={`text-sm font-bold flex items-center gap-1 ${listing.type === 'mentor' ? 'text-yellow-500' : 'text-white'}`}>
                      {listing.name}
                      {listing.type === 'mentor' && <span className="text-[10px] bg-yellow-500/10 px-1 rounded border border-yellow-500/20">PRO</span>}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      {listing.type === 'mentor' ? 'Certified Mentor' : 'Community Peer'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-2 py-1 rounded-lg text-xs font-bold">
                  <Star size={12} fill="currentColor" />
                  {listing.rating} <span className="font-normal opacity-70">({listing.reviewCount})</span>
                </div>
              </div>
              
              <div className="mb-4 flex-1">
                <span className="inline-block px-2 py-1 bg-gray-800 text-gray-300 text-[10px] font-bold uppercase tracking-wider rounded-md mb-2 border border-gray-700">
                  {listing.category}
                </span>
                <h3 className={`text-lg font-bold mb-2 transition-colors ${listing.type === 'mentor' ? 'text-white group-hover:text-yellow-400' : 'text-white group-hover:text-neon-cyan'}`}>
                  {listing.skillName}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">{listing.description}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-800 mt-auto">
                {listing.type === 'mentor' ? (
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Rate</span>
                    <span className="text-lg font-bold text-white">${listing.hourlyRate}<span className="text-xs font-normal text-gray-500">/hr</span></span>
                  </div>
                ) : (
                  <span className="text-xs font-medium text-gray-400 bg-dark-bg px-3 py-1 rounded-full border border-gray-800">
                    {listing.level}
                  </span>
                )}
                
                <button 
                  onClick={() => setSelectedListing(listing)}
                  className={`text-sm font-bold px-4 py-2 rounded-lg transition-all ${
                  listing.type === 'mentor' 
                    ? 'bg-yellow-500 text-black hover:bg-yellow-400' 
                    : 'text-neon-cyan hover:text-white flex items-center gap-1'
                }`}>
                  {listing.type === 'mentor' ? 'Book Session' : <>Request Swap <Clock size={14} /></>}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-20 text-gray-600">
          <Search size={48} className="mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium">No skills found in the network.</p>
          <p>Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>
  );
};
