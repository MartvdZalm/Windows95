import { Component, inject, OnInit } from '@angular/core';
import { WindowService } from '../../../services/windows95/window.service';
import { WindowIds } from '../../../models/windows95/window-ids.model';
import { Windows95WindowComponent } from '../windows95-window/windows95-window.component';
import { InternetExplorerComponent } from '../windows95-applications/internet-explorer/internet-explorer.component';
import { MyComputerComponent } from '../windows95-applications/my-computer/my-computer.component';
import { RecycleBinComponent } from '../windows95-applications/recycle-bin/recycle-bin.component';
import { NotepadComponent } from '../windows95-applications/notepad/notepad.component';
import { ShutdownComponent } from '../windows95-dialogs/shutdown/shutdown.component';
import { WelcomeComponent } from '../windows95-dialogs/welcome/welcome.component';
import { PdfViewerComponent } from '../windows95-applications/pdf-viewer/pdf-viewer.component';
import { KnightCompilerComponent } from '../windows95-applications/knight-compiler/knight-compiler.component';
import { CookieService } from 'ngx-cookie-service';
import { PdfViewerService } from '../../../services/windows95/windows95-applications/pdf-viewer/pdf-viewer.service';
import { TetrisComponent } from '../windows95-applications/tetris/tetris.component';
import { DevPilotComponent } from '../windows95-applications/dev-pilot/dev-pilot.component';
import { TheLastRoninComponent } from '../windows95-applications/the-last-ronin/the-last-ronin.component';

@Component({
  selector: 'app-windows95-desktop',
  imports: [
    Windows95WindowComponent,
    InternetExplorerComponent,
    MyComputerComponent,
    RecycleBinComponent,
    NotepadComponent,
    ShutdownComponent,
    WelcomeComponent,
    PdfViewerComponent,
    KnightCompilerComponent,
    TetrisComponent,
    DevPilotComponent,
    TheLastRoninComponent,
  ],
  templateUrl: './windows95-desktop.component.html',
  styleUrl: './windows95-desktop.component.scss',
})
export class Windows95DesktopComponent implements OnInit {
  private cookieService = inject(CookieService);
  public windowService = inject(WindowService);
  private pdfViewerService = inject(PdfViewerService);
  public shortcuts = [
    {
      name: 'My Computer',
      icon: 'images/windows95/windows95-my-computer.ico',
      window: 'my-computer',
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
      window: 'recycle-bin',
    },
    {
      name: 'Mart van der Zalm',
      icon: 'images/windows95/windows95-notepad.ico',
      window: 'notepad',
    },
    {
      name: 'CV',
      icon: 'images/windows95/extensions/file.ico',
      window: 'cv',
    },
    {
      name: 'Knight',
      icon: 'images/windows95/windows95-programs.ico',
      window: WindowIds.KNIGHT_COMPILER,
    },
    {
      name: 'Tetris',
      icon: 'images/windows95/windows95-programs.ico',
      window: WindowIds.TETRIS,
    },
    {
      name: 'Dev Pilot',
      icon: 'images/windows95/windows95-programs.ico',
      window: WindowIds.DEV_PILOT,
    },
    {
      name: 'The Last Ronin',
      icon: 'images/windows95/windows95-programs.ico',
      window: WindowIds.THE_LAST_RONIN,
    },
  ];

  public openShortcut(window: string): void {
    if (window === 'cv') {
      this.pdfViewerService.openPdf('documents/cv.pdf', 'CV.pdf');
      this.windowService.createWindow(WindowIds.PDF_VIEWER);
    } else if (window) {
      this.windowService.createWindow(window);
    }
  }

  public ngOnInit(): void {
    const hideWelcome = this.cookieService.get('hideWelcome');
    if (hideWelcome !== 'true') {
      this.windowService.createWindow(WindowIds.WELCOME);
    }
  }
}
