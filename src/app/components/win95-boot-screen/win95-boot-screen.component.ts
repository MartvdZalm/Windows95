import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-win95-boot-screen',
  imports: [],
  templateUrl: './win95-boot-screen.component.html',
  styleUrl: './win95-boot-screen.component.scss',
})
export class Win95BootScreenComponent implements OnInit {
  private audioService = inject(AudioService);
  private router = inject(Router);
  public isVisible = false;
  public progress = 0;

  async ngOnInit(): Promise<void> {
    await this.playBootSequence();
    this.router.navigate(['/']);
  }

  private async playBootSequence(): Promise<void> {
    try {
      this.audioService.playSound(
        'sounds/microsoft-windows-95-startup-sound.mp3'
      );

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
