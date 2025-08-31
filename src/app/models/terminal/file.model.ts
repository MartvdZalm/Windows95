import { FILE_ASSOCIATIONS } from './file-associations';

export interface FileAttributes {
  hidden?: boolean;
  readOnly?: boolean;
  system?: boolean;
  archive?: boolean;
}

export class File {
  private name = '';
  private extension = '';
  private location = '';
  private size = 0;
  private icon = '';
  private dateCreated: Date = new Date();
  private dateModified: Date = new Date();
  private dateAccessed: Date = new Date();
  private attributes: FileAttributes = {};

  public setName(name: string): this {
    this.name = name;
    const parts = name.split('.');
    if (parts.length > 1) {
      this.extension = parts.pop()!.toLowerCase();
    }

    const assoc =
      FILE_ASSOCIATIONS[this.extension] || FILE_ASSOCIATIONS['default'];
    if (!this.icon) {
      this.icon = assoc.icon;
    }
    return this;
  }

  public getName(): string {
    return this.name;
  }

  public setExtension(extension: string): this {
    this.extension = extension;
    return this;
  }

  public getExtension(): string {
    return this.extension;
  }

  public setLocation(location: string): this {
    this.location = location;
    return this;
  }

  public getLocation(): string {
    return this.location;
  }

  public setSize(size: number): this {
    this.size = size;
    return this;
  }

  public getSize(): number {
    return this.size;
  }

  public setIcon(icon: string): this {
    this.icon = icon;
    return this;
  }

  public getIcon(): string {
    return this.icon;
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

  public setAttributes(attributes: FileAttributes): this {
    this.attributes = { ...this.attributes, ...attributes };
    return this;
  }

  public getAttributes(): FileAttributes {
    return this.attributes;
  }

  public getFileInfo(): {
    name: string;
    extension: string;
    location: string;
    size: number;
    dateCreated: Date;
    dateModified: Date;
    dateAccessed: Date;
    attributes: FileAttributes;
  } {
    return {
      name: this.name,
      extension: this.extension,
      location: this.location,
      size: this.size,
      dateCreated: this.dateCreated,
      dateModified: this.dateModified,
      dateAccessed: this.dateAccessed,
      attributes: this.attributes,
    };
  }
}
