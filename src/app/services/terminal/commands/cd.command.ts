import { inject, Injectable } from '@angular/core';
import { TerminalCommand } from '../../../models/terminal/terminal-command.model';
import { FileSystemService } from '../filesystem.service';
import { TerminalService } from '../terminal.service';

@Injectable({ providedIn: 'root' })
export class CdCommand implements TerminalCommand {
  private terminalService = inject(TerminalService);
  private fileSystemService = inject(FileSystemService);
  public name = 'cd';
  public description = 'Change directory';

  public execute(args: string[]): string {
    if (!args[0]) {
      return `Current directory: ${this.terminalService.currentDir()}`;
    }

    const newDir = this.changeDirectory(args[0]);
    if (newDir) {
      this.terminalService.currentDir.set(newDir);
      return `Changed directory to ${newDir}`;
    }
    return `Directory not found: ${args[0]}`;
  }

  private changeDirectory(path: string): string | null {
    if (path === '..') {
      const current = this.terminalService.currentDir();
      if (current === 'C:') return null;

      const parentDir = current.substring(0, current.lastIndexOf('/'));
      return parentDir || 'C:';
    }

    if (path.startsWith('C:')) {
      const newFolder = this.fileSystemService.getFolderFromPath(path);
      return newFolder ? path : null;
    }

    const fullPath = `${this.terminalService.currentDir()}/${path}`;
    const newFolder = this.fileSystemService.getFolderFromPath(fullPath);
    return newFolder ? fullPath : null;
  }
}
