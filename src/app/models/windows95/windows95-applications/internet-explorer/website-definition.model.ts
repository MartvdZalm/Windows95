import { Type } from '@angular/core';

export interface WebsiteDefinition {
  id: string;
  title: string;
  icon: string;
  component: Type<any>;
  defaultUrl: string;
  matches: (url: string) => boolean;
}
