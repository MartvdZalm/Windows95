import { Component, inject, computed } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PdfViewerService } from '../../../../services/windows95/windows95-applications/pdf-viewer/pdf-viewer.service';

@Component({
  selector: 'app-pdf-viewer',
  imports: [],
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.scss',
})
export class PdfViewerComponent {
  private pdfViewerService = inject(PdfViewerService);
  private sanitizer = inject(DomSanitizer);

  public pdfPath = computed(() => this.pdfViewerService.pdfPath());
  public pdfTitle = computed(() => this.pdfViewerService.pdfTitle());

  public pdfUrl = computed<SafeResourceUrl>(() => {
    const path = this.pdfPath();
    return path
      ? this.sanitizer.bypassSecurityTrustResourceUrl(path)
      : this.sanitizer.bypassSecurityTrustResourceUrl('');
  });
}
