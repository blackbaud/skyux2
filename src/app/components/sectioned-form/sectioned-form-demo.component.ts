import { Component } from '@angular/core';
import { SkyModalDemoContext } from './../modal/modal-demo-context';
import { SkyModalService, SkyModalCloseArgs } from '../../../core';
import { SkySectionedModalFormDemoComponent } from './sectioned-modal-form-demo.component';

@Component({
  selector: 'sky-sectioned-form-demo',
  templateUrl: './sectioned-form-demo.component.html'
})
export class SkySectionedFormDemoComponent {

  constructor(private modal: SkyModalService) { }

  public openModal() {
    let modalInstance = this.modal.open(SkySectionedModalFormDemoComponent);

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      console.log('Modal closed with reason: ' + result.reason + ' and data: ' + result.data);
    });
  }
}
