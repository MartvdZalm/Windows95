import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs';
import { AdminAuthService } from '../admin-auth.service';
import { Router } from '@angular/router';
import {
  EducationEntry,
  ExperienceEntry,
  LinkEntry,
  ProjectEntry,
  ResumeContent,
} from '../../models/portfolio/resume-content.model';
import { ResumeContentService } from '../../services/portfolio/resume-content.service';

@Component({
  selector: 'app-admin-panel',
  imports: [FormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
})
export class AdminPanelComponent implements OnInit {
  private readonly adminAuth = inject(AdminAuthService);
  private readonly router = inject(Router);
  private readonly resumeContentService = inject(ResumeContentService);

  protected resumeContent: ResumeContent = this.createEmptyResumeContent();
  protected isSaving = false;
  protected statusMessage = '';

  public ngOnInit(): void {
    this.resumeContentService.resumeContent$
      .pipe(take(1))
      .subscribe((content) => {
        this.resumeContent = structuredClone(content);
      });
  }

  protected goBack(): void {
    this.router.navigateByUrl('/');
  }

  protected async logout(): Promise<void> {
    await this.adminAuth.signOut();
    await this.router.navigateByUrl('/admin/login');
  }

  protected addHobby(): void {
    this.resumeContent.hobbies.push('');
  }

  protected addSkill(target: 'skills' | 'languages'): void {
    this.resumeContent[target].push({ name: '', level: 50 });
  }

  protected addExperience(): void {
    this.resumeContent.workExperience.push(this.createExperienceEntry());
  }

  protected addProject(): void {
    this.resumeContent.projects.push(this.createProjectEntry());
  }

  protected addEducation(): void {
    this.resumeContent.education.push(this.createEducationEntry());
  }

  protected addLink(): void {
    this.resumeContent.links.push(this.createLinkEntry());
  }

  protected removeByIndex(
    target:
      | 'hobbies'
      | 'skills'
      | 'languages'
      | 'projects'
      | 'workExperience'
      | 'education'
      | 'links',
    index: number,
  ): void {
    this.resumeContent[target].splice(index, 1);
  }

  protected async save(): Promise<void> {
    this.statusMessage = '';
    this.isSaving = true;
    try {
      await this.resumeContentService.saveResumeContent(this.resumeContent);
      this.statusMessage = 'Saved successfully.';
    } catch {
      this.statusMessage = 'Save failed. Check Firestore rules/auth.';
    } finally {
      this.isSaving = false;
    }
  }

  private createEmptyResumeContent(): ResumeContent {
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

  private createExperienceEntry(): ExperienceEntry {
    return { title: '', period: '', description: '', imageUrl: '' };
  }

  private createEducationEntry(): EducationEntry {
    return { title: '', period: '', description: '', imageUrl: '' };
  }

  private createProjectEntry(): ProjectEntry {
    return { title: '', description: '' };
  }

  private createLinkEntry(): LinkEntry {
    return { label: '', url: '', description: '' };
  }
}
