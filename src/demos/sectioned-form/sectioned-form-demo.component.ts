import { Component, AfterContentChecked } from '@angular/core';
import { SkyModalService, SkyModalCloseArgs } from '@blackbaud/skyux/dist/core';
import { SkySectionedModalFormDemoComponent } from './sectioned-modal-form-demo.component';

@Component({
  selector: 'sky-sectioned-form-demo',
  templateUrl: './sectioned-form-demo.component.html'
})
export class SkySectionedFormDemoComponent implements AfterContentChecked {
  public activeIndexDisplay: number;
  private _activeIndex: number;

  constructor(private modal: SkyModalService) { }

  public openModal() {
    let modalInstance = this.modal.open(SkySectionedModalFormDemoComponent);

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      if (result.reason === 'cancel') {
        console.log(`Modal cancelled with data ${result.data}`);
      } else if (result.reason === 'save') {
        console.log(`Modal saved with data ${result.data}`);
      }
    });
  }

  public ngAfterContentChecked() {
    this.activeIndexDisplay = this._activeIndex;
  }

  public updateIndex(newIndex: number) {
    this._activeIndex = newIndex;
  }
}
