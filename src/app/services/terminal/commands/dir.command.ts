import { inject, Injectable } from '@angular/core';
import { TerminalCommand } from '../../../models/terminal/terminal-command.model';
import { FileSystemService } from '../filesystem.service';

@Injectable({ providedIn: 'root' })
export class DirCommand implements TerminalCommand {
  private fileSystemService = inject(FileSystemService);
  public name = 'dir';
  public description = 'List directory contents';

  public execute(args: string[], currentDir: string): string {
    const folder = this.fileSystemService.getFolderFromPath(
      args[0] || currentDir
    );
    return folder
      ? folder.displayContents()
      : `Directory not found: ${args[0]}`;
  }
}
