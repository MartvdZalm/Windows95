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
      // Handle root directory case
      if (current === 'C:') return null;

      const parentDir = current.substring(0, current.lastIndexOf('/'));
      return parentDir || 'C:';
    }

    // Handle absolute paths (starting with C:)
    if (path.startsWith('C:')) {
      const newFolder = this.fileSystemService.getFolderFromPath(path);
      return newFolder ? path : null;
    }

    // Handle relative paths
    const fullPath = `${this.terminalService.currentDir()}/${path}`;
    const newFolder = this.fileSystemService.getFolderFromPath(fullPath);
    return newFolder ? fullPath : null;
    // if (path === '..') {
    //   const parentDir = this.terminalService
    //     .currentDir()
    //     .substring(0, this.terminalService.currentDir().lastIndexOf('/'));
    //   return parentDir || 'C:';
    // }

    // const newFolder = this.fileSystemService.getFolderFromPath(
    //   `${this.terminalService.currentDir()}/${path}`
    // );
    // return newFolder ? `${this.terminalService.currentDir()}/${path}` : null;
  }
}
