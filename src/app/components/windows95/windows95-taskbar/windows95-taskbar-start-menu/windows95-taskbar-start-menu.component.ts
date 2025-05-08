import { Component } from '@angular/core';
import { StartMenuItem } from '../../../../models/windows95/start-menu-item.model';
import { Windows95TaskbarStartMenuItemComponent } from './windows95-taskbar-start-menu-item/windows95-taskbar-start-menu-item.component';

@Component({
  selector: 'app-windows95-taskbar-start-menu',
  imports: [Windows95TaskbarStartMenuItemComponent],
  templateUrl: './windows95-taskbar-start-menu.component.html',
  styleUrl: './windows95-taskbar-start-menu.component.scss',
})
export class Windows95TaskbarStartMenuComponent {
  public startMenuItems: StartMenuItem[] = [
    {
      icon: 'images/windows95/windows95-programs.ico',
      title: 'Programs',
      window: '',
      submenu: [
        {
          icon: 'images/windows95/windows95-programs.ico',
          title: 'Accessories',
          window: '',
          submenu: [
            {
              icon: 'images/windows95/windows95-programs.ico',
              title: 'Accessories',
              window: '',
              submenu: [],
            },
          ],
        },
        {
          icon: 'images/windows95/windows95-programs.ico',
          title: 'StartUp',
          window: '',
          submenu: [],
        },
        {
          icon: 'images/windows95/windows95-programs.ico',
          title: 'MS-DOS Prompt',
          window: '',
          submenu: [],
        },
      ],
    },
    {
      icon: 'images/windows95/windows95-documents.ico',
      title: 'Documents',
      window: '',
      submenu: [],
    },
    {
      icon: 'images/windows95/windows95-settings.ico',
      title: 'Settings',
      window: '',
      submenu: [],
    },
    {
      icon: 'images/windows95/windows95-find.ico',
      title: 'Find',
      window: '',
      submenu: [],
    },
    {
      icon: 'images/windows95/windows95-help.ico',
      title: 'Help',
      window: '',
      submenu: [],
    },
    {
      icon: 'images/windows95/windows95-run.ico',
      title: 'Run...',
      window: '',
      submenu: [],
    },
    {
      icon: 'images/windows95/windows95-shutdown.ico',
      title: 'Shut Down...',
      window: 'shutdown',
      submenu: [],
    },
  ];
}
