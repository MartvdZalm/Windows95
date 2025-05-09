import { Injectable } from '@angular/core';
import { File } from '../../models/terminal/file.model';
import { Folder } from '../../models/terminal/folder.model';

@Injectable({
  providedIn: 'root',
})
export class FileSystemService {
  private fileSystem: Folder = new Folder().setName('C:').setLocation('C:/');

  public constructor() {
    this.initializeFileSystem();
  }

  private initializeFileSystem(): void {
    const autoexec = new File()
      .setName('AUTOEXEC.BAT')
      .setAttributes({ hidden: true })
      .setSize(1024);
    const configSys = new File()
      .setName('CONFIG.SYS')
      .setAttributes({ hidden: true })
      .setSize(2048);
    const commandCom = new File().setName('COMMAND.COM').setSize(5120);
    const ioSys = new File()
      .setName('IO.SYS')
      .setAttributes({ hidden: true })
      .setSize(4096);
    const msDosSys = new File()
      .setName('MSDOS.SYS')
      .setAttributes({ hidden: true })
      .setSize(4096);

    const dosFolder = new Folder().setName('DOS').setLocation('C:/DOS');
    dosFolder.addFile(new File().setName('EDIT.COM').setSize(1024));
    dosFolder.addFile(new File().setName('FORMAT.COM').setSize(1024));
    dosFolder.addFile(new File().setName('FDISK.EXE').setSize(1024));
    dosFolder.addFile(new File().setName('XCOPY.EXE').setSize(1024));
    dosFolder.addFile(new File().setName('MORE.COM').setSize(1024));

    const windowsFolder = new Folder()
      .setName('WINDOWS')
      .setLocation('C:/WINDOWS');
    const systemFolder = new Folder()
      .setName('SYSTEM')
      .setLocation('C:/WINDOWS/SYSTEM');
    systemFolder.addFile(new File().setName('KERNEL32.DLL').setSize(2048));
    systemFolder.addFile(new File().setName('USER.EXE').setSize(2048));
    systemFolder.addFile(new File().setName('GDI.EXE').setSize(2048));
    systemFolder.addFile(new File().setName('SHELL32.DLL').setSize(2048));
    systemFolder.addFile(new File().setName('WIN.INI').setSize(512));
    systemFolder.addFile(new File().setName('SYSTEM.INI').setSize(512));
    windowsFolder.addSubfolder(systemFolder);

    const programsFolder = new Folder()
      .setName('PROGRAMS')
      .setLocation('C:/WINDOWS/PROGRAMS');
    programsFolder.addFile(new File().setName('NOTEPAD.EXE').setSize(1024));
    programsFolder.addFile(new File().setName('CALC.EXE').setSize(1024));
    programsFolder.addFile(new File().setName('WRITE.EXE').setSize(1024));
    programsFolder.addFile(new File().setName('PAINT.EXE').setSize(1024));
    programsFolder.addFile(new File().setName('SOL.EXE').setSize(1024));
    programsFolder.addFile(new File().setName('WINMINE.EXE').setSize(1024));
    windowsFolder.addSubfolder(programsFolder);

    const fontsFolder = new Folder()
      .setName('FONTS')
      .setLocation('C:/WINDOWS/FONTS');
    fontsFolder.addFile(new File().setName('ARIAL.TTF').setSize(1024));
    fontsFolder.addFile(new File().setName('TIMES.TTF').setSize(1024));
    fontsFolder.addFile(new File().setName('COUR.TTF').setSize(1024));
    windowsFolder.addSubfolder(fontsFolder);

    const tempFolder = new Folder()
      .setName('TEMP')
      .setLocation('C:/WINDOWS/TEMP');
    tempFolder.addFile(new File().setName('TEMP_FILE.TMP').setSize(512));
    windowsFolder.addSubfolder(tempFolder);

    const programsRoot = new Folder()
      .setName('PROGRAMS')
      .setLocation('C:/PROGRAMS');
    programsRoot.addFile(new File().setName('EXAMPLES.EXE').setSize(1024));

    const myDocumentsFolder = new Folder()
      .setName('MY DOCUMENTS')
      .setLocation('C:/MY DOCUMENTS');
    myDocumentsFolder.addFile(new File().setName('README.TXT').setSize(1024));

    this.fileSystem
      .addFile(autoexec)
      .addFile(configSys)
      .addFile(commandCom)
      .addFile(ioSys)
      .addFile(msDosSys)
      .addSubfolder(dosFolder)
      .addSubfolder(windowsFolder)
      .addSubfolder(programsRoot)
      .addSubfolder(myDocumentsFolder);
  }

  public getFolderFromPath(path: string): Folder | null {
    const normalizedPath = path.replace(/\\/g, '/');
    const pathParts = normalizedPath.split('/').filter(Boolean);

    if (pathParts.length === 0) {
      return null;
    }

    let currentFolder = this.fileSystem;

    if (pathParts[0] === 'C:') {
      pathParts.shift();
    }

    for (const folder of pathParts) {
      const foundFolder = currentFolder.getSubFolder(folder);
      if (!foundFolder) {
        return null;
      }
      currentFolder = foundFolder;
    }

    return currentFolder;
  }

  public getFileFromPath(path: string): File | null {
    const normalizedPath = path.replace(/\\/g, '/');
    const pathParts = normalizedPath.split('/').filter(Boolean);

    if (pathParts.length === 0) {
      return null;
    }

    let currentFolder: Folder = this.fileSystem;

    if (pathParts[0].endsWith(':')) {
      if (pathParts[0] !== 'C:') {
        return null;
      }
      pathParts.shift();
    }

    for (let i = 0; i < pathParts.length - 1; i++) {
      const folderName = pathParts[i];
      const nextFolder = currentFolder.getSubFolder(folderName);
      if (!nextFolder) {
        return null;
      }
      currentFolder = nextFolder;
    }

    const fileName = pathParts[pathParts.length - 1];
    const file = currentFolder
      .getFiles()
      .find((f) => f.getName().toLowerCase() === fileName.toLowerCase());

    return file || null;
  }

  public getRootFolder(): Folder {
    return this.fileSystem;
  }
}
