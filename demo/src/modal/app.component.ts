import { Component } from '@angular/core';

import { SkyModalService } from '../../../src/core';
import { ModalDemoComponent } from './modal-demo.component';
import { Bootstrapper } from '../../bootstrapper';

@Component({
  selector: 'sky-demo-app',
  template: require('./app.component.html'),
  providers: [SkyModalService]
})
class AppComponent {
  constructor(private modal: SkyModalService) { }

  public openModal() {
    this.modal.open(ModalDemoComponent);
  }
}

Bootstrapper.bootstrap(AppComponent);
