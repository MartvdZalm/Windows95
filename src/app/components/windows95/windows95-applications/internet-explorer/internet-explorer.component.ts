import { Component, inject, signal, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchResultsComponent } from './search-results/search-results.component';
import { BrowserService } from '../../../../services/windows95/windows95-applications/internet-explorer/browser.service';
import { WebsiteRegistryService } from '../../../../services/windows95/windows95-applications/internet-explorer/website-registry.service';
import { NgComponentOutlet } from '@angular/common';
import { SearchResult } from '../../../../models/windows95/windows95-applications/internet-explorer/search-result.model';

@Component({
  selector: 'app-internet-explorer',
  imports: [FormsModule, NgComponentOutlet, SearchResultsComponent],
  templateUrl: './internet-explorer.component.html',
  styleUrl: './internet-explorer.component.scss',
})
export class InternetExplorerComponent {
  protected websiteRegistryService = inject(WebsiteRegistryService);
  protected browserService = inject(BrowserService);

  public addressInput = '';
  public searchInput = '';

  public search(): void {
    const results = this.websiteRegistryService.searchWebsites(
      this.searchInput
    );
    this.browserService.navigateToSearchResults(results);
  }

  public navigate(): void {
    this.browserService.navigate(this.addressInput);
  }

  public goHome(): void {
    this.browserService.navigate('home');
    this.addressInput = '';
  }
}
