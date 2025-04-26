import { Component, HostListener, output } from '@angular/core';

@Component({
  selector: 'app-terminal-input',
  imports: [],
  templateUrl: './terminal-input.component.html',
  styleUrl: './terminal-input.component.scss'
})
export class TerminalInputComponent {
  public commandEntered = output<string>();
  inputText = '';
  showCursor = true;
  promptPrefix = 'C:\\> ';

  private cursorInterval = setInterval(() => {
    this.showCursor = !this.showCursor;
  }, 500);

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    event.preventDefault();

    if (event.key === 'Enter') {
      this.commandEntered.emit(this.inputText);
      this.inputText = '';
    } else if (event.key === 'Backspace') {
      this.inputText = this.inputText.slice(0, -1);
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
      this.inputText += event.key;
    }
  }

  ngOnDestroy() {
    clearInterval(this.cursorInterval);
  }
}
