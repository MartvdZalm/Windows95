import { Component, input } from '@angular/core';
import { StartMenuItem } from '../../../../../models/windows95/start-menu-item.model';

@Component({
  selector: 'app-windows95-taskbar-start-menu-item',
  imports: [],
  templateUrl: './windows95-taskbar-start-menu-item.component.html',
  styleUrl: './windows95-taskbar-start-menu-item.component.scss'
})
export class Windows95TaskbarStartMenuItemComponent {
  public startMenuItem = input.required<StartMenuItem>();
}
