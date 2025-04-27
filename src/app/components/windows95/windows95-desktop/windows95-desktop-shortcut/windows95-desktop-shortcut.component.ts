import { Component, input } from '@angular/core';

@Component({
  selector: 'app-windows95-desktop-shortcut',
  imports: [],
  templateUrl: './windows95-desktop-shortcut.component.html',
  styleUrl: './windows95-desktop-shortcut.component.scss'
})
export class Windows95DesktopShortcutComponent {
  public icon = input.required<string>();
  public name = input.required<string>();
}
