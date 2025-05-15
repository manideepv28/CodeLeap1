export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: CourseCategory;
  skillLevel: SkillLevel;
  imageUrl: string;
  dataAiHint?: string; // For placeholder image hints
  lessons?: Lesson[];
  instructor?: string;
  duration?: string; 
  tags?: string[];
  rating?: number;
  enrollmentCount?: number;
}

export interface Lesson {
  id: string;
  title: string;
  videoId: string; // YouTube video ID
  duration: string;
  description?: string;
}

export type CourseCategory = "Web Development" | "Data Science" | "Mobile Apps" | "Cybersecurity" | "AI & ML" | "Game Development";
export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";

export const COURSE_CATEGORIES: CourseCategory[] = ["Web Development", "Data Science", "Mobile Apps", "Cybersecurity", "AI & ML", "Game Development"];
export const SKILL_LEVELS: SkillLevel[] = ["Beginner", "Intermediate", "Advanced"];
