import {
  Component,
  OnDestroy
} from '@angular/core';

import {
  Subscription
} from 'rxjs/Subscription';

import {
  SkyMediaQueryService,
  SkyMediaBreakpoints
} from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'sky-media-query-demo',
  templateUrl: './media-query-demo.component.html'
})
export class SkyMediaQueryDemoComponent implements OnDestroy {
  public currentBreakpoint: string;

  private querySubscription: Subscription;

  constructor(private mediaQueries: SkyMediaQueryService) {
    this.querySubscription = this.mediaQueries.subscribe((newBreakpoint: SkyMediaBreakpoints) => {
      switch (newBreakpoint) {
        case SkyMediaBreakpoints.xs:
          this.currentBreakpoint = 'xs';
          break;
        case SkyMediaBreakpoints.sm:
          this.currentBreakpoint = 'sm';
          break;
        case SkyMediaBreakpoints.md:
          this.currentBreakpoint = 'md';
          break;
        case SkyMediaBreakpoints.lg:
          this.currentBreakpoint = 'lg';
          break;
        default:
          this.currentBreakpoint = 'unknown';
      }
    });
  }

  public ngOnDestroy() {
    /* istanbul ignore else */
    /* sanity check */
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}
