export interface SkillEntry {
  name: string;
  level: number;
}

export interface ExperienceEntry {
  title: string;
  period: string;
  description: string;
  imageUrl: string;
}

export interface EducationEntry {
  title: string;
  period: string;
  description: string;
  imageUrl: string;
}

export interface LinkEntry {
  label: string;
  url: string;
  description: string;
}

export interface ProjectEntry {
  title: string;
  description: string;
}

export interface ResumeContent {
  profileImageUrl: string;
  profileImageAlt: string;
  aboutMe: string;
  hobbies: string[];
  skills: SkillEntry[];
  projects: ProjectEntry[];
  workExperience: ExperienceEntry[];
  education: EducationEntry[];
  languages: SkillEntry[];
  links: LinkEntry[];
  updatedAt?: string;
}
