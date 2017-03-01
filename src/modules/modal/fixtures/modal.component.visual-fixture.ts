import { Component, NgModule, ViewContainerRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyModule } from '../../../../src/core';

import { SkyModalService } from '../../../../src/core';
import { ModalDemoComponent } from './modal.visual.content';
import { ModalLargeDemoComponent } from './modal-large.visual.content';
import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './modal.component.visual-fixture.html'
})
class AppComponent {
  constructor(public viewContainerRef: ViewContainerRef, private modal: SkyModalService) { }

  public openModal() {

    this.modal.open(ModalDemoComponent, [
    ]);
  }

  public openLargeModal() {
    this.modal.open(ModalLargeDemoComponent, []);
  }
}

@NgModule({
  imports: [
    BrowserModule,
    SkyModule
  ],
  declarations: [
    AppComponent,
    ModalDemoComponent,
    ModalLargeDemoComponent
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ModalDemoComponent,
    ModalLargeDemoComponent
  ]
})
class AppModule { }

Bootstrapper.bootstrapModule(AppModule);
