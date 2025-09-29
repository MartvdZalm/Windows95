import { Type } from '@angular/core';
import { WindowType } from './window-type.model';

export interface WindowDefinition {
  id: string;
  title: string;
  icon: string;
  component: Type<any>;
  type: WindowType;
  defaultWidth: number;
  defaultHeight: number;
}
