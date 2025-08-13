export interface PersonalDetails {
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  experienceLevel: 'junior' | 'mid' | 'senior';
  profilePhoto?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'basic' | 'conversational' | 'fluent' | 'native';
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  gpa?: string;
}

export interface ResumeData {
  personalDetails: PersonalDetails;
  summary: string;
  achievements: Achievement[];
  skills: Skill[];
  languages: Language[];
  education: Education[];
}

export interface ATSScore {
  score: number;
  feedback: string[];
  suggestions: string[];
}