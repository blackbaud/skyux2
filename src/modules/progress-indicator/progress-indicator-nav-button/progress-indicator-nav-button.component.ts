import {
  Component,
  Input
} from '@angular/core';

import { SkyResourcesService } from '../../resources/resources.service';

import { SkyProgressIndicatorComponent } from '../progress-indicator.component';
import { SkyProgressIndicatorMessageType } from '../types';

const buttonTypeNext = 'next';
const buttonTypePrevious = 'previous';

@Component({
  selector: 'sky-progress-indicator-nav-button',
  templateUrl: './progress-indicator-nav-button.component.html'
})
export class SkyProgressIndicatorNavButtonComponent {
  @Input()
  public progressIndicator: SkyProgressIndicatorComponent;

  @Input()
  public buttonType: string;

  @Input()
  public get buttonText(): string {
    if (this._buttonText) {
      return this._buttonText;
    }

    switch (this.buttonType) {
      case buttonTypePrevious:
        return this.resources.getString('wizard_navigator_previous');

      default:
      case buttonTypeNext:
        return this.resources.getString('wizard_navigator_next');
    }
  }
  public set buttonText(value: string) {
    this._buttonText = value;
  }

  @Input()
  public get disabled(): boolean {
    if (this._disabled !== undefined) {
      return this._disabled;
    }

    let items = this.progressIndicator.progressItems.toArray();
    let active = items.filter(item => item.isActive)[0];

    switch (this.buttonType) {
      case buttonTypePrevious:
        return active && items.indexOf(active) === 0;

      default:
      case buttonTypeNext:
        return !active || active.isLastItem;
    }
  }
  public set disabled(value: boolean) {
    this._disabled = value;
  }

  private _disabled: boolean;
  private _buttonText: string;

  constructor(private resources: SkyResourcesService) { }

  public buttonClick() {
    switch (this.buttonType) {
      case buttonTypePrevious:
        this.progressIndicator.messageStream.next(SkyProgressIndicatorMessageType.ItemIncomplete);
        break;

      default:
      case buttonTypeNext:
        this.progressIndicator.messageStream.next(SkyProgressIndicatorMessageType.ItemComplete);
        break;
    }
  }
}
