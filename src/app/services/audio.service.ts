import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audioContext: AudioContext;

  // public constructor() {
  //   this.audioContext = new (window.AudioContext ||
  //     (window as any).webkitAudioContext)();
  // }

  public constructor() {
    // Type the `window` object more specifically, as `window` can be any object in TypeScript.
    const audioContextConstructor = window.AudioContext || (window as { webkitAudioContext?: AudioContext }).webkitAudioContext;
    
    // Now safely create an AudioContext instance.
    if (audioContextConstructor) {
      this.audioContext = new audioContextConstructor();
    } else {
      throw new Error("AudioContext not supported in this browser.");
    }
  }

  public async playSound(url: string): Promise<void> {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.audioContext.destination);
      source.start(0);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }
}
