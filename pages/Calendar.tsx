
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Video, MapPin } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, getDay } from 'date-fns';

// Mock Session Data
interface SessionEvent {
  id: string;
  title: string;
  partner: string;
  type: 'teaching' | 'learning';
  date: Date;
  time: string;
  mode: 'video' | 'in-person';
}

const generateMockSessions = (baseDate: Date): SessionEvent[] => [
  {
    id: '1',
    title: 'Advanced React Patterns',
    partner: 'Sarah Jenkins',
    type: 'teaching',
    date: new Date(baseDate.getFullYear(), baseDate.getMonth(), 15),
    time: '14:00 PM',
    mode: 'video'
  },
  {
    id: '2',
    title: 'Spanish Conversation',
    partner: 'Mike T.',
    type: 'learning',
    date: new Date(baseDate.getFullYear(), baseDate.getMonth(), 18),
    time: '10:00 AM',
    mode: 'video'
  },
  {
    id: '3',
    title: 'Piano Basics',
    partner: 'Elena R.',
    type: 'learning',
    date: new Date(baseDate.getFullYear(), baseDate.getMonth(), 15), // Same day as React
    time: '16:30 PM',
    mode: 'in-person'
  },
  {
    id: '4',
    title: 'System Design Interview',
    partner: 'Davide C.',
    type: 'teaching',
    date: new Date(baseDate.getFullYear(), baseDate.getMonth(), 22),
    time: '19:00 PM',
    mode: 'video'
  }
];

export const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Derived state
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Padding days for grid alignment (start on Sunday)
  const startDayOfWeek = getDay(monthStart);
  const paddingDays = Array.from({ length: startDayOfWeek });

  const sessions = generateMockSessions(currentDate);

  const getSessionsForDay = (day: Date) => {
    return sessions.filter(s => isSameDay(s.date, day));
  };

  const selectedDaySessions = getSessionsForDay(selectedDate);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <div className="flex flex-col xl:flex-row gap-8 h-auto xl:h-[calc(100vh-6rem)] animate-in fade-in duration-500">
      {/* Left Panel: Calendar Grid */}
      <div className="flex-1 bg-dark-card border border-dark-border rounded-2xl p-4 md:p-6 shadow-lg flex flex-col">
        {/* Calendar Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <CalendarIcon className="text-neon-cyan" />
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <div className="flex items-center gap-2">
            <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
              <ChevronLeft size={24} />
            </button>
            <button onClick={() => setCurrentDate(new Date())} className="text-sm font-mono text-neon-cyan border border-neon-cyan/30 px-3 py-1 rounded-md hover:bg-neon-cyan/10 transition-colors">
              TODAY
            </button>
            <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-gray-500 text-xs md:text-sm font-mono uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 md:gap-2 lg:gap-4 flex-1 auto-rows-fr min-h-[300px]">
          {paddingDays.map((_, i) => (
            <div key={`padding-${i}`} className="bg-transparent" />
          ))}
          
          {daysInMonth.map((day, i) => {
            const daySessions = getSessionsForDay(day);
            const isSelected = isSameDay(day, selectedDate);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isTodayDate = isToday(day);

            return (
              <button
                key={i}
                onClick={() => setSelectedDate(day)}
                className={`relative rounded-xl p-2 flex flex-col items-center transition-all duration-200 group min-h-[50px] md:min-h-[80px]
                  ${isSelected ? 'bg-white/10 ring-2 ring-neon-cyan shadow-[0_0_10px_rgba(0,255,209,0.2)]' : 'hover:bg-white/5'}
                  ${!isCurrentMonth ? 'opacity-30' : 'opacity-100'}
                  ${isTodayDate ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-dark-bg/50'}
                `}
              >
                <span className={`text-xs md:text-sm font-medium mb-1 ${
                  isTodayDate ? 'text-neon-cyan font-bold' : 
                  isSelected ? 'text-white' : 'text-gray-400'
                }`}>
                  {format(day, 'd')}
                </span>
                
                {/* Dots for sessions */}
                <div className="flex gap-1 mt-1 flex-wrap justify-center">
                  {daySessions.map((s, idx) => (
                    <div 
                      key={idx} 
                      className={`w-1.5 h-1.5 rounded-full ${
                        s.type === 'teaching' ? 'bg-neon-red shadow-[0_0_4px_#FF5E5E]' : 'bg-neon-cyan shadow-[0_0_4px_#00FFD1]'
                      }`} 
                    />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Panel: Agenda / Details */}
      <div className="w-full xl:w-96 bg-dark-card border border-dark-border rounded-2xl p-6 shadow-lg flex flex-col h-[500px] xl:h-auto">
        <div className="mb-6 pb-6 border-b border-gray-800">
          <h3 className="text-gray-400 font-mono text-sm uppercase tracking-wider mb-1">Selected Date</h3>
          <h2 className="text-3xl font-bold text-white">{format(selectedDate, 'EEEE, MMM do')}</h2>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar">
          {selectedDaySessions.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-48 text-gray-500">
               <Clock size={48} className="mb-4 opacity-20" />
               <p>No sessions scheduled.</p>
               <button className="mt-4 text-neon-cyan text-sm hover:underline">Schedule a Swap +</button>
             </div>
          ) : (
            selectedDaySessions.map(session => (
              <div 
                key={session.id} 
                className={`p-4 rounded-xl border-l-4 ${
                  session.type === 'teaching' ? 'border-neon-red bg-neon-red/5' : 'border-neon-cyan bg-neon-cyan/5'
                } hover:bg-white/5 transition-colors`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-white">{session.title}</h4>
                  <span className={`text-[10px] px-2 py-1 rounded uppercase font-bold ${
                    session.type === 'teaching' ? 'bg-neon-red/20 text-neon-red' : 'bg-neon-cyan/20 text-neon-cyan'
                  }`}>
                    {session.type}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span>{session.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {session.mode === 'video' ? <Video size={14} /> : <MapPin size={14} />}
                    <span>{session.mode === 'video' ? 'Online Video Call' : 'In Person'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-gray-700" />
                    <span>{session.partner}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-800">
           <button className="w-full py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-blue-500 text-black font-bold hover:shadow-[0_0_20px_rgba(0,255,209,0.3)] transition-all">
             + Schedule New Session
           </button>
        </div>
      </div>
    </div>
  );
};
