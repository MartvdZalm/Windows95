import { Component, inject, signal } from '@angular/core';
import { MyComputerToolbarComponent } from './my-computer-toolbar/my-computer-toolbar.component';
import { MyComputerStatusbarComponent } from './my-computer-statusbar/my-computer-statusbar.component';
import { FileSystemService } from '../../../../services/terminal/filesystem.service';
import { Drive } from '../../../../models/terminal/drive.model';
import { Folder } from '../../../../models/terminal/folder.model';
import { File } from '../../../../models/terminal/file.model';
import { FILE_ASSOCIATIONS } from '../../../../models/terminal/file-associations';

type FileSystemEntity = Drive | Folder | File;

@Component({
  selector: 'app-my-computer',
  imports: [MyComputerToolbarComponent, MyComputerStatusbarComponent],
  templateUrl: './my-computer.component.html',
  styleUrls: ['./my-computer.component.scss'],
})
export class MyComputerComponent {
  public currentPath = signal<string>('root');
  public selectedItems = signal<FileSystemEntity[]>([]);
  public viewMode = signal<'icons' | 'list' | 'details'>('icons');
  public sortBy = signal<'name' | 'type' | 'size' | 'date'>('name');
  public sortOrder = signal<'asc' | 'desc'>('asc');
  public showHiddenFiles = signal<boolean>(false);

  private fileSystemService = inject(FileSystemService);

  public get currentItems(): FileSystemEntity[] {
    if (this.currentPath() === 'root') {
      return this.fileSystemService.getDrives();
    }

    const driveLetter = this.currentPath().split('\\')[0];
    const drive = this.fileSystemService.getDrive(driveLetter);

    if (!drive) {
      return [];
    }

    const folder = this.fileSystemService.getFolderFromPath(this.currentPath());

    if (!(folder instanceof Folder)) {
      return [];
    }

    let items: FileSystemEntity[] = [
      ...folder.getSubFolders(),
      ...folder.getFiles(),
    ];

    if (!this.showHiddenFiles()) {
      items = items.filter(
        (item) =>
          item instanceof Drive ||
          item instanceof Folder ||
          item.getAttributes().hidden === false
      );
    }

    return this.sortItems(items);
  }

  public navigateTo(path: string): void {
    this.currentPath.set(path);
  }

  public navigateUp(): void {
    const current = this.currentPath();

    if (current === 'root') {
      return;
    }

    const parentPath =
      current.substring(0, current.lastIndexOf('\\', current.length - 2)) +
      '\\';

    if (parentPath.length < 3) {
      this.currentPath.set('root');
    } else {
      this.currentPath.set(parentPath);
    }
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
    if (item instanceof Drive) {
      this.navigateTo(item.getRootFolder().getLocation());
    } else if (item instanceof Folder) {
      this.navigateTo(item.getLocation());
    } else if (item instanceof File) {
      this.openFile(item);
    }
  }

  public openFile(file: File): void {
    // TODO: Add this feature
  }

  public setViewMode(mode: 'icons' | 'list' | 'details'): void {
    this.viewMode.set(mode);
  }

  public setSortBy(sortBy: 'name' | 'type' | 'size' | 'date'): void {
    if (this.sortBy() === sortBy) {
      this.sortOrder.set(this.sortOrder() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortBy.set(sortBy);
      this.sortOrder.set('asc');
    }
  }

  public toggleHiddenFiles(): void {
    this.showHiddenFiles.set(!this.showHiddenFiles());
  }

  private sortItems(items: FileSystemEntity[]): FileSystemEntity[] {
    return items.sort((a, b) => {
      let nameA = a instanceof Drive ? a.getName() : a.getName();
      let nameB = b instanceof Drive ? b.getName() : b.getName();
      let comparison = 0;

      switch (this.sortBy()) {
        case 'name':
          comparison = nameA.localeCompare(nameB);
          break;
        case 'type':
          comparison = this.getItemType(a).localeCompare(this.getItemType(b));
          break;
        case 'size':
          const sizeA = a instanceof File ? a.getSize() : 0;
          const sizeB = b instanceof File ? b.getSize() : 0;
          comparison = sizeA - sizeB;
          break;
        case 'date':
          const dateA = a instanceof File ? a.getDateModified() : new Date();
          const dateB = b instanceof File ? b.getDateModified() : new Date();
          comparison = dateA.getTime() - dateB.getTime();
          break;
      }

      return this.sortOrder() === 'asc' ? comparison : -comparison;
    });
  }

  public getSelectedItemsCount(): number {
    return this.selectedItems().length;
  }

  public getTotalItemsCount(): number {
    return this.currentItems.length;
  }

  public isSelected(item: FileSystemEntity): boolean {
    return this.selectedItems().includes(item);
  }

  public getDrives(): Drive[] {
    return this.currentItems.filter((item) => item instanceof Drive) as Drive[];
  }

  public getFolders(): Folder[] {
    return this.currentItems.filter(
      (item) => item instanceof Folder
    ) as Folder[];
  }

  public getFiles(): File[] {
    return this.currentItems.filter((item) => item instanceof File) as File[];
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

  public refresh(): void {
    console.log('Refreshing current directory');
  }
}
