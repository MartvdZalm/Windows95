import { Injectable, Type } from '@angular/core';
import { WebsiteDefinition } from '../../../../models/windows95/windows95-applications/internet-explorer/website-definition.model';
import { GeoCitiesWebsiteComponent } from '../../../../components/windows95/windows95-applications/internet-explorer/geo-cities-website/geo-cities-website.component';
import { SearchResult } from '../../../../models/windows95/windows95-applications/internet-explorer/search-result.model';
import { AboutMeComponent } from '../../../../components/windows95/windows95-applications/internet-explorer/about-me/about-me.component';

@Injectable({ providedIn: 'root' })
export class WebsiteRegistryService {
  private readonly websites = new Map<string, WebsiteDefinition>([
    [
      'geocities',
      {
        id: 'geocities',
        title: 'GeoCities',
        icon: 'assets/icons/geocities.png',
        component: GeoCitiesWebsiteComponent,
        defaultUrl: 'https://geocities.com',
        matches: (url: string) => url.includes('geocities.com'),
      },
    ],
    [
      'aboutme',
      {
        id: 'aboutme',
        title: 'About Me',
        icon: '',
        component: AboutMeComponent,
        defaultUrl: 'https://aboutme.com',
        matches: (url: string) => url.includes('aboutme.com'),
      },
    ],
  ]);

  public getComponentForUrl(url: string): Type<any> | null {
    for (const website of this.websites.values()) {
      if (website.matches(url)) {
        return website.component;
      }
    }
    return null;
  }

  public getWebsiteDefinition(id: string): WebsiteDefinition {
    const website = this.websites.get(id);
    if (!website) {
      throw new Error(`Website ${id} not registered`);
    }
    return website;
  }

  public getWebsiteByUrl(url: string): WebsiteDefinition | undefined {
    try {
      const hostname = new URL(url).hostname;
      for (const [_, website] of this.websites) {
        if (new URL(website.defaultUrl).hostname === hostname) {
          return website;
        }
      }
    } catch {
      return undefined;
    }
    return undefined;
  }

  public getAllWebsites(): WebsiteDefinition[] {
    return Array.from(this.websites.values());
  }

  public searchWebsites(query: string): SearchResult[] {
    if (!query.trim()) return [];

    const results: SearchResult[] = [];
    const normalizedQuery = query.toLowerCase();

    for (const [id, website] of this.websites) {
      const matchesTitle = website.title
        .toLowerCase()
        .includes(normalizedQuery);
      const matchesUrl = website.defaultUrl
        .toLowerCase()
        .includes(normalizedQuery);

      if (matchesTitle || matchesUrl) {
        results.push({
          websiteId: id,
          title: website.title,
          url: website.defaultUrl,
          icon: website.icon,
          matchScore: this.calculateMatchScore(website, normalizedQuery),
        });
      }
    }

    return results.sort((a, b) => b.matchScore - a.matchScore);
  }

  private calculateMatchScore(
    website: WebsiteDefinition,
    query: string
  ): number {
    let score = 0;

    if (website.title.toLowerCase().includes(query)) {
      score += 10;
      if (website.title.toLowerCase() === query) score += 5;
    }

    if (website.defaultUrl.toLowerCase().includes(query)) {
      score += 5;
      try {
        const domain = new URL(website.defaultUrl).hostname;
        if (domain === query || domain.includes(query)) score += 3;
      } catch {}
    }

    return score;
  }
}
