import { inject, Injectable } from '@angular/core';
import { TerminalCommand } from '../../../models/terminal/terminal-command.model';
import { FileSystemService } from '../filesystem.service';
import { TerminalService } from '../terminal.service';

@Injectable({ providedIn: 'root' })
export class DirCommand implements TerminalCommand {
  private terminalService = inject(TerminalService);
  private fileSystemService = inject(FileSystemService);
  public name = 'dir';
  public description = 'List directory contents';

  public execute(args: string[]): string {
    const folder = this.fileSystemService.getFolderFromPath(
      args[0] || this.terminalService.currentDir()
    );
    return folder
      ? folder.displayContents()
      : `Directory not found: ${args[0]}`;
  }
}
