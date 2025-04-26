import { inject, Injectable } from '@angular/core';
import { TerminalCommand } from '../../../models/terminal/terminal-command.model';
import { TerminalService } from '../terminal.service';

@Injectable({ providedIn: 'root' })
export class HelpCommand implements TerminalCommand {
  private terminalService = inject(TerminalService);
  public name = 'help';
  public description = 'Show available commands';

  public execute(): string {
    let output =
      'For more information on a command, type HELP command-name\n\n';
    this.terminalService.commands.forEach((cmd) => {
      output += `${cmd.name.padEnd(15)}${cmd.description}\n`;
    });
    return output;
  }
}
