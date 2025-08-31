import { Folder } from './folder.model';

export type DriveType = 'local' | 'network' | 'removable';

export class Drive {
  private letter: string;
  private name: string;
  private type: DriveType;
  private totalSpace: number;
  private freeSpace: number;
  private rootFolder: Folder;
  private icon: string;

  public constructor(
    letter: string,
    name: string,
    type: DriveType,
    totalSpace: number,
    freeSpace: number,
    icon: string
  ) {
    this.letter = letter;
    this.name = name;
    this.type = type;
    this.totalSpace = totalSpace;
    this.freeSpace = freeSpace;
    this.icon = icon;
    this.rootFolder = new Folder().setName(letter).setLocation(`${letter}\\`);
  }

  public getLetter(): string {
    return this.letter;
  }

  public getName(): string {
    return this.name;
  }

  public getType(): DriveType {
    return this.type;
  }

  public getTotalSpace(): number {
    return this.totalSpace;
  }

  public getFreeSpace(): number {
    return this.freeSpace;
  }

  public getRootFolder(): Folder {
    return this.rootFolder;
  }

  public getIcon(): string {
    return this.icon;
  }

  public getLocation(): string {
    return `${this.letter}:\\`;
  }

  public getDateModified(): Date {
    // TODO: Fix this
    return new Date('1995-08-24');
  }

  public getCalculateUsedSpace(): number {
    return this.totalSpace - this.freeSpace;
  }
}
