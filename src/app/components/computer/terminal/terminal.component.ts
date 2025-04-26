import { Component, input } from '@angular/core';
import { TerminalInputComponent } from './terminal-input/terminal-input.component';
import { TerminalOutputComponent } from './terminal-output/terminal-output.component';
import { TerminalLine } from '../../../models/terminal-line.model';

@Component({
  selector: 'app-terminal',
  imports: [TerminalInputComponent, TerminalOutputComponent],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.scss'
})
export class TerminalComponent {
  // outputLines: TerminalLine[] = [];
  // currentDir = 'C:\\';

  // constructor() {
  //   this.addOutput('Microsoft Windows [Version 10.0.19042.1237]', false);
  //   this.addOutput('(c) Microsoft Corporation. All rights reserved.', false);
  //   this.addOutput('', true);
  // }

  // onCommandEntered(command: string): void {
  //   // this.addOutput(command, true);
    
  //   // const result = this.terminalService.execute(command);
  //   // this.addOutput(result.output, false);
    
  //   // // if (result.newDir) {
  //   // //   this.currentDir = result.newDir;
  //   // // }
    
  //   // this.addOutput('', true); // New prompt
  // }

  // private addOutput(text: string, isPrompt: boolean): void {
  //   this.outputLines.push({
  //     text,
  //     isPrompt,
  //   });
  // }
}
