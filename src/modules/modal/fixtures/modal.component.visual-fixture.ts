import { Component, NgModule, ViewContainerRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyModule } from '../../../../src/core';

import { SkyModalService } from '../../../../src/core';
import { ModalDemoComponent } from './modal.visual.content';
import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  template: require('./modal.component.visual-fixture.html')
})
class AppComponent {
  constructor(public viewContainerRef: ViewContainerRef, private modal: SkyModalService) { }

  public openModal() {

    this.modal.open(ModalDemoComponent, [
    ]);
  }
}

@NgModule({
  imports: [
    BrowserModule,
    SkyModule
  ],
  declarations: [
    AppComponent,
    ModalDemoComponent
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ModalDemoComponent
  ]
})
class AppModule { }

Bootstrapper.bootstrapModule(AppModule);
