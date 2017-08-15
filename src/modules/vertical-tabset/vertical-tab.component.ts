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

  @ViewChild('tabContentWrapper')
  public tabContent: ElementRef;

  constructor(
    private tabsetService: SkyVerticalTabsetService,
    private changeRef: ChangeDetectorRef) {}

  public ngOnInit() {
    this.tabsetService.addTab(this);
  }

  public activateTab() {
    this.active = true;
    this.tabsetService.activateTab(this);
  }

  public tabDeactivated() {
    this.changeRef.markForCheck();
  }
}
