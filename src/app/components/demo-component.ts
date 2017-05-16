export interface SkyDemoComponent {
  name: string;
  icon: string;
  summary: string;
  url?: string;
  path?: string[];
  getCodeFiles?: () => any[];
}
