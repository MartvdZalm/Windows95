import { WindowDefinition } from './window-definition.model';

export interface WindowInstance {
  id: string;
  instanceId: string;
  definition: WindowDefinition;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
}
