import { inject, Injectable } from '@angular/core';
import { FileSystemService } from '../file-system.service';
import { TerminalCommand } from '../../models/terminal-command.model';
import { DirCommand } from './commands/dir.command';
import { CdCommand } from './commands/cd.command';

@Injectable({ providedIn: 'root' })
export class TerminalService {
  private fileSystemService = inject(FileSystemService);
  public currentDir = 'C:';
  public prompt = '>';
  public commands = new Map<string, TerminalCommand>();

  constructor(private dirCommand: DirCommand, private cdCommand: CdCommand) {
    this.registerCommands();
  }

  private registerCommands(): void {
    this.commands.set(this.dirCommand.name, this.dirCommand);
    this.commands.set(this.cdCommand.name, this.cdCommand);
  }

  async execute(input: string): Promise<{ output: string; clear?: boolean }> {
    const [cmd, ...args] = input.trim().split(' ');
    const command = this.commands.get(cmd.toLowerCase());

    if (!command) {
      return {
        output: `Command not recognized: ${cmd}. Type 'help' for available commands.`,
      };
    }

    const result = await command.execute(args, this.currentDir);

    if (result.newDir) {
      this.currentDir = result.newDir;
    }

    return {
      output: result.output,
      clear: command.name === 'cls',
    };
  }

  public getAvailableCommands(): TerminalCommand[] {
    return Array.from(this.commands.values());
  }
}
