import { computed, inject, Injectable, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { WindowInstance } from '../../models/windows95/window-instance.model';
import { WindowRegistryService } from './window-registry.service';
import { WindowEventsService } from './window-events.service';

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  private windowRegistryService = inject(WindowRegistryService);
  private windowEvents = inject(WindowEventsService);
  private windows = signal<WindowInstance[]>([]);
  private activeWindowId = signal<string | null>(null);

  public readonly windowsList = this.windows.asReadonly();
  public readonly activeWindowId$ = this.activeWindowId.asReadonly();
  
  public readonly maxZIndex = computed(() =>
    this.windows().reduce((max, w) => Math.max(max, w.zIndex), 0)
  );
  
  public readonly activeWindow = computed(() => {
    const activeId = this.activeWindowId();
    return activeId ? this.getWindowByInstanceId(activeId) : null;
  });

  public createWindow(typeId: string): string {
    const definition = this.windowRegistryService.getWindowDefinition(typeId);
    const instanceId = uuidv4();

    const newWindow: WindowInstance = {
      id: definition.id,
      instanceId,
      definition,
      zIndex: this.maxZIndex() + 1,
      minimized: false,
      maximized: false,
      position: this.getInitialPosition(definition.defaultWidth, definition.defaultHeight),
      size: {
        width: definition.defaultWidth,
        height: definition.defaultHeight,
      },
    };

    this.windows.update((current) => [...current, newWindow]);
    this.setActiveWindow(instanceId);
    this.windowEvents.emitWindowOpened(newWindow);
    return instanceId;
  }

  public closeWindow(instanceId: string): void {
    this.windows.update((current) =>
      current.filter((w) => w.instanceId !== instanceId)
    );
    this.windowEvents.emitWindowClosed(instanceId);
    if (this.activeWindowId() === instanceId) {
      this.activeWindowId.set(null);
    }
  }

  public setActiveWindow(instanceId: string): void {
    this.windows.update((current) =>
      current.map((w) => ({
        ...w,
        zIndex: w.instanceId === instanceId ? this.maxZIndex() + 1 : w.zIndex,
      }))
    );
    this.windowEvents.emitWindowActivated(instanceId);
    this.activeWindowId.set(instanceId);
  }

  public minimizeWindow(instanceId: string): void {
    this.windows.update((current) =>
      current.map((w) =>
        w.instanceId === instanceId ? { ...w, minimized: true } : w
      )
    );
  }

  public restoreWindow(instanceId: string): void {
    this.windows.update((current) =>
      current.map((w) =>
        w.instanceId === instanceId ? { ...w, minimized: false } : w
      )
    );
    this.setActiveWindow(instanceId);
  }

  public toggleMaximize(instanceId: string): void {
    this.windows.update((current) =>
      current.map((w) => {
        if (w.instanceId !== instanceId) return w;

        const isMaximizing = !w.maximized;
        return {
          ...w,
          maximized: isMaximizing,
          position: isMaximizing ? { x: 0, y: 0 } : w.position,
          size: isMaximizing
            ? { width: window.innerWidth, height: window.innerHeight }
            : {
                width: w.definition.defaultWidth,
                height: w.definition.defaultHeight,
              },
        };
      })
    );
  }

  public updateWindowPosition(
    instanceId: string,
    position: { x: number; y: number }
  ): void {
    this.windows.update((current) =>
      current.map((w) => (w.instanceId === instanceId ? { ...w, position } : w))
    );
  }

  public updateWindowSize(
    instanceId: string,
    size: { width: number; height: number }
  ): void {
    this.windows.update((current) =>
      current.map((w) => (w.instanceId === instanceId ? { ...w, size } : w))
    );
  }

  public getWindowByInstanceId(instanceId: string): WindowInstance | undefined {
    return this.windows().find((w) => w.instanceId === instanceId);
  }

  public getWindowsByType(typeId: string): WindowInstance[] {
    return this.windows().filter((w) => w.id === typeId);
  }

  private getInitialPosition(width: number, height: number): { x: number; y: number } {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const centerX = Math.max(0, (screenWidth - width) / 2);
    const centerY = Math.max(0, (screenHeight - height) / 2) - 30;

    const lastWindow = this.windows()[this.windows().length - 1];
    return lastWindow
      ? { x: lastWindow.position.x + 30, y: lastWindow.position.y + 30 }
      : { x: centerX, y: centerY };
  }
}
