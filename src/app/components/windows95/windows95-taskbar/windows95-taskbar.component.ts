import { Component, inject, OnInit } from '@angular/core';
import { Windows95TaskbarStartMenuComponent } from './windows95-taskbar-start-menu/windows95-taskbar-start-menu.component';
import { TaskbarService } from '../../../services/windows95/taskbar.service';
import { WindowService } from '../../../services/windows95/window.service';

@Component({
  selector: 'app-windows95-taskbar',
  imports: [Windows95TaskbarStartMenuComponent],
  templateUrl: './windows95-taskbar.component.html',
  styleUrl: './windows95-taskbar.component.scss',
})
export class Windows95TaskbarComponent implements OnInit {
  public taskbarService = inject(TaskbarService);
  public windowService = inject(WindowService);
  public startMenuOpen = false;
  public currentTime: string = '';
  private timeIntervalId: number | undefined;

  public ngOnInit() {
    this.updateTime();
    this.timeIntervalId = window.setInterval(() => this.updateTime(), 1000);
  }

  public ngOnDestroy(): void {
    if (this.timeIntervalId !== undefined) {
      clearInterval(this.timeIntervalId);
    }
  }

  private updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    this.currentTime = `${hours}:${minutes}`;
  }

  public toggleStartMenu(): void {
    this.startMenuOpen = !this.startMenuOpen;
  }

  public onTaskbarItemClick(instanceId: string): void {
    const window = this.windowService.getWindowByInstanceId(instanceId);
    if (window?.minimized) {
      this.windowService.restoreWindow(instanceId);
    } else {
      this.windowService.minimizeWindow(instanceId);
    }
  }

  public onTaskbarItemKeyDown(event: KeyboardEvent, instanceId: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.onTaskbarItemClick(instanceId);
    }
  }
}
