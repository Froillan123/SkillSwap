export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  reputationPoints: number;
  level: number;
  badges: string[];
  isPro?: boolean;
  skillsOffered: Skill[];
  skillsWanted: Skill[];
  portfolio?: PortfolioItem[];
}

export interface Mentor extends User {
  hourlyRate: number;
  currency: string;
  verified: boolean;
  rating: number;
  reviews: number;
  specialty: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Grandmaster';
  description?: string;
}

export enum SkillCategory {
  TECHNOLOGY = 'Technology',
  MUSIC = 'Music',
  ART = 'Art',
  LANGUAGE = 'Language',
  LIFESTYLE = 'Lifestyle',
  ACADEMIC = 'Academic',
  BUSINESS = 'Business'
}

export interface Session {
  id: string;
  partnerId: string;
  partnerName: string;
  skill: string;
  date: Date;
  status: 'upcoming' | 'completed' | 'cancelled';
  type: 'teaching' | 'learning' | 'hired_mentor';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isSystem?: boolean;
}

export interface Resource {
  id: string;
  title: string;
  type: 'video' | 'article' | 'course' | 'repo';
  source: 'YouTube' | 'Medium' | 'GitHub' | 'Coursera' | 'TikTok';
  url: string;
  thumbnail: string;
  category: SkillCategory;
  likes: number;
  isPremium: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  timeLeft: string;
  prize: string;
  image: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  skillsUsed: string[];
}