import {
  Component,
  OnInit
} from '@angular/core';

import { SkyModalInstance } from '../modal';
import { SkyResources } from '../resources';

import {
  SkyConfirmCloseEventArgs,
  SkyConfirmType,
  SkyConfirmButton,
  SkyConfirmButtonConfig
} from './types';

import { SkyConfirmModalContext } from './confirm-modal-context';

@Component({
  selector: 'sky-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class SkyConfirmComponent implements OnInit {
  public buttons: SkyConfirmButton[];
  public message: string;

  constructor(
    private config: SkyConfirmModalContext,
    private modal: SkyModalInstance
  ) { }

  public ngOnInit() {
    const defaultButtons = this.getDefaultButtons();
    this.buttons = this.extendButtons(defaultButtons, this.config.buttons);
    this.message = this.config.message;
  }

  public close(button: SkyConfirmButton) {
    const result: SkyConfirmCloseEventArgs = {
      action: button.action
    };

    this.modal.close(result);
  }

  private getDefaultButtons(): SkyConfirmButton[] {
    let buttons: SkyConfirmButton[];

    switch (this.config.type) {
      default:
      case SkyConfirmType.OK:
        buttons = [
          {
            text: SkyResources.getString('confirm_dialog_default_ok_text'),
            autofocus: true,
            styleType: 'primary',
            action: 'ok'
          }
        ];
        break;

      case SkyConfirmType.YesNoCancel:
        buttons = [
          {
            text: SkyResources.getString('confirm_dialog_default_yes_text'),
            autofocus: true,
            styleType: 'primary',
            action: 'yes'
          },
          {
            text: SkyResources.getString('confirm_dialog_default_no_text'),
            styleType: 'default',
            action: 'no'
          },
          {
            text: SkyResources.getString('confirm_dialog_default_cancel_text'),
            styleType: 'link',
            action: 'cancel'
          }
        ];
        break;

      case SkyConfirmType.YesCancel:
        buttons = [
          {
            text: SkyResources.getString('confirm_dialog_default_yes_text'),
            autofocus: true,
            styleType: 'primary',
            action: 'yes'
          },
          {
            text: SkyResources.getString('confirm_dialog_default_cancel_text'),
            styleType: 'link',
            action: 'cancel'
          }
        ];
        break;
    }

    return buttons;
  }

  private extendButtons(
    buttons: SkyConfirmButton[],
    buttonConfig: SkyConfirmButtonConfig[]
  ): SkyConfirmButton[] {
    if (buttonConfig === undefined) {
      return buttons;
    }

    buttons.forEach((button: SkyConfirmButton, i: number) => {
      const config = buttonConfig[i];

      if (!config) {
        return;
      }

      Object.keys(config)
        .forEach((key: keyof SkyConfirmButtonConfig) => {
          if (config[key] === undefined) {
            return;
          }

          // Reset autofocus for all buttons so that
          // the current button receives focus.
          if (key === 'autofocus') {
            this.resetAutofocus(buttons);
          }

          button[key] = config[key];
        });
    });

    return buttons;
  }

  private resetAutofocus(buttons: SkyConfirmButton[]) {
    buttons.forEach((button: SkyConfirmButton) => {
      button.autofocus = false;
    });
  }
}
