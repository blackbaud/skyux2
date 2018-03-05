import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { SkyVerticalTabsetService } from './vertical-tabset.service';

@Component({
  selector: 'sky-vertical-tab',
  templateUrl: './vertical-tab.component.html',
  styleUrls: ['./vertical-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyVerticalTabComponent implements OnInit, OnDestroy {
  @Input()
  public active: boolean = false;

  @Input()
  public tabHeading: string;

  @Input()
  public tabHeaderCount: number;

  @Input()
  public disabled: boolean = false;

  @Input()
  public get showTabRightArrow() {
    return this._showTabRightArrow && this.tabsetService.isMobile();
  }

  public set showTabRightArrow(value: boolean) {
    this._showTabRightArrow = value;
  }

  public index: number;

  @ViewChild('tabContentWrapper')
  public tabContent: ElementRef;

  private ngUnsubscribe = new Subject();
  private _showTabRightArrow: boolean = false;

  constructor(
    private tabsetService: SkyVerticalTabsetService,
    private changeRef: ChangeDetectorRef
  ) { }

  public ngOnInit() {
    this.tabsetService.switchingMobile
      .takeUntil(this.ngUnsubscribe)
      .subscribe((mobile: boolean) => this.changeRef.detectChanges());

    this.tabsetService.addTab(this);
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public tabIndex() {
    if (!this.disabled) {
      return 0;
    } else {
      return -1;
    }
  }

  public activateTab() {
    if (!this.disabled) {
      this.active = true;
      this.tabsetService.activateTab(this);

      this.changeRef.markForCheck();
    }
  }

  public tabDeactivated() {
    this.changeRef.detectChanges();
  }
}
