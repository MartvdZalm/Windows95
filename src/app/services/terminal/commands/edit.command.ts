import { inject, Injectable } from '@angular/core';
import { TerminalCommand } from '../../../models/terminal/terminal-command.model';
import { FileSystemService } from '../filesystem.service';
import { TerminalService } from '../terminal.service';

@Injectable({ providedIn: 'root' })
export class EditCommand implements TerminalCommand {
  private fileSystemService = inject(FileSystemService);
  private terminalService = inject(TerminalService);
  public name = 'edit';
  public description = 'Create or edit text files';

  public execute(args: string[]): string {
    if (!args[0]) return 'Usage: edit <filename>';

    const path = args[0].startsWith('C:')
      ? args[0]
      : `${this.terminalService.currentDir()}/${args[0]}`;

    // Check if file exists
    const existingFile = this.fileSystemService.getFileFromPath(path);
    if (existingFile) {
      return (
        `Editing existing file ${existingFile.getName()}\n` +
        '[Press Ctrl+S to save, Ctrl+Q to quit]'
      );
    }

    return (
      `Creating new file ${args[0]}\n` +
      '[Enter your text. Press Ctrl+S to save]'
    );
  }
}
