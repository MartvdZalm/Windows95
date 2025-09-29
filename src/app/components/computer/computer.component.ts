import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TerminalComponent } from './terminal/terminal.component';
import { TerminalService } from '../../services/terminal/terminal.service';

@Component({
  selector: 'app-computer',
  imports: [FormsModule, TerminalComponent],
  templateUrl: './computer.component.html',
  styleUrl: './computer.component.scss',
})
export class ComputerComponent implements OnDestroy {
  private terminalService = inject(TerminalService);
  public power = false;
  public showStartupImage = false;
  public showTerminal = false;
  private powerTimeout = null;

  public togglePower(): void {
    if (this.powerTimeout) {
      clearTimeout(this.powerTimeout);
    }

    if (!this.power) {
      this.power = true;
      this.showStartupImage = true;
      this.showTerminal = false;

      setTimeout(() => {
        this.showStartupImage = false;
        this.showTerminal = true;
        this.powerTimeout = null;
      }, 3000);
    } else {
      this.power = false;
      this.showTerminal = false;
      this.showStartupImage = false;
      this.terminalService.clearTerminal();
      this.powerTimeout = null;
    }
  }

  public onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.togglePower();
    }
  }

  public ngOnDestroy() {
    if (this.powerTimeout) {
      clearTimeout(this.powerTimeout);
    }
  }
}
