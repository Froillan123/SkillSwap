import React, { useState, useEffect, useRef } from 'react';
import { Send, Phone, Video, MoreVertical, Check } from 'lucide-react';
import { ChatMessage } from '../types';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

const MOCK_CONTACTS: Contact[] = [
  { id: '1', name: 'Sarah Jenkins', avatar: 'https://picsum.photos/seed/sarah/100', lastMessage: 'Sounds good! See you at 2 PM.', time: '10:30 AM', unread: 2, online: true },
  { id: '2', name: 'Mike T.', avatar: 'https://picsum.photos/seed/mike/100', lastMessage: 'Thanks for the React tip!', time: 'Yesterday', unread: 0, online: false },
  { id: '3', name: 'Elena R.', avatar: 'https://picsum.photos/seed/elena/100', lastMessage: 'Do I need to bring my own brushes?', time: 'Mon', unread: 0, online: true },
];

const MOCK_MESSAGES: ChatMessage[] = [
  { id: '1', senderId: '1', text: 'Hi Alex! I saw you want to learn Spanish.', timestamp: new Date(Date.now() - 10000000) },
  { id: '2', senderId: 'me', text: 'Hey Sarah! Yes, I am a total beginner though.', timestamp: new Date(Date.now() - 9000000) },
  { id: '3', senderId: '1', text: 'No worries at all. We can swap skills. I have been trying to learn React.', timestamp: new Date(Date.now() - 8000000) },
  { id: '4', senderId: 'me', text: 'That is perfect! I can definitely help with React.', timestamp: new Date(Date.now() - 7000000) },
  { id: '5', senderId: '1', text: 'Sounds good! See you at 2 PM.', timestamp: new Date(Date.now() - 1000) },
];

export const Messages: React.FC = () => {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(MOCK_CONTACTS[0].id);
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedContact = MOCK_CONTACTS.find(c => c.id === selectedContactId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      text: inputText,
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    setInputText('');

    // Simulate reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        senderId: selectedContactId || '1',
        text: "Awesome! Can't wait to start.",
        timestamp: new Date()
      }]);
    }, 2000);
  };

  return (
    <div className="flex h-[calc(100vh-6rem)] bg-dark-card rounded-2xl border border-dark-border overflow-hidden shadow-lg animate-in fade-in duration-500">
      {/* Contacts List */}
      <div className={`w-full md:w-80 border-r border-dark-border flex flex-col ${selectedContactId ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-dark-border">
          <h2 className="text-xl font-bold text-white">Messages</h2>
        </div>
        <div className="overflow-y-auto flex-1 bg-dark-card">
          {MOCK_CONTACTS.map(contact => (
            <div 
              key={contact.id}
              onClick={() => setSelectedContactId(contact.id)}
              className={`p-4 flex items-center gap-3 hover:bg-white/5 cursor-pointer transition-colors border-b border-gray-800/50 ${selectedContactId === contact.id ? 'bg-white/5 border-l-4 border-l-neon-cyan' : 'border-l-4 border-l-transparent'}`}
            >
              <div className="relative">
                <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-700" />
                {contact.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-neon-cyan border-2 border-dark-card rounded-full shadow-[0_0_5px_#00FFD1]"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <p className={`font-bold truncate ${selectedContactId === contact.id ? 'text-neon-cyan' : 'text-gray-200'}`}>{contact.name}</p>
                  <p className="text-xs text-gray-500">{contact.time}</p>
                </div>
                <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
              </div>
              {contact.unread > 0 && (
                <div className="w-5 h-5 bg-neon-cyan rounded-full flex items-center justify-center text-xs text-black font-bold shadow-[0_0_10px_#00FFD1]">
                  {contact.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      {selectedContact ? (
        <div className={`flex-1 flex flex-col ${!selectedContactId ? 'hidden md:flex' : 'flex'}`}>
          {/* Chat Header */}
          <div className="p-4 border-b border-dark-border flex justify-between items-center bg-dark-card sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <button onClick={() => setSelectedContactId(null)} className="md:hidden text-gray-400 hover:text-white">
                ←
              </button>
              <img src={selectedContact.avatar} alt={selectedContact.name} className="w-10 h-10 rounded-full object-cover ring-1 ring-gray-700" />
              <div>
                <h3 className="font-bold text-white">{selectedContact.name}</h3>
                <p className="text-xs text-neon-cyan">{selectedContact.online ? 'Online' : 'Offline'}</p>
              </div>
            </div>
            <div className="flex gap-2 text-neon-cyan">
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Phone size={20} /></button>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Video size={20} /></button>
              <button className="p-2 hover:bg-white/10 text-gray-500 hover:text-white rounded-full transition-colors"><MoreVertical size={20} /></button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
            {messages.map(msg => {
              const isMe = msg.senderId === 'me';
              return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] md:max-w-[60%] rounded-2xl px-4 py-3 ${
                    isMe 
                      ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 rounded-br-none shadow-[0_0_10px_rgba(0,255,209,0.1)]' 
                      : 'bg-dark-card text-gray-300 border border-gray-700 rounded-bl-none'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${isMe ? 'text-neon-cyan/50' : 'text-gray-500'}`}>
                      {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      {isMe && <Check size={12} />}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-dark-card border-t border-dark-border">
            <div className="flex items-center gap-2 bg-dark-bg rounded-xl px-4 py-2 border border-gray-800 focus-within:border-neon-cyan focus-within:ring-1 focus-within:ring-neon-cyan transition-all">
              <input 
                type="text" 
                className="flex-1 bg-transparent focus:outline-none text-white placeholder:text-gray-600 py-2"
                placeholder="Type a message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                className={`p-2 rounded-lg transition-all ${inputText.trim() ? 'bg-neon-cyan text-black shadow-[0_0_10px_#00FFD1]' : 'bg-gray-800 text-gray-500'}`}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 hidden md:flex items-center justify-center bg-black/20 text-gray-600">
          <div className="text-center">
            <div className="w-20 h-20 bg-dark-bg border border-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <MoreVertical size={32} />
            </div>
            <p>Select a chat to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
};