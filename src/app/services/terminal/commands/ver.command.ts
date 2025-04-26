import { Injectable } from '@angular/core';
import { TerminalCommand } from '../../../models/terminal/terminal-command.model';

@Injectable({ providedIn: 'root' })
export class VerCommand implements TerminalCommand {
  public name = 'ver';
  public description = 'Display version';

  public execute(): string {
    return 'Microsoft Windows 95 [Version 4.00.950]';
  }
}
