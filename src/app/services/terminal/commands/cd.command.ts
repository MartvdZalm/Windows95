import { inject, Injectable } from '@angular/core';
import { TerminalCommand } from '../../../models/terminal/terminal-command.model';
import { FileSystemService } from '../filesystem.service';

@Injectable({ providedIn: 'root' })
export class CdCommand implements TerminalCommand {
  private fileSystemService = inject(FileSystemService);
  name = 'cd';
  description = 'Change directory';

  public execute(args: string[], currentDir: string): string {
    if (!args[0]) {
      return `Current directory: ${currentDir}`;
    }

    const newDir = this.changeDirectory(args[0], currentDir);
    if (newDir) {
      return `Changed directory to ${newDir}`;
    }
    return `Directory not found: ${args[0]}`;
  }

  private changeDirectory(path: string, currentDir: string): string | null {
    if (path === '..') {
      const parentDir = currentDir.substring(0, currentDir.lastIndexOf('/'));
      return parentDir || 'C:';
    }

    const newFolder = this.fileSystemService.getFolderFromPath(
      `${currentDir}/${path}`
    );
    return newFolder ? `${currentDir}/${path}` : null;
  }
}
