import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';

import { SkyVerticalTabsetService } from './vertical-tabset.service';

@Component({
  selector: 'sky-vertical-tab',
  templateUrl: './vertical-tab.component.html',
  styleUrls: ['./vertical-tab.component.scss']
})
export class SkyVerticalTabComponent implements OnInit {

  @Input()
  public tabHeading: string;

  public active: boolean = false;

  public index: number;

  @ViewChild('tabContentWrapper')
  public tabContent: ElementRef;

  constructor(private tabsetService: SkyVerticalTabsetService) {}

  public ngOnInit() {
    this.tabsetService.addTab(this);
  }

  public activateTab() {
    this.active = true;
    this.tabsetService.activateTab(this);
  }
}
