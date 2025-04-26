import { Component, input } from '@angular/core';
import { TerminalLine } from '../../../../models/terminal-line.model';

@Component({
  selector: 'app-terminal-output',
  imports: [],
  templateUrl: './terminal-output.component.html',
  styleUrl: './terminal-output.component.scss',
})
export class TerminalOutputComponent {
  public lines = input<TerminalLine[]>([]);
}
