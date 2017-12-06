import { Component } from '@angular/core';

import { SkyModalInstance } from '@blackbaud/skyux/dist/core';

import { SkyModalDemoContext } from './modal-demo-context';

@Component({
  selector: 'sky-demo-modal-form',
  templateUrl: './modal-demo-form.component.html'
})
export class SkyModalDemoFormComponent {
  public title = 'Hello world';

  constructor(
    public context: SkyModalDemoContext,
    public instance: SkyModalInstance
  ) { }
}
