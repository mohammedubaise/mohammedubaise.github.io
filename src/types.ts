export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  techStack: string[];
  features: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  category: "all" | "enterprise" | "fintech" | "education" | "gamified" | "ecommerce";
}

export interface TimelineEvent {
  id: string;
  role: string;
  company: string;
  duration: string;
  responsibilities: string[];
  techUsed?: string[];
}

export interface SkillGroup {
  id: string;
  categoryName: string;
  skills: string[];
  iconName: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  details?: string;
}

export interface AchievementItem {
  id: string;
  exponent?: boolean;
  value: string;
  label: string;
  description: string;
}
