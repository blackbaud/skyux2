import {
  Component
} from '@angular/core';

import {
  SkyModalInstance
} from '@skyux/modals';

import {
  SkyProgressIndicatorDemoContext
} from './progress-indicator-demo-context';

@Component({
  selector: 'sky-demo-progress-indicator-horizontal',
  templateUrl: './progress-indicator-demo-form.component.html'
})
export class SkyProgressIndicatorDemoFormComponent {
  constructor(
    public instance: SkyModalInstance,
    public context: SkyProgressIndicatorDemoContext
  ) { }

  public submit(): void {
    this.instance.close(undefined, 'save');
  }
}
