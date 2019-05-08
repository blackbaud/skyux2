import {
  Component
} from '@angular/core';

import {
  SkyModalService
} from '@skyux/modals';

import {
  SkyWizardDemoModalComponent
} from './wizard-demo-modal.component';

@Component({
  selector: 'sky-wizard-demo',
  templateUrl: './wizard-demo.component.html'
})
export class SkyWizardDemoComponent {
  constructor(
    private modal: SkyModalService
  ) { }

  public openWizard(): void {
    this.modal.open(SkyWizardDemoModalComponent);
  }

}
