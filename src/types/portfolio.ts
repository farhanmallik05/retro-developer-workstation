export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  impact: string;
  architecture: string[];
  githubUrl: string;
  liveUrl?: string;
  tags: string[];
}

export interface SkillCategory {
  name: string;
  skills: { name: string; level: number; highlight?: boolean }[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  issuedDate: string;
  badgeUrl: string;
  verifyUrl: string;
}

export interface TerminalOutputItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

