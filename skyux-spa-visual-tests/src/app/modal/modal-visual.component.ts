import { Component } from '@angular/core';
import { SkyModalService } from '@blackbaud/skyux/dist/core';

import { ModalDemoComponent } from './modal-demo.component';
import { ModalLargeDemoComponent } from './modal-large-demo.component';
import { ModalFullPageDemoComponent } from './modal-fullpage-demo.component';
import { ModalContentDemoComponent } from './modal-content-demo.component';
import { ModalTiledDemoComponent } from './modal-tiled-demo.component';

@Component({
  selector: 'modal-visual',
  templateUrl: './modal-visual.component.html'
})
export class ModalVisualComponent {
  constructor(private modal: SkyModalService) { }

  public openModal() {
    this.modal.open(ModalDemoComponent, { 'providers': [] });
  }

  public openModalWithHelp() {
    this.modal.open(ModalDemoComponent, { 'providers': [], 'helpKey': 'demo-key.html' });
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

  public openTiledModal() {
    this.modal.open(ModalTiledDemoComponent, { 'providers': [] });
  }
}
