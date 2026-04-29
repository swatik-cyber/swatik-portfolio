// models/index.ts

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: 'ADMIN' | 'MANAGER' | 'REVIEWER' | 'VIEWER';
  status: 'ACTIVE' | 'IDLE' | 'OFFLINE';
  department: string;
  avatarInitials: string;
  lastLogin?: string;
  createdAt?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tag: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  displayOrder: number;
}

export interface Skill {
  id: number;
  name: string;
  proficiency: number;
  category: string;
  icon?: string;
  displayOrder: number;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
  startDate: string;
  endDate?: string;
  current: boolean;
  type: string;
  displayOrder: number;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  credentialId?: string;
  credentialUrl?: string;
  issueDate: string;
  icon?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string;
  avatarInitials: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalProjects: number;
  totalSkills: number;
  unreadMessages: number;
}

export interface ContactMessage {
  id: number;
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  sentAt: string;
  read: boolean;
}
