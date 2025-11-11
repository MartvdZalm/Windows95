import { Component, inject, signal, computed } from '@angular/core';
import { MyComputerToolbarComponent } from './my-computer-toolbar/my-computer-toolbar.component';
import { FileSystemService } from '../../../../services/terminal/filesystem.service';
import { Drive } from '../../../../models/terminal/drive.model';
import { Folder } from '../../../../models/terminal/folder.model';
import { File } from '../../../../models/terminal/file.model';
import { FILE_ASSOCIATIONS } from '../../../../models/terminal/file-associations';
import { FileManagerComponent } from '../shared/file-manager/file-manager.component';
import { WindowService } from '../../../../services/windows95/window.service';
import { WindowIds } from '../../../../models/windows95/window-ids.model';
import { PdfViewerService } from '../../../../services/windows95/windows95-applications/pdf-viewer/pdf-viewer.service';

type FileSystemEntity = Drive | Folder | File;

@Component({
  selector: 'app-my-computer',
  imports: [MyComputerToolbarComponent, FileManagerComponent],
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
  private windowService = inject(WindowService);
  private pdfViewerService = inject(PdfViewerService);

  public currentItems = computed(() => {
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
  });

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

  public doubleClickItem(item: FileSystemEntity): void {
    if (item instanceof Drive) {
      this.navigateTo(item.getRootFolder().getLocation());
    } else if (item instanceof Folder) {
      this.navigateTo(item.getLocation());
    } else if (item instanceof File) {
      this.openFile(item);
    }
  }

  private openFile(file: File): void {
    const extension = file.getExtension().toLowerCase();

    if (extension === 'pdf') {
      const assetPath = file.getAssetPath();
      const filePath = assetPath || this.getAssetPathForFile(file);
      const fileName = file.getName();
      this.pdfViewerService.openPdf(filePath, fileName);
      this.windowService.createWindow(WindowIds.PDF_VIEWER);
    }
  }

  private getAssetPathForFile(file: File): string {
    const fileName = file.getName().toLowerCase();
    return `documents/${fileName}`;
  }

  public setViewMode(mode: 'icons' | 'list' | 'details'): void {
    this.viewMode.set(mode);
  }

  public toggleHiddenFiles(): void {
    this.showHiddenFiles.set(!this.showHiddenFiles());
  }

  private sortItems(items: FileSystemEntity[]): FileSystemEntity[] {
    return items.sort((a, b) => {
      const nameA = a instanceof Drive ? a.getName() : a.getName();
      const nameB = b instanceof Drive ? b.getName() : b.getName();
      let comparison = 0;

      switch (this.sortBy()) {
        case 'name':
          comparison = nameA.localeCompare(nameB);
          break;
        case 'type':
          comparison = this.getItemType(a).localeCompare(this.getItemType(b));
          break;
        case 'size':
          {
            const sizeA = a instanceof File ? a.getSize() : 0;
            const sizeB = b instanceof File ? b.getSize() : 0;
            comparison = sizeA - sizeB;
          }
          break;
        case 'date':
          {
            const dateA = a instanceof File ? a.getDateModified() : new Date();
            const dateB = b instanceof File ? b.getDateModified() : new Date();
            comparison = dateA.getTime() - dateB.getTime();
          }
          break;
      }

      return this.sortOrder() === 'asc' ? comparison : -comparison;
    });
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
}
