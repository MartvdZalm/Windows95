import { Component, inject, OnInit } from '@angular/core';
import { Windows95DesktopComponent } from './windows95-desktop/windows95-desktop.component';
import { Windows95TaskbarComponent } from './windows95-taskbar/windows95-taskbar.component';
import { Windows95WindowComponent } from './windows95-window/windows95-window.component';
import { WindowService } from '../../services/windows95/window.service';
import { InternetExplorerComponent } from './windows95-applications/internet-explorer/internet-explorer.component';
import { MyComputerComponent } from './windows95-applications/my-computer/my-computer.component';
import { RecycleBinComponent } from './windows95-applications/recycle-bin/recycle-bin.component';

@Component({
  selector: 'app-windows95',
  imports: [
    Windows95DesktopComponent,
    Windows95TaskbarComponent,
    Windows95WindowComponent,
    InternetExplorerComponent,
    MyComputerComponent,
    RecycleBinComponent,
  ],
  templateUrl: './windows95.component.html',
  styleUrl: './windows95.component.scss',
})
export class Windows95Component implements OnInit {
  public windowService = inject(WindowService);

  public ngOnInit(): void {
    this.windowService.createWindow('ie');
  }
}
