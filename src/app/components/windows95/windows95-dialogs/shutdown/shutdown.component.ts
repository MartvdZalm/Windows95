import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { WindowService } from '../../../../services/windows95/window.service';

@Component({
  selector: 'app-shutdown',
  imports: [FormsModule],
  templateUrl: './shutdown.component.html',
  styleUrl: './shutdown.component.scss',
})
export class ShutdownComponent {
  private windowService = inject(WindowService);
  private router = inject(Router);
  public selectedOption = 'shutdown';

  public onYesClick() {
    if (this.selectedOption === 'shutdown') {
      this.handleShutdown();
    }
  }

  public onNoClick() {
    const activeWindowId = this.windowService.activeWindow()?.instanceId;
    if (activeWindowId) {
      this.windowService.closeWindow(activeWindowId);
    }
  }

  private handleShutdown() {
    this.router.navigate(['/computer']);
    this.windowService.closeAllWindows();
  }
}
