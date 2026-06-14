import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PROJECT_URLS } from '../../../../config/project-urls';

@Component({
  selector: 'app-knight-compiler',
  imports: [],
  templateUrl: './knight-compiler.component.html',
  styleUrl: './knight-compiler.component.scss',
})
export class KnightCompilerComponent {
  private sanitizer = inject(DomSanitizer);

  public playgroundUrl: SafeResourceUrl =
    this.sanitizer.bypassSecurityTrustResourceUrl(PROJECT_URLS.knight);
}
