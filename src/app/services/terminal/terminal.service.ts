import { Injectable, signal } from '@angular/core';
import { TerminalCommand } from '../../models/terminal/terminal-command.model';
import { TerminalLine } from '../../models/terminal/terminal-line.model';

@Injectable({ providedIn: 'root' })
export class TerminalService {
  private commandHistory: string[] = [];
  private historyIndex = -1;
  private maxHistorySize = 50;

  public currentDir = signal<string>('C:');
  public commands = new Map<string, TerminalCommand>();
  public lines = signal<TerminalLine[]>([]);
  public prompt = '>';
  public ready = signal(false);

  public addToHistory(command: string): void {
    if (
      command.trim() &&
      command !== this.commandHistory[this.commandHistory.length - 1]
    ) {
      this.commandHistory.push(command);
      if (this.commandHistory.length > this.maxHistorySize) {
        this.commandHistory.shift();
      }
    }
    this.historyIndex = this.commandHistory.length;
  }

  public getPreviousCommand(): string | null {
    if (this.commandHistory.length === 0) {
      return null;
    }
    this.historyIndex = Math.max(0, this.historyIndex - 1);
    return this.commandHistory[this.historyIndex];
  }

  public getNextCommand(): string | null {
    if (this.commandHistory.length === 0) return null;
    this.historyIndex = Math.min(
      this.commandHistory.length,
      this.historyIndex + 1
    );
    return this.historyIndex < this.commandHistory.length
      ? this.commandHistory[this.historyIndex]
      : '';
  }

  public getCommandHistory(): string[] {
    return [...this.commandHistory];
  }

  public registerCommand(command: TerminalCommand): void {
    this.commands.set(command.name, command);
  }

  public execute(input: string): string | void {
    const [cmd, ...args] = input.trim().split(' ');
    const command = this.commands.get(cmd.toLowerCase());

    const addInputLine = (cmd: string): void => {
      const savedDir = this.currentDir();
      this.addLine(cmd, true, 0, savedDir);
    };

    if (!command) {
      addInputLine(input);

      this.addLine(
        `Command not recognized: ${cmd}. Type 'help' for available commands.`
      );
      return;
    }

    if (command!.name !== 'cls') {
      addInputLine(input);
    }

    const result = command.execute(args);
    if (result) {
      this.addLine(result);
    }
  }

  public async addLine(
    text: string,
    isPrompt = false,
    delayMs = 0,
    savedDir?: string
  ): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const line = isPrompt
          ? (savedDir || this.currentDir()) + this.prompt + text
          : text;
        this.lines.update((lines) => [...lines, { text: line, isPrompt }]);
        resolve();
      }, delayMs);
    });
  }

  public async addLinesWithDelay(
    lines: { text: string; delay: number }[]
  ): Promise<void> {
    for (const line of lines) {
      await this.addLine(line.text, false, line.delay);
    }
  }

  public async addTypewriterLine(
    text: string,
    charDelay = 50,
    lineDelay = 0
  ): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, lineDelay));

    this.lines.update((lines) => [...lines, { text: '', isPrompt: false }]);

    for (let i = 0; i < text.length; i++) {
      const partialText = text.substring(0, i + 1);
      this.lines.update((lines) => {
        const newLines = [...lines];
        newLines[newLines.length - 1] = {
          ...newLines[newLines.length - 1],
          text: partialText,
        };
        return newLines;
      });
      await new Promise((resolve) => setTimeout(resolve, charDelay));
    }
  }

  public clearTerminal(): void {
    this.lines.set([]);
    this.currentDir.set('C:');
    this.ready.set(false);
  }
}
