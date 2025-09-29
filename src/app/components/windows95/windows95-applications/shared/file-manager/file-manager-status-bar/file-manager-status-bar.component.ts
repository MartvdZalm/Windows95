import { Component, input } from '@angular/core';

@Component({
  selector: 'app-file-manager-status-bar',
  imports: [],
  templateUrl: './file-manager-status-bar.component.html',
  styleUrls: ['./file-manager-status-bar.component.scss'],
})
export class FileManagerStatusbarComponent {
  public selectedCount = input<number>(0);
  public totalCount = input<number>(0);
}
