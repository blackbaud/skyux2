import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  OnInit,
  OnDestroy
} from '@angular/core';

import {
  SkySortService
} from './sort.service';
import { SkyMediaQueryService } from '../media-queries';
import { SkyMediaBreakpoints } from '../media-queries';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sky-sort',
  styleUrls: ['./sort.component.scss'],
  templateUrl: './sort.component.html',
  providers: [
    SkySortService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkySortComponent implements OnInit, OnDestroy {

  @Input() public showButtonText: boolean = false;
  public currentBreakpoint: SkyMediaBreakpoints;

  private mediaQuerySubscription: Subscription;

  constructor(private mediaQueries: SkyMediaQueryService, private changeRef: ChangeDetectorRef) {}

  public ngOnInit() {
    this.mediaQuerySubscription = this.mediaQueries.subscribe((newBreakpoint: SkyMediaBreakpoints) => {
      this.currentBreakpoint = newBreakpoint;
      this.changeRef.detectChanges();
    });
  }

  public ngOnDestroy() {
    if (this.mediaQuerySubscription) {
      this.mediaQuerySubscription.unsubscribe();
    }
  }

  public isSmallScreen() {
    return this.currentBreakpoint === SkyMediaBreakpoints.xs;
  }

}
