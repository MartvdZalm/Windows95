import { Component, inject, input } from '@angular/core';
import { WindowService } from '../../../../services/windows95/window.service';

@Component({
  selector: 'app-windows95-desktop-shortcut',
  imports: [],
  templateUrl: './windows95-desktop-shortcut.component.html',
  styleUrl: './windows95-desktop-shortcut.component.scss',
})
export class Windows95DesktopShortcutComponent {
  private windowService = inject(WindowService);

  public icon = input.required<string>();
  public name = input.required<string>();
  public window = input.required<string>();

  public openWindow(window: string): void {
    this.windowService.createWindow(window);
  }
}
