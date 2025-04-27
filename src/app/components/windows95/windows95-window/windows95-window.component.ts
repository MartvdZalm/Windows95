import {
  Component,
  computed,
  HostListener,
  inject,
  input,
} from '@angular/core';
import { WindowType } from '../../../models/windows95/window-type.model';
import { WindowService } from '../../../services/windows95/window.service';
import { WindowResizeDirection } from '../../../models/windows95/window-resize-direction.model';

@Component({
  selector: 'app-windows95-window',
  imports: [],
  templateUrl: './windows95-window.component.html',
  styleUrl: './windows95-window.component.scss',
})
export class Windows95WindowComponent {
  private windowService = inject(WindowService);
  public windowId = input.required<string>();

  public window = computed(() => {
    const win = this.windowService.getWindowByInstanceId(this.windowId());
    if (!win) {
      console.warn(`Window with ID ${this.windowId()} not found`);
      return null;
    }
    return win;
  });

  public isActive = computed(
    () => this.windowService.activeWindowId$() === this.windowId()
  );

  public windowType = WindowType;

  private isDragging = false;
  private dragStart = { x: 0, y: 0, offsetX: 0, offsetY: 0 };

  private isResizing = false;
  private resizeStart = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    right: 0,
    bottom: 0,
  };
  private resizeDirection: WindowResizeDirection = null;
  private minWidth = 300;
  private minHeight = 200;

  @HostListener('document:mousemove', ['$event'])
  public onDocumentMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      const newX = event.clientX - this.dragStart.offsetX;
      const newY = event.clientY - this.dragStart.offsetY;
      this.windowService.updateWindowPosition(this.windowId(), {
        x: newX,
        y: newY,
      });
    }

    if (this.isResizing && this.resizeDirection && this.window()) {
      const win = this.window()!;
      const deltaX = event.clientX - this.resizeStart.x;
      const deltaY = event.clientY - this.resizeStart.y;

      let newX = win.position.x;
      let newY = win.position.y;
      let newWidth = win.size.width;
      let newHeight = win.size.height;

      switch (this.resizeDirection) {
        case 'e':
          newWidth = this.resizeStart.width + deltaX;
          break;
        case 'w':
          newWidth = this.resizeStart.width - deltaX;
          newX = this.resizeStart.right - newWidth;
          break;
        case 's':
          newHeight = this.resizeStart.height + deltaY;
          break;
        case 'n':
          newHeight = this.resizeStart.height - deltaY;
          newY = this.resizeStart.bottom - newHeight;
          break;
        case 'ne':
          newWidth = this.resizeStart.width + deltaX;
          newHeight = this.resizeStart.height - deltaY;
          newY = this.resizeStart.bottom - newHeight;
          break;
        case 'nw':
          newWidth = this.resizeStart.width - deltaX;
          newHeight = this.resizeStart.height - deltaY;
          newX = this.resizeStart.right - newWidth;
          newY = this.resizeStart.bottom - newHeight;
          break;
        case 'se':
          newWidth = this.resizeStart.width + deltaX;
          newHeight = this.resizeStart.height + deltaY;
          break;
        case 'sw':
          newWidth = this.resizeStart.width - deltaX;
          newHeight = this.resizeStart.height + deltaY;
          newX = this.resizeStart.right - newWidth;
          break;
      }

      newWidth = Math.max(newWidth, this.minWidth);
      newHeight = Math.max(newHeight, this.minHeight);

      this.windowService.updateWindowPosition(this.windowId(), {
        x: newX,
        y: newY,
      });
      this.windowService.updateWindowSize(this.windowId(), {
        width: newWidth,
        height: newHeight,
      });
    }
  }

  @HostListener('document:mouseup')
  public onDocumentMouseUp(): void {
    this.isDragging = false;
    this.isResizing = false;
  }

  public onHeaderMouseDown(event: MouseEvent): void {
    const win = this.window();
    if (!win) return;

    this.dragStart = {
      x: event.clientX,
      y: event.clientY,
      offsetX: event.clientX - win.position.x,
      offsetY: event.clientY - win.position.y,
    };
    this.isDragging = true;
    this.windowService.setActiveWindow(this.windowId());
    event.preventDefault();
  }

  public startResize(
    event: MouseEvent,
    direction: WindowResizeDirection
  ): void {
    const win = this.window();
    if (!win) return;

    this.resizeDirection = direction;
    this.isResizing = true;

    const rightEdge = win.position.x + win.size.width;
    const bottomEdge = win.position.y + win.size.height;

    this.resizeStart = {
      x: event.clientX,
      y: event.clientY,
      width: win.size.width,
      height: win.size.height,
      right: rightEdge,
      bottom: bottomEdge,
    };

    event.preventDefault();
    event.stopPropagation();
  }

  public onClose(): void {
    this.windowService.closeWindow(this.windowId());
  }

  public onMinimize(): void {
    this.windowService.minimizeWindow(this.windowId());
  }

  public onMaximize(): void {
    this.windowService.toggleMaximize(this.windowId());
  }
}
