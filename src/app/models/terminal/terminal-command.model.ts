export interface TerminalCommand {
  name: string;
  description: string;
  execute: (args: string[]) => string | void;
}
