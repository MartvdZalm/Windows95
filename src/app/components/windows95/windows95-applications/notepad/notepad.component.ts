import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ResumeContent } from '../../../../models/portfolio/resume-content.model';
import { ResumeContentService } from '../../../../services/portfolio/resume-content.service';

@Component({
  selector: 'app-notepad',
  imports: [],
  templateUrl: './notepad.component.html',
  styleUrl: './notepad.component.scss',
})
export class NotepadComponent {
  private readonly resumeContentService = inject(ResumeContentService);

  protected readonly resumeContent = toSignal<ResumeContent | undefined>(
    this.resumeContentService.resumeContent$,
    { initialValue: undefined },
  );
}
