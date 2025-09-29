import { Component, signal } from '@angular/core';
import { RecycleBinToolbarComponent } from './recycle-bin-toolbar/recycle-bin-toolbar.component';
import { Drive } from '../../../../models/terminal/drive.model';
import { Folder } from '../../../../models/terminal/folder.model';
import { File } from '../../../../models/terminal/file.model';
import { FileManagerComponent } from '../shared/file-manager/file-manager.component';

type FileSystemEntity = Drive | Folder | File;

@Component({
  selector: 'app-recycle-bin',
  imports: [RecycleBinToolbarComponent, FileManagerComponent],
  templateUrl: './recycle-bin.component.html',
  styleUrl: './recycle-bin.component.scss',
})
export class RecycleBinComponent {
  public selectedItems = signal<FileSystemEntity[]>([]);
  public viewMode = signal<'icons' | 'list' | 'details'>('icons');
  public currentItems = signal<FileSystemEntity[]>([
    new File().setName('HelloWorld.txt').setSize(1024),
  ]);

  public restoreItem(item: FileSystemEntity): void {
    this.removeItem(item);
  }

  public doubleClickItem(item: FileSystemEntity): void {
    this.restoreItem(item);
  }

  public deleteItem(item: FileSystemEntity): void {
    this.removeItem(item);
  }

  public deleteSelected(): void {
    const selected = this.selectedItems();
    selected.forEach((item) => this.deleteItem(item));
    this.selectedItems.set([]);
  }

  public emptyRecycleBin(): void {
    if (
      confirm('Are you sure you want to delete all items in the Recycle Bin?')
    ) {
      this.currentItems.set([]);
      this.selectedItems.set([]);
    }
  }

  private removeItem(item: FileSystemEntity): void {}

  public setViewMode(mode: 'icons' | 'list' | 'details'): void {
    this.viewMode.set(mode);
  }
}
