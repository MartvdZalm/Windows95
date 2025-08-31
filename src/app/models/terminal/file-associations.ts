export interface FileAssociation {
  type: string;
  icon: string;
}

export const FILE_ASSOCIATIONS: Record<string, FileAssociation> = {
  txt: {
    type: 'Text Document',
    icon: 'images/windows95/extensions/txt.ico',
  },
  ini: {
    type: 'Configuration Settings',
    icon: 'images/windows95/extensions/ini.ico',
  },
  exe: {
    type: 'Application',
    icon: 'images/windows95/extensions/exe.ico',
  },
  dll: {
    type: 'Application Extension',
    icon: 'images/windows95/extensions/dll.ico',
  },
  sys: {
    type: 'System File',
    icon: 'images/windows95/extensions/sys.ico',
  },
  bat: {
    type: 'MS-DOS Batch File',
    icon: 'images/windows95/extensions/bat.ico',
  },
  com: {
    type: 'MS-DOS Application',
    icon: 'images/windows95/extensions/com.ico',
  },
  ttf: {
    type: 'TrueType Font',
    icon: 'images/windows95/extensions/font.ico',
  },
  default: {
    type: 'File',
    icon: 'images/windows95/extensions/file.ico',
  },
};
