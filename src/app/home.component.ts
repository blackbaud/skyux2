import { Component, OnInit } from '@angular/core';

import { SkyDemoTitleService } from './shared/title.service';

@Component({
  selector: 'sky-demo-home',
  templateUrl: './home.component.html'
})
export class SkyDemoHomeComponent implements OnInit {
  constructor(private titleService: SkyDemoTitleService) { }

  public ngOnInit() {
    this.titleService.setTitle();
  }
}
