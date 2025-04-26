import { File } from './file.model';

export class Folder {
  private name = '';
  private location = '';
  private dateCreated: Date = new Date();
  private dateModified: Date = new Date();
  private dateAccessed: Date = new Date();
  private files: File[] = [];
  private subfolders: Folder[] = [];

  public setName(name: string): this {
    this.name = name;
    return this;
  }

  public getName(): string {
    return this.name;
  }

  public setLocation(location: string): this {
    this.location = location;
    return this;
  }

  public getLocation(): string {
    return this.location;
  }

  public setDateCreated(dateCreated: Date | string): this {
    this.dateCreated = new Date(dateCreated);
    return this;
  }

  public getDateCreated(): Date {
    return this.dateCreated;
  }

  public setDateModified(dateModified: Date | string): this {
    this.dateModified = new Date(dateModified);
    return this;
  }

  public getDateModified(): Date {
    return this.dateModified;
  }

  public setDateAccessed(dateAccessed: Date | string): this {
    this.dateAccessed = new Date(dateAccessed);
    return this;
  }

  public getDateAccessed(): Date {
    return this.dateAccessed;
  }

  public addFile(file: File): this {
    this.files.push(file);
    this.updateModificationTime();
    return this;
  }

  public getFiles(): File[] {
    return this.files;
  }

  public addSubfolder(folder: Folder): this {
    this.subfolders.push(folder);
    this.updateModificationTime();
    return this;
  }

  public getSubFolders(): Folder[] {
    return this.subfolders;
  }

  public getSubFolder(folderName: string): Folder | null {
    return (
      this.subfolders.find(
        (subfolder) =>
          subfolder.getName().toLowerCase() === folderName.toLowerCase()
      ) || null
    );
  }

  public updateModificationTime(): void {
    this.dateModified = new Date();
  }

  public getFolderSize(): number {
    return this.files.reduce((total, file) => total + file.getSize(), 0);
  }

  public displayContents(): string {
    let output = `Directory of ${this.name}\n`;
    output += `Location: ${this.location}\n`;
    output += `Date Created: ${this.dateCreated.toLocaleString()}\n`;
    output += `Date Modified: ${this.dateModified.toLocaleString()}\n`;
    output += `Date Accessed: ${this.dateAccessed.toLocaleString()}\n`;
    output += '--------------------------------------------------------\n';

    output += 'Files:\n';
    if (this.files.length > 0) {
      this.files.forEach((file) => {
        output += `${file.getName()}\t${file.getSize()} bytes\t${file
          .getDateModified()
          .toLocaleString()}\n`;
      });
    } else {
      output += 'No files found.\n';
    }

    output += 'Subfolders:\n';
    if (this.subfolders.length > 0) {
      this.subfolders.forEach((subfolder) => {
        output += `${subfolder.getName()}\tSize: ${subfolder.getFolderSize()} bytes\n`;
      });
    } else {
      output += 'No subfolders found.\n';
    }

    output += '--------------------------------------------------------\n';

    return output;
  }
}
