import { Component } from '@angular/core';
import { Windows95TaskbarStartMenuComponent } from './windows95-taskbar-start-menu/windows95-taskbar-start-menu.component';

@Component({
  selector: 'app-windows95-taskbar',
  imports: [Windows95TaskbarStartMenuComponent],
  templateUrl: './windows95-taskbar.component.html',
  styleUrl: './windows95-taskbar.component.scss',
})
export class Windows95TaskbarComponent {
  public startMenuOpen = false;
  
  public toggleStartMenu(): void {
    this.startMenuOpen = !this.startMenuOpen;
  }
}
