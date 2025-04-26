import { inject, Injectable } from '@angular/core';
import { TerminalCommand } from '../../../models/terminal/terminal-command.model';
import { FileSystemService } from '../filesystem.service';
import { TerminalService } from '../terminal.service';

@Injectable({ providedIn: 'root' })
export class DelCommand implements TerminalCommand {
  private fileSystemService = inject(FileSystemService);
  private terminalService = inject(TerminalService);
  public name = 'del';
  public description = 'Delete one or more files';

  public execute(args: string[]): string {
    if (!args[0]) return 'Specify file(s) to delete';

    const path = args[0].startsWith('C:')
      ? args[0]
      : `${this.terminalService.currentDir()}/${args[0]}`;

    const file = this.fileSystemService.getFileFromPath(path);
    if (!file) return `Could not find ${args[0]}`;

    return `Deleted ${file.getName()}`;
  }
}
