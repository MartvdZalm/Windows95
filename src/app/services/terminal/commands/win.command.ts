import { inject, Injectable } from "@angular/core";
import { TerminalCommand } from "../../../models/terminal/terminal-command.model";
import { TerminalService } from "../terminal.service";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class WinCommand implements TerminalCommand {
  private router = inject(Router);
  private terminalService = inject(TerminalService);
  public name = 'win';
  public description = 'Start Windows 95 graphical environment';

  public execute(): string | void {
    this.startWindows95();
    return;
  }

  private async startWindows95(): Promise<void> {
    this.terminalService.clearTerminal();
    await this.showTerminalBootSequence();
    await this.terminalService.addLine('Windows 95 startup complete', false, 0);
    await this.router.navigate(['/boot']);
  }

  private async showTerminalBootSequence(): Promise<void> {
    const bootSteps = [
      'Loading HIMEM.SYS',
      'Loading IFSHLP.SYS',
      'Loading SETVER.EXE',
      'Initializing VMM32.VXD',
      'Loading device drivers...',
      'Preparing to start Windows 95 GUI'
    ];

    for (const step of bootSteps) {
      await this.terminalService.addLine(step, false, 300);
    }
  }
}