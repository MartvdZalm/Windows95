export interface CommandResult {
  output: string;
  newDir?: string;
}

export interface TerminalCommand {
  name: string;
  description: string;
  execute: (
    args: string[],
    currentDir: string
  ) => CommandResult | Promise<CommandResult>;
}
