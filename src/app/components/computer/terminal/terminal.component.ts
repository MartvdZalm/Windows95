import { Component, HostListener, inject, OnInit } from '@angular/core';
import { TerminalLine } from '../../../models/terminal/terminal-line.model';
import { TerminalService } from '../../../services/terminal/terminal.service';
import { ClsCommand } from '../../../services/terminal/commands/cls.command';
import { DirCommand } from '../../../services/terminal/commands/dir.command';

@Component({
  selector: 'app-terminal',
  imports: [],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.scss',
})
export class TerminalComponent implements OnInit {
  public terminalService = inject(TerminalService);
  public inputText = '';

  constructor(
    clsCommand: ClsCommand,
    dirCommand: DirCommand
  ) {
    this.terminalService.registerCommand(clsCommand);
    this.terminalService.registerCommand(dirCommand);
  }

  public ngOnInit(): void {
    this.terminalService.addLine('Microsoft Windows [Version 10.0.19042.1237]');
    this.terminalService.addLine('(c) Microsoft Corporation. All rights reserved.');
    this.terminalService.addLine('');
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    event.preventDefault();

    if (event.key === 'Enter') {
      this.terminalService.addLine(this.inputText, true);

      const result = this.terminalService.execute(this.inputText);
      if (result) {
        this.terminalService.addLine(result);

      }
      this.inputText = '';
    } else if (event.key === 'Backspace') {
      this.inputText = this.inputText.slice(0, -1);
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
      this.inputText += event.key;
    }
  }
}
