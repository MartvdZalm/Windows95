import { inject, Injectable } from '@angular/core';
import { TerminalCommand } from '../../../models/terminal/terminal-command.model';
import { TerminalService } from '../terminal.service';

@Injectable({ providedIn: 'root' })
export class ClsCommand implements TerminalCommand {
  private terminalService = inject(TerminalService);
  public name = 'cls';
  public description = 'Clear the terminal';

  public execute(): string | void {
    this.terminalService.lines.set([]);
  }
}
