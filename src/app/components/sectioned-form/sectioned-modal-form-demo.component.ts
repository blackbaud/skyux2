import { Component } from '@angular/core';
import { SkyModalInstance } from '../../../core';

@Component({
  selector: 'sky-sectioned-modal-form-demo',
  templateUrl: './sectioned-modal-form-demo.component.html'
})
export class SkySectionedModalFormDemoComponent {
  constructor(public instance: SkyModalInstance) { }
}
