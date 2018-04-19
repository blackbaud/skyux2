import { Component } from '@angular/core';
import {
  SkyToastService,
  SkyToastType
} from '../../core';
import { SkyToastCustomDemoComponent } from './toast-custom-demo.component';

@Component({
  selector: 'sky-toast-demo',
  templateUrl: './toast-demo.component.html'
})
export class SkyToastDemoComponent {
  public typeTranslator = SkyToastType;
  public types: SkyToastType[] = [SkyToastType.Info, SkyToastType.Success, SkyToastType.Warning, SkyToastType.Danger];
  public selectedType: SkyToastType = SkyToastType.Info;

  constructor(private toastSvc: SkyToastService) { }

  public openMessage() {
    this.toastSvc.openMessage('This is a ' + SkyToastType[this.selectedType] + ' toast.', {toastType: this.selectedType});
  }

  public openTemplatedMessage() {
    this.toastSvc.openTemplatedMessage(SkyToastCustomDemoComponent, {toastType: this.selectedType});
  }
}
