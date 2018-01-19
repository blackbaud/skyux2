import { SkyPopoverPlacement } from './popover-placement';
import { SkyPopoverAlignment } from './popover-alignment';

export interface SkyPopoverPositionChange {
  alignment?: SkyPopoverAlignment;
  placement?: SkyPopoverPlacement;
}
