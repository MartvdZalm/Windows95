import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AudioService } from '../../../services/audio.service';

@Component({
  selector: 'app-windows95-boot',
  imports: [],
  templateUrl: './windows95-boot.component.html',
  styleUrl: './windows95-boot.component.scss',
})
export class Windows95BootComponent implements OnInit {
  private audioService = inject(AudioService);
  private router = inject(Router);
  public isVisible = false;
  public progress = 0;

  public async ngOnInit(): Promise<void> {
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
