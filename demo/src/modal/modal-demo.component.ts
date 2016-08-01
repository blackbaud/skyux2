import { Component, OnInit } from '@angular/core';

import { SkyModalComponent, SkyModalService } from '../../../src/core';

@Component({
  moduleId: module.id,
  selector: 'sky-test-cmp-modal',
  template: require('./modal-demo.component.html'),
  directives: [SkyModalComponent],
  providers: [SkyModalService]
})
export class ModalDemoComponent implements OnInit {
  public title = 'Hello world';

  constructor(private modalService: SkyModalService) { }

  public ngOnInit() {
    console.log('init happened');
  }

  public openAnother() {
    this.modalService.open(ModalDemoComponent);
  }
}
