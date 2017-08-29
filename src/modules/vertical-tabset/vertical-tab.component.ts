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
  public tabHeading: string;

  public active: boolean = false;

  public index: number;

  public outline: boolean = false;

  @ViewChild('tabContentWrapper')
  public tabContent: ElementRef;

  constructor(
    private tabsetService: SkyVerticalTabsetService,
    private changeRef: ChangeDetectorRef) {}

  public ngOnInit() {
    this.tabsetService.addTab(this);
  }

  public activateTabFromClick() {
    this.outline = false;
    this.activateTab();
  }

  public activateTab() {
    this.active = true;
    this.tabsetService.activateTab(this);

    this.changeRef.markForCheck();
  }

  public tabDeactivated() {
    this.outline = false;
    this.changeRef.markForCheck();
  }

  public tabPress(event: KeyboardEvent) {
    // tabbed
    if (event.which === 9) {
      this.outline = true;
      this.changeRef.markForCheck();
    }
  }
}
