/**
 * Global TypeScript type definitions for the portfolio.
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  category: SkillCategory;
  proficiency: number; // 0-100
  icon?: string;
}

export type SkillCategory =
  | "frontend"
  | "backend"
  | "design"
  | "tools"
  | "other";

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface SectionId {
  id: "hero" | "about" | "projects" | "skills" | "contact";
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface ScrollProgress {
  progress: number; // 0-1
  direction: "up" | "down" | "none";
}
