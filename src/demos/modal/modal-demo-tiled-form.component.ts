import {
  Component
} from '@angular/core';

import {
  SkyModalInstance
} from '@skyux/modals';

import {
  SkyModalDemoContext
} from './modal-demo-context';

@Component({
  selector: 'sky-demo-modal-tiled-form',
  templateUrl: './modal-demo-tiled-form.component.html'
})
export class SkyModalDemoTiledFormComponent {
  public title = 'Hello world';

  constructor(
    public context: SkyModalDemoContext,
    public instance: SkyModalInstance
  ) { }
}
