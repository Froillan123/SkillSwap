import React from 'react';
import { Home, Search, MessageSquare, User, Calendar, Zap, Globe, Swords } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  isNew?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isActive, isNew }) => (
  <Link
    to={to}
    className={`flex items-center gap-4 px-6 py-3 mx-3 rounded-xl transition-all duration-200 relative overflow-hidden ${
      isActive 
        ? 'text-neon-cyan bg-white/5 shadow-[0_0_15px_rgba(0,255,209,0.1)] border-l-2 border-neon-cyan' 
        : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
    }`}
  >
    <Icon size={22} strokeWidth={isActive ? 2.5 : 2} className={`transition-transform duration-300 ${isActive ? 'drop-shadow-[0_0_5px_rgba(0,255,209,0.8)]' : ''}`} />
    <span className={`font-medium text-sm whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-white' : ''}`}>
      {label}
    </span>
    {isNew && (
      <span className="absolute right-2 w-2 h-2 bg-neon-red rounded-full animate-pulse"></span>
    )}
  </Link>
);

export const Navigation: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/resources', icon: Globe, label: 'Skill Feed', isNew: true },
    { to: '/marketplace', icon: Search, label: 'Marketplace' },
    { to: '/challenges', icon: Swords, label: 'Challenges', isNew: true },
    { to: '/calendar', icon: Calendar, label: 'Schedule' },
    { to: '/messages', icon: MessageSquare, label: 'Messages' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <>
      {/* Desktop Sidebar - Fixed Width */}
      <nav className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-dark-card border-r border-dark-border z-50 shadow-2xl">
        {/* Logo Area */}
        <div className="flex items-center gap-3 px-6 py-8 mb-4">
          <div className="min-w-[40px] w-10 h-10 bg-gradient-to-br from-neon-cyan to-blue-600 rounded-lg flex items-center justify-center text-black shadow-[0_0_15px_rgba(0,255,209,0.4)]">
            <Zap size={24} fill="currentColor" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              SkillSwap<span className="text-yellow-400">+</span>
            </h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Learn & Earn</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2 flex-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <NavItem 
              key={item.to} 
              {...item} 
              isActive={currentPath === item.to} 
            />
          ))}
        </div>

        {/* Bottom Widget: Daily Quest */}
        <div className="p-6 mt-auto">
          <div className="bg-gradient-to-br from-[#1A1A1A] to-black p-5 rounded-2xl border border-gray-800 relative overflow-hidden group hover:border-neon-cyan/30 transition-colors cursor-pointer">
             <div className="absolute top-0 right-0 w-16 h-16 bg-neon-cyan/10 blur-2xl rounded-full pointer-events-none"></div>
            <p className="text-xs font-mono text-neon-cyan mb-2 font-bold tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></span>
              DAILY QUEST
            </p>
            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              Teach 1 session to unlock the <span className="text-white font-bold">Cyber Mentor</span> badge.
            </p>
            <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-neon-cyan h-full w-2/3 shadow-[0_0_10px_#00FFD1]"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-dark-card border-t border-dark-border px-6 py-3 z-50 flex justify-between items-center pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.5)] overflow-x-auto">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center gap-1 p-2 min-w-[60px] rounded-lg transition-colors ${
              currentPath === item.to ? 'text-neon-cyan' : 'text-gray-500'
            }`}
          >
            <item.icon size={20} strokeWidth={currentPath === item.to ? 2.5 : 2} className={currentPath === item.to ? 'drop-shadow-[0_0_8px_rgba(0,255,209,0.6)]' : ''} />
            <span className="text-[9px] font-medium truncate w-full text-center">{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
};