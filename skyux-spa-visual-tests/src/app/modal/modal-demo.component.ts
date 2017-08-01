import { Component, OnInit } from '@angular/core';

import { SkyModalService } from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'sky-test-cmp-modal',
  templateUrl: './modal-demo.component.html',
  providers: [SkyModalService]
})
export class ModalDemoComponent implements OnInit {
  public title = 'Hello world';

  public ngOnInit() {
    console.log('init happened');
  }
}
