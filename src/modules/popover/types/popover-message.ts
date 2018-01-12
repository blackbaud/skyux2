import {
  ElementRef
} from '@angular/core';

import { SkyPopoverAlignment } from './popover-alignment';
import { SkyPopoverMessageType } from './popover-message-type';
import { SkyPopoverPlacement } from './popover-placement';

export interface SkyPopoverMessage {
  type: SkyPopoverMessageType;
  elementRef?: ElementRef;
  alignment?: SkyPopoverAlignment;
  placement?: SkyPopoverPlacement;
}
