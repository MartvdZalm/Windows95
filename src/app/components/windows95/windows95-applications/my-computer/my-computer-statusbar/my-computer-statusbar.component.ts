import { Component, input } from '@angular/core';

@Component({
  selector: 'app-my-computer-statusbar',
  imports: [],
  templateUrl: './my-computer-statusbar.component.html',
  styleUrls: ['./my-computer-statusbar.component.scss'],
})
export class MyComputerStatusbarComponent {
  public selectedCount = input<number>(0);
  public totalCount = input<number>(0);
}
