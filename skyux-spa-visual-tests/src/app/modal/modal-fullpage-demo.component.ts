import { Component, OnInit } from '@angular/core';

import { SkyModalService } from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'sky-test-cmp-modal-fullpage',
  templateUrl: './modal-fullpage-demo.component.html',
  providers: [SkyModalService]
})
export class ModalFullPageDemoComponent implements OnInit {
  public title = 'Hello world';

  constructor(private modalService: SkyModalService) { }

  public ngOnInit() {
    console.log('init happened');
  }
}
