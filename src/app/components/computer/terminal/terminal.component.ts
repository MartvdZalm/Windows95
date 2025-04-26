import { Component, HostListener, inject, OnInit } from '@angular/core';
import { TerminalService } from '../../../services/terminal/terminal.service';
import { ClsCommand } from '../../../services/terminal/commands/cls.command';
import { DirCommand } from '../../../services/terminal/commands/dir.command';
import { CdCommand } from '../../../services/terminal/commands/cd.command';

@Component({
  selector: 'app-terminal',
  imports: [],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.scss',
})
export class TerminalComponent implements OnInit {
  public terminalService = inject(TerminalService);
  public inputText = '';

  public constructor(
    clsCommand: ClsCommand,
    dirCommand: DirCommand,
    cdCommand: CdCommand
  ) {
    this.terminalService.registerCommand(clsCommand);
    this.terminalService.registerCommand(dirCommand);
    this.terminalService.registerCommand(cdCommand);
  }

  public async ngOnInit(): Promise<void> {
    await this.terminalService.addTypewriterLine(
      'IBM Personal Computer BIOS',
      20
    );
    await this.delay(200);
    await this.terminalService.addTypewriterLine('Version 1.10', 20);
    await this.delay(150);
    await this.terminalService.addLine(
      '(C) Copyright IBM Corp 1981, 1994',
      false,
      100
    );

    await this.terminalService.addTypewriterLine('Testing system memory: ', 10);
    await this.delay(800);
    await this.terminalService.addLine('640 KB OK', false, 50);

    await this.terminalService.addTypewriterLine('Detecting drives: ', 15);
    await this.delay(400);
    await this.terminalService.addLine('FDD: 1.44MB   HDD: 540MB', false, 50);

    await this.terminalService.addLine('', false, 100);
    await this.terminalService.addLine(
      'Config: 486DX2-66, 8MB RAM, VGA',
      false,
      50
    );

    await this.terminalService.addTypewriterLine('Starting MS-DOS...', 20);
    await this.delay(300);

    await this.terminalService.addLine('MS-DOS Version 6.22', false, 100);
    await this.terminalService.addLine('', false, 50);

    await this.terminalService.addTypewriterLine('Loading Windows 95...', 15);
    await this.delay(500);

    await this.terminalService.addLine(
      'Microsoft Windows 95 [Version 4.00.950]',
      false,
      100
    );
    await this.terminalService.addLine(
      '(C) Copyright Microsoft Corp 1981-1995',
      false,
      100
    );

    await this.terminalService.addLine('', false, 200);
    this.terminalService.ready.set(true);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (!this.terminalService.ready()) return;

    event.preventDefault();

    if (event.key === 'Enter') {
      this.terminalService.execute(this.inputText);
      this.inputText = '';
      this.scrollToBottom();
    } else if (event.key === 'Backspace') {
      this.inputText = this.inputText.slice(0, -1);
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
      this.inputText += event.key;
    }
  }

  private scrollToBottom(): void {
    const container = document.querySelector('.terminal');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }
}
