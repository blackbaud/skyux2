import {
  QueryList
} from '@angular/core';

import { SkyDropdownItemComponent } from '../dropdown-item.component';

export interface SkyDropdownMenuChange {
  activeIndex?: number;
  items?: QueryList<SkyDropdownItemComponent>;
  selectedItem?: SkyDropdownItemComponent;
}
