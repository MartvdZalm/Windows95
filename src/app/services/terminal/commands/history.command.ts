import { inject, Injectable } from '@angular/core';
import { TerminalCommand } from '../../../models/terminal/terminal-command.model';
import { TerminalService } from '../terminal.service';

@Injectable({ providedIn: 'root' })
export class HistoryCommand implements TerminalCommand {
  private terminalService = inject(TerminalService);
  public name = 'history';
  public description = 'Display command history';

  public execute(): string {
    const history = this.terminalService.getCommandHistory();
    if (history.length === 0) {
      return 'No commands in history';
    }
    return history.map((cmd, index) => `${index + 1}: ${cmd}`).join('\n');
  }
}
