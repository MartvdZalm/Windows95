import { inject, Injectable } from '@angular/core';
import { TerminalCommand } from '../../../models/terminal/terminal-command.model';
import { FileSystemService } from '../filesystem.service';
import { TerminalService } from '../terminal.service';
import { Folder } from '../../../models/terminal/folder.model';

@Injectable({ providedIn: 'root' })
export class MkDirCommand implements TerminalCommand {
  private fileSystemService = inject(FileSystemService);
  private terminalService = inject(TerminalService);
  public name = 'mkdir';
  public aliases = ['md'];
  public description = 'Create a new directory';

  public execute(args: string[]): string {
    if (!args[0]) return 'Specify a directory name';

    const newFolderName = args[0];
    const currentFolder = this.fileSystemService.getFolderFromPath(
      this.terminalService.currentDir()
    );

    if (!currentFolder) return 'Invalid current directory';
    if (currentFolder.getSubFolder(newFolderName)) {
      return `A subdirectory or file ${newFolderName} already exists.`;
    }

    const newFolder = new Folder()
      .setName(newFolderName)
      .setLocation(`${currentFolder.getLocation()}/${newFolderName}`);

    currentFolder.addSubfolder(newFolder);
    return '';
  }
}
