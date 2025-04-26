export interface TerminalCommand {
  name: string;
  description: string;
  execute: (args: string[], currentDir: string) => string | void;
}
