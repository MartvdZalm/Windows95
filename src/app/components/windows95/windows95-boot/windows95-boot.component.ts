import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-windows95-boot',
  imports: [],
  templateUrl: './windows95-boot.component.html',
  styleUrl: './windows95-boot.component.scss',
})
export class Windows95BootComponent implements OnInit {
  private router = inject(Router);
  public isVisible = false;
  public progress = 0;
  private imagesToPreload = [
    'images/windows95/windows95-my-computer.ico',
    'images/windows95/windows95-mailbox.ico',
    'images/windows95/windows95-ie-5-shortcut.ico',
    'images/windows95/windows95-recycle-bin-empty.ico',
    'images/windows95/windows95-notepad.ico',
    'images/windows95/windows95-start.ico',
    'images/windows95/windows95-programs.ico',
    'images/windows95/windows95-documents.ico',
    'images/windows95/windows95-settings.ico',
    'images/windows95/windows95-find.ico',
    'images/windows95/windows95-help.ico',
    'images/windows95/windows95-run.ico',
    'images/windows95/windows95-shutdown.ico',
    'images/windows95/windows95-welcome.png',
  ];

  public async ngOnInit(): Promise<void> {
    await this.preloadImages();
    await this.playBootSequence();
    this.router.navigate(['/']);
  }

  private async preloadImages(): Promise<void> {
    const imagePromises = this.imagesToPreload.map((imageSrc) =>
      this.loadImage(imageSrc)
    );
    await Promise.all(imagePromises);
  }

  private loadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve();
      img.onerror = () => reject(`Failed to load image: ${src}`);
    });
  }

  private async playBootSequence(): Promise<void> {
    try {
      await this.animateProgressBar();
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      this.router.navigate(['/']);
    }
  }

  private async animateProgressBar(): Promise<void> {
    const startTime = Date.now();
    const duration = 7000;

    while (this.progress < 100) {
      const elapsed = Date.now() - startTime;
      this.progress = Math.min((elapsed / duration) * 100, 100);

      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
  }
}
