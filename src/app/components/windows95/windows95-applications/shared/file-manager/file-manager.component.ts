import { Component, input, signal, output } from '@angular/core';

import { Drive } from '../../../../../models/terminal/drive.model';
import { Folder } from '../../../../../models/terminal/folder.model';
import { File } from '../../../../../models/terminal/file.model';
import { FileManagerStatusbarComponent } from './file-manager-status-bar/file-manager-status-bar.component';
import { FILE_ASSOCIATIONS } from '../../../../../models/terminal/file-associations';

type FileSystemEntity = Drive | Folder | File;

@Component({
  selector: 'app-file-manager',
  imports: [FileManagerStatusbarComponent],
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss'],
})
export class FileManagerComponent {
  public selectedItems = signal<FileSystemEntity[]>([]);
  public items = input.required<FileSystemEntity[]>();
  public viewMode = input<'icons' | 'list' | 'details'>('icons');
  public onDoubleClickItem = output<FileSystemEntity>();
  public addressPath = input<string>('');

  public getSelectedItemsCount(): number {
    return this.selectedItems().length;
  }

  public getTotalItemsCount(): number {
    return this.items().length;
  }

  public isSelected(item: FileSystemEntity): boolean {
    return this.selectedItems().includes(item);
  }

  public selectItem(item: FileSystemEntity, multiSelect = false): void {
    if (multiSelect) {
      const current = this.selectedItems();
      const index = current.indexOf(item);
      if (index >= 0) {
        current.splice(index, 1);
        this.selectedItems.set([...current]);
      } else {
        this.selectedItems.set([...current, item]);
      }
    } else {
      this.selectedItems.set([item]);
    }
  }

  public handleItemClick(event: any, item: FileSystemEntity): void {
    const multiSelect = event instanceof MouseEvent && event.ctrlKey;
    this.selectItem(item, multiSelect);
  }

  public doubleClickItem(item: FileSystemEntity): void {
    this.onDoubleClickItem.emit(item);
  }

  public getItemSize(item: FileSystemEntity): string {
    if (item instanceof File || item instanceof Folder) {
      return this.formatBytes(item.getSize());
    }
    if (item instanceof Drive) {
      return this.formatBytes(item.getCalculateUsedSpace());
    }
    return '';
  }

  public getItemType(item: FileSystemEntity): string {
    if (item instanceof Drive) return 'Drive';
    if (item instanceof Folder) return 'File Folder';
    if (item instanceof File) return this.getFileType(item.getName());
    return '';
  }

  public getFileType(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase();
    return FILE_ASSOCIATIONS[extension || 'default']?.type || 'File';
  }

  public formatBytes(bytes: number): string {
    if (bytes === 0) return '0 bytes';
    const k = 1024;
    const sizes = ['bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  public formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
}
