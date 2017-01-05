import {
  Component,
  Input
} from '@angular/core';

import { SkyResourcesService } from '../resources/resources.service';

import { SkyTabsetComponent } from './tabset.component';
import { SkyTabComponent } from './tab.component';

const buttonTypeNext = 'next';
const buttonTypePrevious = 'previous';

@Component({
  selector: 'sky-tabset-nav-button',
  templateUrl: './tabset-nav-button.component.html'
})
export class SkyTabsetNavButtonComponent {
  @Input()
  public tabset: SkyTabsetComponent;

  @Input()
  public buttonType: string;

  @Input()
  public set buttonText(value: string) {
    this._buttonText = value;
  }

  public get buttonText(): string {
    if (this._buttonText) {
      return this._buttonText;
    }

    switch (this.buttonType) {
      case buttonTypePrevious:
        return this.resources.getString('wizard_navigator_previous');
      case buttonTypeNext:
        return this.resources.getString('wizard_navigator_next');
      /* istanbul ignore next */
      default:
        return '';
    }
  }

  public get disabled(): boolean {
    let tabToSelect: SkyTabComponent;

    switch (this.buttonType) {
      case buttonTypePrevious:
        tabToSelect = this.previousTab;
        break;
      case buttonTypeNext:
        tabToSelect = this.nextTab;
        break;
      /* istanbul ignore next */
      default:
        break;
    }

    return !tabToSelect || tabToSelect.disabled;
  }

  private get selectedTab(): SkyTabComponent {
    let selectedTab: SkyTabComponent;

    if (this.tabset && this.tabset.tabs) {
      selectedTab = this.tabset.tabs.filter((tab) => tab.active)[0];
    }

    return selectedTab;
  }

  private get nextTab(): SkyTabComponent {
    let selectedTab = this.selectedTab;

    if (selectedTab) {
      let tabs = this.tabset.tabs.toArray();
      return tabs[tabs.indexOf(selectedTab) + 1];
    }

    return undefined;
  }

  private get previousTab(): SkyTabComponent {
    let selectedTab = this.selectedTab;

    if (selectedTab) {
      let tabs = this.tabset.tabs.toArray();
      return tabs[tabs.indexOf(selectedTab) - 1];
    }

    return undefined;
  }

  private _buttonText: string;

  constructor(private resources: SkyResourcesService) { }

  public buttonClick() {
    let tabToSelect: SkyTabComponent;

    switch (this.buttonType) {
      case buttonTypePrevious:
        tabToSelect = this.previousTab;
        break;
      case buttonTypeNext:
        tabToSelect = this.nextTab;
        break;
      /* istanbul ignore next */
      default:
        break;
    }

    /* istanbul ignore else */
    if (tabToSelect && !tabToSelect.disabled) {
      this.tabset.selectTab(tabToSelect);
    }
  }
}
