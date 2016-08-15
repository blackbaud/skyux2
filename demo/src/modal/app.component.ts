import { Component, NgModule, ViewContainerRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyModule } from '../../../src/core';

import { SkyModalService } from '../../../src/core';
// import { SkyModalHostComponent } from '../../../src/modules/modal/modal-host.component';
import { ModalDemoComponent } from './modal-demo.component';
import { ModalDemoValues } from './modal-values';
import { Bootstrapper } from '../../bootstrapper';

@Component({
  selector: 'sky-demo-app',
  template: require('./app.component.html')
})
class AppComponent {
  constructor(public viewContainerRef: ViewContainerRef, private modal: SkyModalService) { }

  public openModal() {
    let values = new ModalDemoValues();

    this.modal.open(ModalDemoComponent, [
      {
        provide: ModalDemoValues,
        useValue: values
      }
    ]);
  }
}

@NgModule({
  imports: [
    BrowserModule,
    SkyModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
class AppModule { }

Bootstrapper.bootstrapModule(AppModule);
