import { Component } from '@angular/core';
import { Windows95DesktopShortcutComponent } from './windows95-desktop-shortcut/windows95-desktop-shortcut.component';

@Component({
  selector: 'app-windows95-desktop',
  imports: [Windows95DesktopShortcutComponent],
  templateUrl: './windows95-desktop.component.html',
  styleUrl: './windows95-desktop.component.scss'
})
export class Windows95DesktopComponent {
  shortcuts = [
    { 
      name: 'My Computer', 
      icon: 'images/windows95/windows95-my-computer.ico',
    },
    {
      name: 'Inbox',
      icon: 'images/windows95/windows95-mailbox.ico'
    },
    {
      name: 'Internet Explorer',
      icon: 'images/windows95/windows95-ie-5-shortcut.ico',
    },
    {
      name: 'Recycle Bin',
      icon: 'images/windows95/windows95-recycle-bin-empty.ico'
    }
  ];
}
