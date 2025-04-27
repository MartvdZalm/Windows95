import { Injectable } from '@angular/core';
import { WindowInstance } from '../../models/windows95/window-instance.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WindowEventsService {
  private windowOpenedSource = new Subject<WindowInstance>();
  private windowClosedSource = new Subject<string>();
  private windowActivatedSource = new Subject<string>();

  public windowOpened$ = this.windowOpenedSource.asObservable();
  public windowClosed$ = this.windowClosedSource.asObservable();
  public windowActivated$ = this.windowActivatedSource.asObservable();

  public emitWindowOpened(window: WindowInstance): void {
    this.windowOpenedSource.next(window);
  }

  public emitWindowClosed(instanceId: string): void {
    this.windowClosedSource.next(instanceId);
  }

  public emitWindowActivated(instanceId: string): void {
    this.windowActivatedSource.next(instanceId);
  }
}
