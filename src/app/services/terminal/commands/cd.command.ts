import { inject, Injectable } from '@angular/core';
import { CommandResult, TerminalCommand } from '../../../models/terminal-command.model';
import { FileSystemService } from '../../file-system.service';

@Injectable({ providedIn: 'root' })
export class CdCommand implements TerminalCommand {
  private fileSystemService = inject(FileSystemService);
  name = 'cd';
  description = 'Change directory';

  execute(args: string[], currentDir: string): CommandResult {
    if (!args[0]) {
      return { output: `Current directory: ${currentDir}` };
    }

    const newDir = this.changeDirectory(args[0], currentDir);
    if (newDir) {
      return {
        output: `Changed directory to ${newDir}`,
        newDir: newDir,
      };
    }
    return { output: `Directory not found: ${args[0]}` };
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
