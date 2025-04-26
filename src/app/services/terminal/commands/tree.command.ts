import { inject, Injectable } from '@angular/core';
import { TerminalCommand } from '../../../models/terminal/terminal-command.model';
import { FileSystemService } from '../filesystem.service';
import { Folder } from '../../../models/terminal/folder.model';

@Injectable({ providedIn: 'root' })
export class TreeCommand implements TerminalCommand {
  private fileSystemService = inject(FileSystemService);
  public name = 'tree';
  public description = 'Display directory tree';

  public execute(args: string[]): string {
    const folder = this.fileSystemService.getFolderFromPath(args[0] || 'C:');

    if (!folder) return `Directory not found: ${args[0]}`;

    return this.generateTree(folder);
  }

  private generateTree(folder: Folder, depth = 0, prefix = ''): string {
    let output = '';
    const indent = ' '.repeat(depth * 3);

    output += `${prefix}${folder.getName()}\n`;

    folder.getSubFolders().forEach((subfolder, index) => {
      const isLast =
        index === folder.getSubFolders().length - 1 &&
        folder.getFiles().length === 0;
      const newPrefix = prefix + indent + (isLast ? '└── ' : '├── ');
      output += this.generateTree(subfolder, depth + 1, newPrefix);
    });

    folder.getFiles().forEach((file, index) => {
      const isLast = index === folder.getFiles().length - 1;
      output += `${prefix}${indent}${
        isLast ? '└── ' : '├── '
      }${file.getName()}\n`;
    });

    return output;
  }
}
