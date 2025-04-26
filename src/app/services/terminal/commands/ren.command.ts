import { inject, Injectable } from '@angular/core';
import { TerminalService } from '../terminal.service';
import { FileSystemService } from '../filesystem.service';
import { TerminalCommand } from '../../../models/terminal/terminal-command.model';

@Injectable({ providedIn: 'root' })
export class RenCommand implements TerminalCommand {
  private fileSystemService = inject(FileSystemService);
  private terminalService = inject(TerminalService);
  public name = 'ren';
  public description = 'Rename a file';

  public execute(args: string[]): string {
    if (args.length < 2) return 'Usage: ren <oldname> <newname>';

    const oldPath = args[0].startsWith('C:')
      ? args[0]
      : `${this.terminalService.currentDir()}/${args[0]}`;
    const newName = args[1];

    const file = this.fileSystemService.getFileFromPath(oldPath);
    if (!file) return `File not found: ${args[0]}`;

    file.setName(newName);
    return '';
  }
}
