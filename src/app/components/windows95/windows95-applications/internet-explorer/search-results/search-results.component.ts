import { Component, inject, input } from '@angular/core';
import { SearchResult } from '../../../../../models/windows95/windows95-applications/internet-explorer/search-result.model';
import { BrowserService } from '../../../../../services/windows95/windows95-applications/internet-explorer/browser.service';

@Component({
  selector: 'app-search-results',
  imports: [],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent {
  private browserService = inject(BrowserService);
  public searchResults = input.required<SearchResult[]>();

  public setWebsite(url: string): void {
    this.browserService.navigate(url);
  }
}
