import { Component } from '@angular/core';

import { SkyModalService } from '@blackbaud/skyux/dist/core';

import { SkyWizardDemoFormComponent } from './wizard-demo-form.component';

@Component({
  selector: 'sky-wizard-demo',
  templateUrl: './wizard-demo.component.html'
})
export class SkyWizardDemoComponent {
  constructor(private modal: SkyModalService) { }

  public openWizard() {
    this.modal.open(SkyWizardDemoFormComponent);
  }
}
