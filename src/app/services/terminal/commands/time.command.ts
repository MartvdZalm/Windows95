import { Injectable } from '@angular/core';
import { TerminalCommand } from '../../../models/terminal/terminal-command.model';

@Injectable({ providedIn: 'root' })
export class TimeCommand implements TerminalCommand {
  public name = 'time';
  public description = 'Display or set the system time';

  public execute(args: string[]): string {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });

    if (args.length === 0) {
      return `The current time is: ${timeStr}\n` + 'Enter the new time:';
    }

    return `Time set to ${args[0]}`;
  }
}
