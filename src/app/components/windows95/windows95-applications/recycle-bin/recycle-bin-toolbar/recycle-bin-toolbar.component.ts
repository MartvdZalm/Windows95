import { Component, output } from '@angular/core';

@Component({
  selector: 'app-recycle-bin-toolbar',
  imports: [],
  templateUrl: './recycle-bin-toolbar.component.html',
  styleUrl:
    '../../my-computer/my-computer-toolbar/my-computer-toolbar.component.scss',
})
export class RecycleBinToolbarComponent {
  public viewModeChange = output<'icons' | 'list' | 'details'>();
  public viewMode: 'icons' | 'list' | 'details' = 'icons';

  public onViewModeChange(mode: 'icons' | 'list' | 'details'): void {
    this.viewMode = mode;
    this.viewModeChange.emit(mode);
  }
}
