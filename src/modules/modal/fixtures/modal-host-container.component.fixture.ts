import { Component, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'sky-modal-host-test-cmp',
  template: '<div></div>'
})
export class ModalHostContainerTestComponent {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
