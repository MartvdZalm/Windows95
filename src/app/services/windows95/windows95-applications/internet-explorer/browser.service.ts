import { Injectable, Type, inject, signal } from '@angular/core';
import { WebsiteRegistryService } from './website-registry.service';
import { SearchResultsComponent } from '../../../../components/windows95/windows95-applications/internet-explorer/search-results/search-results.component';
import { SearchResult } from '../../../../models/windows95/windows95-applications/internet-explorer/search-result.model';

@Injectable({ providedIn: 'root' })
export class BrowserService {
  private websiteRegistryService = inject(WebsiteRegistryService);
  public currentUrl = signal<string>('home');
  public currentComponent = signal<Type<any> | null>(null);

  public navigate(url: string): void {
    if (!url) {
      return;
    }
    
    const normalizedUrl = url === 'home' ? 'home' : this.ensureHttp(url);
    this.currentUrl.set(normalizedUrl);
    
    const component = this.websiteRegistryService.getComponentForUrl(normalizedUrl);
    this.currentComponent.set(component);
  }

  public navigateToSearchResults(results: SearchResult[]): void {
    this.currentUrl.set('search');
    this.currentComponent.set(SearchResultsComponent);
  }

  private ensureHttp(url: string): string {
    return url.startsWith('http') ? url : `http://${url}`;
  }
}
