import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TerminalComponent } from './terminal/terminal.component';

@Component({
  selector: 'app-computer',
  imports: [FormsModule, TerminalComponent],
  templateUrl: './computer.component.html',
  styleUrl: './computer.component.scss',
})
export class ComputerComponent {
  public power = false;

  public togglePower(): void {
    this.power = !this.power;
  }
}
