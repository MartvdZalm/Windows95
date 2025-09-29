import { Component, output } from '@angular/core';

@Component({
  selector: 'app-my-computer-toolbar',
  imports: [],
  templateUrl: './my-computer-toolbar.component.html',
  styleUrls: ['./my-computer-toolbar.component.scss'],
})
export class MyComputerToolbarComponent {
  public navigateUp = output<void>();
  public viewModeChange = output<'icons' | 'list' | 'details'>();
  public toggleHiddenFiles = output<void>();
  public viewMode: 'icons' | 'list' | 'details' = 'icons';
  public showHiddenFiles = false;

  public onNavigateUp(): void {
    this.navigateUp.emit();
  }

  public onViewModeChange(mode: 'icons' | 'list' | 'details'): void {
    this.viewMode = mode;
    this.viewModeChange.emit(mode);
  }

  public onToggleHiddenFiles(): void {
    this.showHiddenFiles = !this.showHiddenFiles;
    this.toggleHiddenFiles.emit();
  }
}
