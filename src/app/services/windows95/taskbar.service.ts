import { inject, Injectable, signal } from '@angular/core';
import { WindowInstance } from '../../models/windows95/window-instance.model';
import { TaskbarItem } from '../../models/windows95/taskbar-item.model';
import { WindowEventsService } from './window-events.service';

@Injectable({
  providedIn: 'root',
})
export class TaskbarService {
  private windowEvents = inject(WindowEventsService);
  private taskbarItems = signal<TaskbarItem[]>([]);
  public taskbarItemsList = this.taskbarItems.asReadonly();

  public constructor() {
    this.windowEvents.windowOpened$.subscribe((window) =>
      this.addWindowToTaskbar(window)
    );
    this.windowEvents.windowClosed$.subscribe((instanceId) =>
      this.removeWindowFromTaskbar(instanceId)
    );
    this.windowEvents.windowActivated$.subscribe((instanceId) =>
      this.updateActiveWindow(instanceId)
    );
  }

  public addWindowToTaskbar(windowInstance: WindowInstance): void {
    this.taskbarItems.update((items) => {
      if (
        !items.some((item) => item.instanceId === windowInstance.instanceId)
      ) {
        return [
          ...items,
          {
            instanceId: windowInstance.instanceId,
            title: windowInstance.definition.title,
            icon: windowInstance.definition.icon,
            isActive: false,
          },
        ];
      }
      return items;
    });
  }

  public removeWindowFromTaskbar(instanceId: string): void {
    this.taskbarItems.update((items) =>
      items.filter((item) => item.instanceId !== instanceId)
    );
  }

  public updateActiveWindow(instanceId: string): void {
    this.taskbarItems.update((items) =>
      items.map((item) => ({
        ...item,
        isActive: item.instanceId === instanceId,
      }))
    );
  }
}
