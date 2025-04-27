import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TerminalComponent } from './terminal/terminal.component';
import { TerminalService } from '../../services/terminal/terminal.service';

@Component({
  selector: 'app-computer',
  imports: [FormsModule, TerminalComponent],
  templateUrl: './computer.component.html',
  styleUrl: './computer.component.scss',
})
export class ComputerComponent {
  private terminalService = inject(TerminalService);
  public power = false;
  public showStartupImage = false;
  public showTerminal = false;

  public togglePower(): void {
    if (!this.power) {
      this.power = true;
      this.showStartupImage = true;
      
      setTimeout(() => {
        this.showStartupImage = false;
        this.showTerminal = true;
      }, 3000);
    } else {
      this.power = false;
      this.showTerminal = false;
      this.showStartupImage = false;
      this.terminalService.clearTerminal();
    }
  }

  public onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.togglePower();
    }
  }
}
