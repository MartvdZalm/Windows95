import { Component, inject, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { WindowService } from '../../../../services/windows95/window.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  imports: [FormsModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent implements OnInit {
  private windowService = inject(WindowService);
  protected showWelcome = true;
  protected dontShowAgain = false;
  private cookieService = inject(CookieService);

  public ngOnInit() {
    const hideWelcome = this.cookieService.get('hideWelcome');
    this.showWelcome = hideWelcome !== 'true';
  }

  public onOkClick() {
    const activeWindowId = this.windowService.activeWindow()?.instanceId;
    if (activeWindowId) {
      this.windowService.closeWindow(activeWindowId);
    }

    if (this.dontShowAgain) {
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      this.cookieService.set('hideWelcome', 'true', expiryDate);
    }
    this.showWelcome = false;
  }
}
