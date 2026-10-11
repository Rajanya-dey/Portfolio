export type ProjectCategory = 'all' | 'frontend' | 'backend' | 'fullstack' | 'security';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'frontend' | 'backend' | 'fullstack' | 'security';
  image: string;
  featured: boolean;
  metrics: {
    label: string;
    value: string;
  }[];
  stack: string[];
  architectureOverview: string;
  challengesSolved: string;
  securityFeatures: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  demoComponentType?: 'telemetry' | 'crypto' | 'ecommerce' | 'kanban' | 'frontend_canvas';
}

export type SkillCategory = 'all' | 'frontend' | 'backend' | 'database' | 'cloud' | 'security';

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'cloud' | 'security';
  proficiency: number; // 0 - 100
  experience: string;
  context: string;
  codeSnippet: string;
  tags?: string[];
}

export interface SecurityAuditReport {
  xssSanitized: boolean;
  honeypotPassed: boolean;
  rateLimitStatus: 'allowed' | 'throttled';
  sha256Hash: string;
  threatsDetected: string[];
  timestamp: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  serviceType: string;
  message: string;
  securityHoneypot: string; // Bot trap
}

export interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  security?: string;
}
