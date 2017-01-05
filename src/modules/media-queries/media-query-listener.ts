import { SkyMediaBreakpoints } from './media-breakpoints';
import { Subscription } from 'rxjs/Subscription';

export interface SkyMediaQueryListener {
  (args: SkyMediaBreakpoints): void;
}
