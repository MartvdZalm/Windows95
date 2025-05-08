import { Component, inject, OnInit } from '@angular/core';
import { Windows95DesktopShortcutComponent } from './windows95-desktop-shortcut/windows95-desktop-shortcut.component';
import { WindowService } from '../../../services/windows95/window.service';
import { WindowIds } from '../../../models/windows95/window-ids.model';
import { Windows95WindowComponent } from '../windows95-window/windows95-window.component';
import { InternetExplorerComponent } from '../windows95-applications/internet-explorer/internet-explorer.component';
import { MyComputerComponent } from '../windows95-applications/my-computer/my-computer.component';
import { RecycleBinComponent } from '../windows95-applications/recycle-bin/recycle-bin.component';
import { NotepadComponent } from '../windows95-applications/notepad/notepad.component';
import { ShutdownComponent } from '../windows95-dialogs/shutdown/shutdown.component';

@Component({
  selector: 'app-windows95-desktop',
  imports: [
    Windows95DesktopShortcutComponent,
    Windows95WindowComponent,
    InternetExplorerComponent,
    MyComputerComponent,
    RecycleBinComponent,
    NotepadComponent,
    ShutdownComponent
  ],
  templateUrl: './windows95-desktop.component.html',
  styleUrl: './windows95-desktop.component.scss',
})
export class Windows95DesktopComponent implements OnInit {
  public windowService = inject(WindowService);
  public shortcuts = [
    {
      name: 'My Computer',
      icon: 'images/windows95/windows95-my-computer.ico',
      window: '',
    },
    {
      name: 'Inbox',
      icon: 'images/windows95/windows95-mailbox.ico',
      window: '',
    },
    {
      name: 'Internet Explorer',
      icon: 'images/windows95/windows95-ie-5-shortcut.ico',
      window: 'ie',
    },
    {
      name: 'Recycle Bin',
      icon: 'images/windows95/windows95-recycle-bin-empty.ico',
      window: '',
    },
    {
      name: 'Notepad',
      icon: 'images/windows95/windows95-notepad.ico',
      window: 'notepad',
    },
  ];

  public ngOnInit(): void {
    this.windowService.createWindow(WindowIds.NOTEPAD);
  }
}
