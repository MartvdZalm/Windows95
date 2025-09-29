export interface FileAssociation {
  type: string;
  icon: string;
}

export const FILE_ASSOCIATIONS: Record<string, FileAssociation> = {
  txt: {
    type: 'Text Document',
    icon: 'images/windows95/extensions/txt.ico',
  },
  exe: {
    type: 'Application',
    icon: 'images/windows95/extensions/exe.ico',
  },
  sys: {
    type: 'System File',
    icon: 'images/windows95/extensions/sys.ico',
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
