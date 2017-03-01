import { Component, OnInit } from '@angular/core';

import { SkyModalService } from '../../../../src/core';

@Component({
  selector: 'sky-test-cmp-modal-large',
  templateUrl: './modal-large.visual.content.html',
  providers: [SkyModalService]
})
export class ModalLargeDemoComponent implements OnInit {
  public title = 'Hello world';

  constructor(private modalService: SkyModalService) { }

  public ngOnInit() {
    console.log('init happened');
  }
}
