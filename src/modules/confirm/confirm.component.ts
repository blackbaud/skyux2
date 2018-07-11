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

import {
  SkyConfirmModalContext
} from './confirm-modal-context';

@Component({
  selector: 'sky-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class SkyConfirmComponent implements OnInit {
  public buttons: SkyConfirmButton[];
  public message: string;
  public body: string;

  constructor(
    private config: SkyConfirmModalContext,
    private modal: SkyModalInstance
  ) { }

  public ngOnInit() {
    let buttons;

    if (this.config.type === SkyConfirmType.Custom && this.config.buttons.length > 0) {
      buttons = this.getCustomButtons(this.config.buttons);
    } else {
      buttons = this.getPresetButtons();
    }

    this.buttons = buttons;
    this.message = this.config.message;
    this.body = this.config.body;
  }

  public close(button: SkyConfirmButton) {
    const result: SkyConfirmCloseEventArgs = {
      action: button.action
    };

    this.modal.close(result);
  }

  private getPresetButtons(): SkyConfirmButton[] {
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

  private getCustomButtons(buttonConfig: SkyConfirmButtonConfig[]): SkyConfirmButton[] {
    const buttons: SkyConfirmButton[] = [];

    buttonConfig.forEach((config: SkyConfirmButtonConfig) => {
      buttons.push({
        text: config.text,
        action: config.action,
        styleType: config.styleType || 'default',
        autofocus: config.autofocus || false
      } as SkyConfirmButton);
    });

    return buttons;
  }
}
