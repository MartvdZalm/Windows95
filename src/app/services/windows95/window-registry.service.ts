import { Injectable } from '@angular/core';
import { WindowDefinition } from '../../models/windows95/window-definition.model';
import { WindowType } from '../../models/windows95/window-type.model';
import { InternetExplorerComponent } from '../../components/windows95/windows95-applications/internet-explorer/internet-explorer.component';
import { RecycleBinComponent } from '../../components/windows95/windows95-applications/recycle-bin/recycle-bin.component';
import { MyComputerComponent } from '../../components/windows95/windows95-applications/my-computer/my-computer.component';
import { WindowIds } from '../../models/windows95/window-ids.model';
import { NotepadComponent } from '../../components/windows95/windows95-applications/notepad/notepad.component';
import { ShutdownComponent } from '../../components/windows95/windows95-dialogs/shutdown/shutdown.component';
import { WelcomeComponent } from '../../components/windows95/windows95-dialogs/welcome/welcome.component';

@Injectable({
  providedIn: 'root',
})
export class WindowRegistryService {
  private readonly windowTypes = new Map<string, WindowDefinition>([
    [
      WindowIds.INTERNET_EXPLORER,
      {
        id: WindowIds.INTERNET_EXPLORER,
        title: 'Internet Explorer',
        icon: 'images/windows95/windows95-ie-5.ico',
        component: InternetExplorerComponent,
        type: WindowType.APPLICATION,
        defaultWidth: 900,
        defaultHeight: 600,
      },
    ],
    [
      WindowIds.RECYCLE_BIN,
      {
        id: WindowIds.RECYCLE_BIN,
        title: 'Recycle Bin',
        icon: '',
        component: RecycleBinComponent,
        type: WindowType.APPLICATION,
        defaultWidth: 650,
        defaultHeight: 500,
      },
    ],
    [
      WindowIds.MY_COMPUTER,
      {
        id: WindowIds.MY_COMPUTER,
        title: 'My Computer',
        icon: 'images/windows95/windows95-my-computer.ico',
        component: MyComputerComponent,
        type: WindowType.APPLICATION,
        defaultWidth: 800,
        defaultHeight: 550,
      },
    ],
    [
      WindowIds.NOTEPAD,
      {
        id: WindowIds.NOTEPAD,
        title: 'Notepad',
        icon: 'images/windows95/windows95-notepad.ico',
        component: NotepadComponent,
        type: WindowType.APPLICATION,
        defaultWidth: 700,
        defaultHeight: 650,
      },
    ],
    [
      WindowIds.SHUTDOWN,
      {
        id: WindowIds.SHUTDOWN,
        title: 'Shutdown',
        icon: '',
        component: ShutdownComponent,
        type: WindowType.DIALOG,
        defaultWidth: 500,
        defaultHeight: 300,
      },
    ],
    [
      WindowIds.WELCOME,
      {
        id: WindowIds.WELCOME,
        title: 'Welcome',
        icon: '',
        component: WelcomeComponent,
        type: WindowType.DIALOG,
        defaultWidth: 650,
        defaultHeight: 450,
      },
    ],
  ]);

  public getWindowDefinition(typeId: string): WindowDefinition {
    const definition = this.windowTypes.get(typeId);
    if (!definition) {
      throw new Error(`Window type ${typeId} not registered`);
    }
    return definition;
  }

  public getAllWindowTypes(): WindowDefinition[] {
    return Array.from(this.windowTypes.values());
  }
}
