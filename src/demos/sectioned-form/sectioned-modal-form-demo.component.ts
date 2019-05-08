import {
  Component,
  ViewChild
} from '@angular/core';

import {
  SkyModalInstance
} from '@skyux/modals';

import {
  SkySectionedFormComponent
} from '@skyux/tabs';

@Component({
  selector: 'sky-sectioned-modal-form-demo',
  templateUrl: './sectioned-modal-form-demo.component.html'
})
export class SkySectionedModalFormDemoComponent {

  @ViewChild(SkySectionedFormComponent)
  public sectionedFormComponent: SkySectionedFormComponent;

  public activeIndexDisplay: number = undefined;
  public activeTab = true;

  constructor(
    public instance: SkyModalInstance
  ) { }

  public onIndexChanged(newIndex: number) {
    this.activeIndexDisplay = newIndex;
  }

  public tabsHidden() {
    return !this.sectionedFormComponent.tabsVisible();
  }

  public showTabs() {
    this.sectionedFormComponent.showTabs();
  }
}
