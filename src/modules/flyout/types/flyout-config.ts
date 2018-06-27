import {
  SkyFlyoutPermalink
} from './flyout-permalink';

export interface SkyFlyoutConfig {
  ariaDescribedBy?: string;
  ariaLabelledBy?: string;
  ariaRole?: string;
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  permalink?: SkyFlyoutPermalink;
  providers?: any[];
}
