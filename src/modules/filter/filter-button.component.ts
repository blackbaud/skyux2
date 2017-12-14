import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SkyMediaBreakpoints, SkyMediaQueryService } from '../media-queries';

@Component({
  selector: 'sky-filter-button',
  styleUrls: ['./filter-button.component.scss'],
  templateUrl: './filter-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyFilterButtonComponent implements OnInit, OnDestroy {
  @Input()
  public active: boolean = false;
  @Input()
  public showButtonText: boolean = false;

  @Output()
  public filterButtonClick: EventEmitter<any> = new EventEmitter();

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

  public filterButtonOnClick() {
    this.filterButtonClick.emit(undefined);
  }

}
