import { Injectable, signal } from '@angular/core';
import { TerminalCommand } from '../../models/terminal/terminal-command.model';
import { TerminalLine } from '../../models/terminal/terminal-line.model';

@Injectable({ providedIn: 'root' })
export class TerminalService {
  private currentDir = 'C:';
  public commands = new Map<string, TerminalCommand>();
  public lines = signal<TerminalLine[]>([]);
  public prompt = signal<string>('C:\\>');

  public registerCommand(command: TerminalCommand): void {
    this.commands.set(command.name, command);
  }

  public execute(input: string): string | void {
    const [cmd, ...args] = input.trim().split(' ');
    const command = this.commands.get(cmd.toLowerCase());

    if (!command) {
      return `Command not recognized: ${cmd}. Type 'help' for available commands.`;
    }

    return command.execute(args, this.currentDir);
  }

  public addLine(text: string, isPrompt = false): void {
    let line = '';

    if (isPrompt) {
      line = this.prompt() + text;
    } else {
      line = text;
    }

    this.lines().push({
      text: line,
      isPrompt,
    });
  }
}
