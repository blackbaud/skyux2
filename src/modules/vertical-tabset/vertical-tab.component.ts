import { Component, Input, OnInit } from '@angular/core';

import { SkyVerticalTabsetService } from './vertical-tabset.service';

@Component({
  selector: 'sky-vertical-tab',
  templateUrl: './vertical-tab.component.html',
  styleUrls: ['./vertical-tab.component.scss']
})
export class SkyVerticalTabComponent implements OnInit {

  @Input()
  public tabHeading: string;

  public active: boolean;

  public index: number;

  constructor(private tabsetService: SkyVerticalTabsetService) {}

  public ngOnInit() {
    this.tabsetService.addTab(this);
  }

  public activateTab() {
    this.active = true;
    this.tabsetService.activateTab(this);
  }
}
