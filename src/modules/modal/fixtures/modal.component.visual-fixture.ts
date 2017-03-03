import { Component, NgModule, ViewContainerRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyModule } from '../../../../src/core';

import { SkyModalService } from '../../../../src/core';
import { ModalDemoComponent } from './modal.visual.content';
import { ModalLargeDemoComponent } from './modal-large.visual.content';
import { ModalFullPageDemoComponent } from './modal-fullpage.visual.content';
import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './modal.component.visual-fixture.html'
})
class AppComponent {
  constructor(public viewContainerRef: ViewContainerRef, private modal: SkyModalService) { }

  public openModal() {

    this.modal.open(ModalDemoComponent, { 'providers': [] });
  }

  public openLargeModal() {
    this.modal.open(ModalLargeDemoComponent, { 'providers': [] });
  }
  public openFullScreenModal() {
    this.modal.open(ModalFullPageDemoComponent, { 'providers': [], 'fullPage': true });
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
    ModalLargeDemoComponent,
    ModalFullPageDemoComponent
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ModalDemoComponent,
    ModalLargeDemoComponent,
    ModalFullPageDemoComponent
  ]
})
class AppModule { }

Bootstrapper.bootstrapModule(AppModule);
