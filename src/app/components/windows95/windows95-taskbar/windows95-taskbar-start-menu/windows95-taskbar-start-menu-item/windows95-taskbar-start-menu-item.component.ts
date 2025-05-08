import { Component, inject, input } from '@angular/core';
import { StartMenuItem } from '../../../../../models/windows95/start-menu-item.model';
import { WindowService } from '../../../../../services/windows95/window.service';

@Component({
  selector: 'app-windows95-taskbar-start-menu-item',
  imports: [],
  templateUrl: './windows95-taskbar-start-menu-item.component.html',
  styleUrl: './windows95-taskbar-start-menu-item.component.scss',
})
export class Windows95TaskbarStartMenuItemComponent {
  private windowService = inject(WindowService);
  public startMenuItem = input.required<StartMenuItem>();
  public activeMenuItem: StartMenuItem | null = null;

  public openWindow(window: string): void {
    this.windowService.createWindow(window);
  }

  public toggleSubMenu(item: StartMenuItem): void {
    this.activeMenuItem = this.activeMenuItem === item ? null : item;
  }

  public onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggleSubMenu(this.startMenuItem());
    }
  }
}
