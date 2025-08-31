import { Injectable } from '@angular/core';
import { File } from '../../models/terminal/file.model';
import { Folder } from '../../models/terminal/folder.model';
import { Drive } from '../../models/terminal/drive.model';

@Injectable({
  providedIn: 'root',
})
export class FileSystemService {
  private drives: Drive[] = [];

  public constructor() {
    const cDrive = new Drive(
      'C:',
      'Local Disk (C:)',
      'local',
      10737418240,
      8589934592,
      'images/windows95/windows95-my-computer.ico'
    );

    this.initializeCDrive(cDrive);
    this.drives.push(cDrive);

    const dDrive = new Drive(
      'D:',
      'CD-ROM Drive (D:)',
      'removable',
      0,
      0,
      'images/windows95/windows95-cd-drive.ico'
    );
    this.drives.push(dDrive);
  }

  public getDrives(): Drive[] {
    return this.drives;
  }

  public getDrive(letter: string): Drive | null {
    return (
      this.drives.find(
        (d) => d.getLetter().toUpperCase() === letter.toUpperCase()
      ) || null
    );
  }

  public getFolderFromPath(path: string): Folder | null {
    const { drive, parts } = this.resolvePath(path);
    if (!drive) return null;

    let currentFolder = drive.getRootFolder();

    for (const folderName of parts) {
      const nextFolder = currentFolder.getSubFolder(folderName);
      if (!nextFolder) return null;
      currentFolder = nextFolder;
    }

    return currentFolder;
  }

  public getFileFromPath(path: string): File | null {
    const { drive, parts } = this.resolvePath(path);
    if (!drive || parts.length === 0) return null;

    let currentFolder = drive.getRootFolder();

    for (let i = 0; i < parts.length - 1; i++) {
      const folderName = parts[i];
      const nextFolder = currentFolder.getSubFolder(folderName);
      if (!nextFolder) return null;
      currentFolder = nextFolder;
    }

    const fileName = parts[parts.length - 1];
    return (
      currentFolder
        .getFiles()
        .find((f) => f.getName().toLowerCase() === fileName.toLowerCase()) ||
      null
    );
  }

  public getFileCount(path: string): number {
    const folder = this.getFolderFromPath(path);
    return folder ? folder.getFiles().length : 0;
  }

  public getFolderCount(path: string): number {
    const folder = this.getFolderFromPath(path);
    return folder ? folder.getSubFolders().length : 0;
  }

  public getTotalItemCount(path: string): number {
    const folder = this.getFolderFromPath(path);
    return folder
      ? folder.getFiles().length + folder.getSubFolders().length
      : 0;
  }

  public calculateFolderSize(path: string): number {
    const folder = this.getFolderFromPath(path);
    return folder ? folder.getSize() : 0;
  }

  private resolvePath(path: string): { drive: Drive | null; parts: string[] } {
    const normalizedPath = path.replace(/\\/g, '/');
    const pathParts = normalizedPath.split('/').filter(Boolean);

    if (pathParts.length === 0) {
      return { drive: null, parts: [] };
    }

    const driveLetter = pathParts[0].toUpperCase();
    const drive = this.getDrive(driveLetter);
    if (!drive) return { drive: null, parts: [] };

    const parts = pathParts.slice(1);
    return { drive, parts };
  }

  private initializeCDrive(cDrive: Drive): void {
    const root = cDrive.getRootFolder();

    root
      .addFile(
        new File()
          .setName('AUTOEXEC.BAT')
          .setAttributes({ hidden: true })
          .setSize(1024)
      )
      .addFile(
        new File()
          .setName('CONFIG.SYS')
          .setAttributes({ hidden: true })
          .setSize(2048)
      )
      .addFile(new File().setName('COMMAND.COM').setSize(5120))
      .addFile(
        new File()
          .setName('IO.SYS')
          .setAttributes({ hidden: true })
          .setSize(4096)
      )
      .addFile(
        new File()
          .setName('MSDOS.SYS')
          .setAttributes({ hidden: true })
          .setSize(4096)
      );

    const dosFolder = new Folder().setName('Dos').setLocation('C:\\Dos');
    dosFolder
      .addFile(new File().setName('EDIT.COM').setSize(1024))
      .addFile(new File().setName('FORMAT.COM').setSize(1024))
      .addFile(new File().setName('FDISK.EXE').setSize(1024))
      .addFile(new File().setName('XCOPY.EXE').setSize(1024))
      .addFile(new File().setName('MORE.COM').setSize(1024));
    root.addSubfolder(dosFolder);

    const windowsFolder = new Folder()
      .setName('Windows')
      .setLocation('C:\\Windows');
    const systemFolder = new Folder()
      .setName('System')
      .setLocation('C:\\Windows\\System');
    systemFolder
      .addFile(new File().setName('KERNEL32.DLL').setSize(2048))
      .addFile(new File().setName('USER.EXE').setSize(2048))
      .addFile(new File().setName('GDI.EXE').setSize(2048))
      .addFile(new File().setName('SHELL32.DLL').setSize(2048))
      .addFile(new File().setName('WIN.INI').setSize(512))
      .addFile(new File().setName('SYSTEM.INI').setSize(512));
    windowsFolder.addSubfolder(systemFolder);

    const programsFolder = new Folder()
      .setName('Programs')
      .setLocation('C:\\Windows\\Programs');
    programsFolder
      .addFile(new File().setName('NOTEPAD.EXE').setSize(1024))
      .addFile(new File().setName('CALC.EXE').setSize(1024))
      .addFile(new File().setName('WRITE.EXE').setSize(1024))
      .addFile(new File().setName('PAINT.EXE').setSize(1024))
      .addFile(new File().setName('SOL.EXE').setSize(1024))
      .addFile(new File().setName('WINMINE.EXE').setSize(1024));
    windowsFolder.addSubfolder(programsFolder);

    const fontsFolder = new Folder()
      .setName('Fonts')
      .setLocation('C:\\Windows\\Fonts');
    fontsFolder
      .addFile(new File().setName('ARIAL.TTF').setSize(1024))
      .addFile(new File().setName('TIMES.TTF').setSize(1024))
      .addFile(new File().setName('COUR.TTF').setSize(1024));
    windowsFolder.addSubfolder(fontsFolder);

    const tempFolder = new Folder()
      .setName('Temp')
      .setLocation('C:\\Windows\\Temp');
    tempFolder.addFile(new File().setName('TEMP_FILE.TMP').setSize(512));
    windowsFolder.addSubfolder(tempFolder);

    root.addSubfolder(windowsFolder);

    const programsRoot = new Folder()
      .setName('Programs')
      .setLocation('C:\\Programs');
    programsRoot.addFile(new File().setName('EXAMPLES.EXE').setSize(1024));
    root.addSubfolder(programsRoot);

    const documentsFolder = new Folder()
      .setName('Documents')
      .setLocation('C:\\Documents');
    documentsFolder.addFile(
      new File()
        .setName('README.TXT')
        .setSize(1024)
        .setAttributes({ hidden: false })
    );
    root.addSubfolder(documentsFolder);
  }
}
