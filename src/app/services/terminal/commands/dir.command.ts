import { inject, Injectable } from '@angular/core';
import { TerminalCommand } from '../../../models/terminal-command.model';
import { FileSystemService } from '../../file-system.service';

@Injectable({ providedIn: 'root' })
export class DirCommand implements TerminalCommand {
  private fileSystemService = inject(FileSystemService);
  public name = 'dir';
  public description = 'List directory contents';

  public execute(args: string[], currentDir: string): { output: string } {
    const folder = this.fileSystemService.getFolderFromPath(args[0] || currentDir);
    return {
      output: folder
        ? folder.displayContents()
        : `Directory not found: ${args[0]}`,
    };
  }
}
