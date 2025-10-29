export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  occupation: string;
  location: string;
  joinedDate: string;
}

export interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    dosha: 'vata' | 'pitta' | 'kapha';
    points: number;
  }[];
}

export interface DoshaResult {
  vata: number;
  pitta: number;
  kapha: number;
  dominant: 'vata' | 'pitta' | 'kapha';
}

export interface DoshaInfo {
  name: string;
  description: string;
  characteristics: string[];
  recommendations: string[];
  color: string;
  icon: string;
}

export interface DietPlan {
  dosha: 'vata' | 'pitta' | 'kapha';
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  snacks: string[];
  beverages: string[];
  avoid: string[];
  spices: string[];
}

export interface DailySchedule {
  dosha: 'vata' | 'pitta' | 'kapha';
  wakeUp: string;
  morning: string[];
  afternoon: string[];
  evening: string[];
  bedtime: string;
  exercise: string[];
  meditation: string[];
}

export interface FollowUp {
  id: string;
  userId: string;
  date: string;
  symptoms: string[];
  improvements: string[];
  concerns: string[];
  energyLevel: number;
  sleepQuality: number;
  digestiveHealth: number;
  notes: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin';
  name: string;
}

export interface UserWithStatus extends User {
  active: boolean;
  lastLogin?: string;
  doshaAssessmentCompleted: boolean;
  followUpCount: number;
}

export interface SiteContent {
  id: string;
  title: string;
  description: string;
  content: string;
  type: 'page' | 'article' | 'faq';
  published: boolean;
  lastModified: string;
}

export interface SystemSettings {
  siteName: string;
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  emailNotifications: boolean;
  maxUsersPerDay: number;
  sessionTimeout: number;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
}

export interface Statistics {
  totalUsers: number;
  activeUsers: number;
  completedAssessments: number;
  totalFollowUps: number;
  doshaDistribution: {
    vata: number;
    pitta: number;
    kapha: number;
  };
  userGrowth: {
    thisWeek: number;
    thisMonth: number;
    lastMonth: number;
  };
  averageRatings: {
    energy: number;
    sleep: number;
    digestion: number;
  };
}