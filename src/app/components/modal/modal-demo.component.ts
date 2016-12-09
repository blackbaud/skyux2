import { Component } from '@angular/core';

import { SkyModalService } from '../../../core';

import { SkyModalDemoContext } from './modal-demo-context';
import { SkyModalDemoFormComponent } from './modal-demo-form.component';

@Component({
  selector: 'sky-modal-demo',
  templateUrl: './modal-demo.component.html'
})
export class SkyModalDemoComponent {
  constructor(private modal: SkyModalService) { }

  public openModal() {
    let context = new SkyModalDemoContext();
    context.valueA = 'Hello';

    let modalInstance = this.modal.open(SkyModalDemoFormComponent, [
      {
        provide: SkyModalDemoContext,
        useValue: context
      }
    ]);

    modalInstance.instanceClose.subscribe((modalResult: any) => {
      console.log('Result was: ', modalResult);
    });
  }
}
