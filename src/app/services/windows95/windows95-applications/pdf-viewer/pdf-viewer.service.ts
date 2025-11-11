import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PdfViewerService {
  private currentPdfPath = signal<string | null>(null);
  private currentPdfTitle = signal<string>('Document');

  public readonly pdfPath = this.currentPdfPath.asReadonly();
  public readonly pdfTitle = this.currentPdfTitle.asReadonly();

  public openPdf(path: string, title: string): void {
    this.currentPdfPath.set(path);
    this.currentPdfTitle.set(title);
  }

  public closePdf(): void {
    this.currentPdfPath.set(null);
    this.currentPdfTitle.set('Document');
  }
}

