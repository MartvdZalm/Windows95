import { Component } from '@angular/core';
import { Windows95DesktopComponent } from './windows95-desktop/windows95-desktop.component';
import { Windows95TaskbarComponent } from './windows95-taskbar/windows95-taskbar.component';

@Component({
  selector: 'app-windows95',
  imports: [Windows95DesktopComponent, Windows95TaskbarComponent],
  templateUrl: './windows95.component.html',
  styleUrl: './windows95.component.scss',
})
export class Windows95Component {}
