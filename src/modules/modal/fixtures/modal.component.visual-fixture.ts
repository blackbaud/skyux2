import { Component, NgModule, ViewContainerRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyModalModule, SkyModalService } from '../';

import { ModalDemoComponent } from './modal.visual.content';
import { ModalLargeDemoComponent } from './modal-large.visual.content';
import { ModalFullPageDemoComponent } from './modal-fullpage.visual.content';
import { Bootstrapper } from '../../../../visual/bootstrapper';
import { ModalContentDemoComponent } from './modal-content.visual.content';

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

  public openContentModal() {
    this.modal.open(ModalContentDemoComponent);
  }

  public openSmallSizeModal() {
    this.modal.open(
      ModalDemoComponent, { 'providers': [], 'fullPage': false , 'size': 'small'});
  }

  public openMediumSizeModal() {
    this.modal.open(
      ModalDemoComponent, { 'providers': [], 'fullPage': false , 'size': 'medium'});
  }

  public openLargeSizeModal() {
    this.modal.open(
      ModalDemoComponent, { 'providers': [], 'fullPage': false , 'size': 'large'});
  }
}

@NgModule({
  imports: [
    BrowserModule,
    SkyModalModule
  ],
  declarations: [
    AppComponent,
    ModalDemoComponent,
    ModalLargeDemoComponent,
    ModalFullPageDemoComponent,
    ModalContentDemoComponent
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ModalDemoComponent,
    ModalLargeDemoComponent,
    ModalFullPageDemoComponent,
    ModalContentDemoComponent
  ]
})
class AppModule { }

Bootstrapper.bootstrapModule(AppModule);
