import { Injectable } from '@angular/core';
import { TerminalCommand } from '../../../models/terminal/terminal-command.model';

@Injectable({ providedIn: 'root' })
export class DateCommand implements TerminalCommand {
  public name = 'date';
  public description = 'Display or set the system date';

  public execute(args: string[]): string {
    const now = new Date();
    const dateStr = now
      .toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
      })
      .replace(/\//g, '-');

    if (args.length === 0) {
      return (
        `The current date is: ${dateStr}\n` + 'Enter the new date (MM-DD-YY):'
      );
    }

    return `Date set to ${args[0]}`;
  }
}
