import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import { SkyModalInstance } from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'sky-demo-wizard-form',
  templateUrl: './wizard-demo-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyWizardDemoFormComponent {
  public title = 'Wizard example';
  public requiredValue1: string;
  public requiredValue2: boolean;

  public get step2Disabled(): boolean {
    return !this.requiredValue1;
  }

  public get step3Disabled(): boolean {
    return this.step2Disabled || !this.requiredValue2;
  }

  constructor(
    public instance: SkyModalInstance
  ) { }

  public validateStep1() {
    return true;
  }
}
