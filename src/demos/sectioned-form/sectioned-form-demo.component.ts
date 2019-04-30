import {
  Component
} from '@angular/core';

import {
  SkyModalCloseArgs,
  SkyModalService
} from '@skyux/modals';

import {
  SkySectionedModalFormDemoComponent
} from './sectioned-modal-form-demo.component';

@Component({
  selector: 'sky-sectioned-form-demo',
  templateUrl: './sectioned-form-demo.component.html'
})
export class SkySectionedFormDemoComponent {
  public activeIndexDisplay: number;

  constructor(
    private modal: SkyModalService
  ) { }

  public openModal(): void {
    let modalInstance = this.modal.open(SkySectionedModalFormDemoComponent);

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      if (result.reason === 'cancel') {
        console.log(`Modal cancelled with data ${result.data}`);
      } else if (result.reason === 'save') {
        console.log(`Modal saved with data ${result.data}`);
      }
    });
  }

  public onIndexChanged(newIndex: number): void {
    this.activeIndexDisplay = newIndex;
  }
}
