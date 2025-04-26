import { inject, Injectable } from "@angular/core";
import { TerminalCommand } from "../../../models/terminal/terminal-command.model";
import { FileSystemService } from "../filesystem.service";
import { File } from "../../../models/terminal/file.model";

@Injectable({ providedIn: 'root' })
export class TypeCommand implements TerminalCommand {
  private fileSystemService = inject(FileSystemService);
  public name = 'type';
  public description = 'Display file contents';

  public execute(args: string[]): string {
    if (!args[0]) return 'Specify a file to display';

    const file = this.fileSystemService.getFileFromPath(args[0]);
    if (!file) return `File not found: ${args[0]}`;

    return `Contents of ${file.getName()}:\n${this.generateDummyContent(file)}`;
  }

  private generateDummyContent(file: File): string {
    if (file.getName().endsWith('.TXT')) {
      return 'This is sample text file content.\nLine 2\nLine 3';
    }
    return '[Binary file content]';
  }
}
