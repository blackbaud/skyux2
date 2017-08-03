import { Component, Input, OnInit } from '@angular/core';

import { SkyVerticalTabsetService } from './vertical-tabset.service';

@Component({
  selector: 'sky-vertical-tabset-item',
  templateUrl: './vertical-tabset-item.component.html',
  styleUrls: ['./vertical-tabset-item.component.scss']
})
export class SkyVerticalTabsetItemComponent implements OnInit {

  @Input()
  public title: string;

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
