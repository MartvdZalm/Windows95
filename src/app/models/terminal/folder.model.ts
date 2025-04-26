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
    let output = `Volume in drive ${this.getDriveLetter()} is ${this.getVolumeLabel()}\n`;
    output += `Volume Serial Number is ${this.generateSerialNumber()}\n`;
    output += `Directory of ${this.location}\n\n`;

    const padRight = (str: string, width: number): string =>
      str.length >= width ? str : str + ' '.repeat(width - str.length);

    const formatLine = (
      date: string,
      type: string,
      size: string,
      name: string
    ): string => {
      return `${padRight(date, 20)}${type}${padRight(size, 20)}${name}\n`;
    };

    const modifiedDate = this.formatDosDate(this.dateModified);
    output += formatLine(modifiedDate, '<DIR>', '', '.');
    if (this.location !== 'C:\\') {
      output += formatLine(modifiedDate, '<DIR>', '', '..');
    }

    this.subfolders.forEach((folder) => {
      const folderModifiedDate = this.formatDosDate(folder.getDateModified());
      output += formatLine(folderModifiedDate, '<DIR>', '', folder.getName());
    });

    this.files
      .filter((file) => !file.getAttributes().hidden)
      .sort((a, b) => a.getName().localeCompare(b.getName()))
      .forEach((file) => {
        const fileModifiedDate = this.formatDosDate(file.getDateModified());
        const size = this.formatFileSize(file.getSize());
        output += formatLine(fileModifiedDate, '', size, this.formatFileName(file.getName()));
      });

    const totalFiles = this.files.filter(
      (f) => !f.getAttributes().hidden
    ).length;
    const totalFileSize = this.files
      .filter((f) => !f.getAttributes().hidden)
      .reduce((sum, file) => sum + file.getSize(), 0);
    const freeSpace = this.calculateFreeSpace();

    output += `\n        ${totalFiles} file(s)      ${this.formatNumberWithCommas(totalFileSize)} bytes\n`;
    output += `        ${this.subfolders.length} dir(s)       ${this.formatNumberWithCommas(freeSpace)} bytes free\n`;

    return output;
  }

  private getDriveLetter(): string {
    return this.location.substring(0, 1);
  }

  private getVolumeLabel(): string {
    return 'SYSTEM';
  }

  private generateSerialNumber(): string {
    return (
      Math.floor(Math.random() * 0xffff)
        .toString(16)
        .toUpperCase()
        .padStart(4, '0') +
      '-' +
      Math.floor(Math.random() * 0xffff)
        .toString(16)
        .toUpperCase()
        .padStart(4, '0')
    );
  }

  private formatDosDate(date: Date): string {
    return (
      date
        .toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: '2-digit',
        })
        .replace(/\//g, '-') +
      '  ' +
      date
        .toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
        .replace(/:00$/, '')
    );
  }

  private formatFileSize(size: number): string {
    return this.formatNumberWithCommas(size).padStart(12);
  }

  private formatFileName(name: string): string {
    if (name.length <= 12) {
      return name;
    }

    const dotIndex = name.lastIndexOf('.');
    if (dotIndex === -1) {
      return name.substring(0, 8);
    }

    return name.substring(0, 8) + name.substring(dotIndex);
  }

  private formatNumberWithCommas(num: number): string {
    return num.toString().replace('/B(?=(d{3})+(?!d)/g', ',');
  }

  private calculateFreeSpace(): number {
    const usedSpace =
      this.files.reduce((sum, file) => sum + file.getSize(), 0) +
      this.subfolders.reduce((sum, folder) => sum + folder.getFolderSize(), 0);
    return Math.max(0, 2147483648 - usedSpace);
  }
}
