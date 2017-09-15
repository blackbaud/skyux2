import {
  Component,
  ViewChild,
  AfterContentChecked
} from '@angular/core';

import {
  SkyModalInstance,
  SkySectionedFormComponent
} from '../../../core';

@Component({
  selector: 'sky-sectioned-modal-form-demo',
  templateUrl: './sectioned-modal-form-demo.component.html'
})
export class SkySectionedModalFormDemoComponent implements AfterContentChecked {

  @ViewChild(SkySectionedFormComponent)
  public sectionedFormComponent: SkySectionedFormComponent;

  public activeIndexDisplay: number = undefined;
  public activeTab = true;

  private _activeIndex: number = undefined;

  constructor(public instance: SkyModalInstance) {}

  public ngAfterContentChecked() {
    this.activeIndexDisplay = this._activeIndex;
  }

  public updateIndex(newIndex: number) {
    this._activeIndex = newIndex;
  }

  public requiredChange(required: boolean) {
    this.sectionedFormComponent.setRequired(required);
  }
}
