import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResumeContent } from '../../models/portfolio/resume-content.model';
import { ResumeContentRepository } from '../../repositories/portfolio/resume-content.repository';

@Injectable({ providedIn: 'root' })
export class ResumeContentService {
  private readonly resumeRepository = inject(ResumeContentRepository);

  public readonly resumeContent$: Observable<ResumeContent> =
    this.resumeRepository
      .getResumeContent$()
      .pipe(map((content) => this.mergeWithDefaults(content)));

  public saveResumeContent(content: ResumeContent): Promise<void> {
    return this.resumeRepository.saveResumeContent(content);
  }

  private mergeWithDefaults(content: ResumeContent | undefined): ResumeContent {
    const defaults = this.getEmptyContent();
    if (!content) return defaults;

    return {
      ...defaults,
      ...content,
      profileImageUrl: content.profileImageUrl ?? defaults.profileImageUrl,
      profileImageAlt: content.profileImageAlt ?? defaults.profileImageAlt,
      aboutMe: content.aboutMe ?? defaults.aboutMe,
      hobbies: content.hobbies ?? defaults.hobbies,
      skills: content.skills ?? defaults.skills,
      projects: content.projects ?? defaults.projects,
      workExperience: content.workExperience ?? defaults.workExperience,
      education: content.education ?? defaults.education,
      languages: content.languages ?? defaults.languages,
      links: content.links ?? defaults.links,
    };
  }

  private getEmptyContent(): ResumeContent {
    return {
      profileImageUrl: '',
      profileImageAlt: '',
      aboutMe: '',
      hobbies: [],
      skills: [],
      projects: [],
      workExperience: [],
      education: [],
      languages: [],
      links: [],
    };
  }
}
