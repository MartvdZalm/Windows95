import { Injectable } from '@angular/core';
import { WindowDefinition } from '../../models/windows95/window-definition.model';
import { WindowType } from '../../models/windows95/window-type.model';
import { InternetExplorerComponent } from '../../components/windows95/windows95-applications/internet-explorer/internet-explorer.component';
import { RecycleBinComponent } from '../../components/windows95/windows95-applications/recycle-bin/recycle-bin.component';
import { MyComputerComponent } from '../../components/windows95/windows95-applications/my-computer/my-computer.component';
import { WindowIds } from '../../models/windows95/window-ids.model';

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
        icon: 'assets/icons/recycle-bin.png',
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
        icon: 'assets/icons/my-computer.png',
        component: MyComputerComponent,
        type: WindowType.APPLICATION,
        defaultWidth: 800,
        defaultHeight: 550,
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
