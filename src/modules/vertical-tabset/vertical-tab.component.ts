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

  private _showTabRightArrow: boolean = false;
  private _mobileSubscription = new Subject();

  constructor(
    private tabsetService: SkyVerticalTabsetService,
    private changeRef: ChangeDetectorRef) {}

  public ngOnInit() {
    this.tabsetService.switchingMobile
      .subscribe((mobile: boolean) => this.changeRef.detectChanges());

    this.tabsetService.addTab(this);
  }

  public ngOnDestroy() {
    this._mobileSubscription.unsubscribe();
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
