import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { SkyVerticalTabsetService } from './vertical-tabset.service';

@Component({
  selector: 'sky-vertical-tab',
  templateUrl: './vertical-tab.component.html',
  styleUrls: ['./vertical-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyVerticalTabComponent implements OnInit {

  @Input()
  public active: boolean = false;

  @Input()
  public tabHeading: string;

  @Input()
  public tabHeaderCount: number;

  @Input()
  public disabled: boolean = false;

  public index: number;

  @ViewChild('tabContentWrapper')
  public tabContent: ElementRef;

  constructor(
    private tabsetService: SkyVerticalTabsetService,
    private changeRef: ChangeDetectorRef) {}

  public ngOnInit() {
    this.tabsetService.addTab(this);
  }

  public tabIndex() {
    if (!this.disabled) {
      return 0;
    } else {
      return -1;
    }
  }

  public activateTabFromClick() {
    this.activateTab();
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
