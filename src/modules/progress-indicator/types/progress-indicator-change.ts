import { SkyProgressIndicatorItemComponent } from '../progress-indicator-item.component';

export interface SkyProgressIndicatorChange {
  activeIndex?: number;
  items?: SkyProgressIndicatorItemComponent[];
  activeItem?: SkyProgressIndicatorItemComponent;
}
