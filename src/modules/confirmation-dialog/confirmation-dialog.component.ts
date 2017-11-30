import { Component, OnInit } from '@angular/core';

import { SkyModalInstance } from '../modal';
import { SkyResources } from '../resources';

import { SkyConfirmationDialogConfig } from './confirmation-dialog-config';
import { SkyConfirmationDialogType } from './confirmation-dialog-type';
import { SkyConfirmationDialogButton } from './confirmation-dialog-button';

@Component({
  selector: 'sky-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class SkyConfirmationDialogComponent implements OnInit {
  public buttons: SkyConfirmationDialogButton[];

  constructor(
    public context: SkyConfirmationDialogConfig,
    public instance: SkyModalInstance
  ) { }

  public ngOnInit() {
    this.createButtons();
  }

  private createButtons() {
    this.buttons = this.getDefaultButtons();

    // If button config is supplied through the config object, use those values
    this.overrideButtonConfig();
  }

  private getDefaultButtons(): SkyConfirmationDialogButton[] {
    const dialogType = this.context.type;
    let buttons: SkyConfirmationDialogButton[];

    switch (dialogType) {
      case SkyConfirmationDialogType.OKDialog:
        buttons = [
          {
            text: SkyResources.getString('confirm_dialog_default_ok_text'),
            autofocus: true,
            buttonType: 'primary',
            action: 'ok'
          }
        ];
        break;
      case SkyConfirmationDialogType.YesNoCancelDialog:
        buttons = [
          {
            text: SkyResources.getString('confirm_dialog_default_yes_text'),
            autofocus: true,
            buttonType: 'primary',
            action: 'yes'
          },
          {
            text: SkyResources.getString('confirm_dialog_default_no_text'),
            buttonType: 'default',
            action: 'no'
          },
          {
            text: SkyResources.getString('confirm_dialog_default_cancel_text'),
            buttonType: 'link',
            action: 'cancel'
          }
        ];
        break;
      default:
        buttons = [
          {
            text: SkyResources.getString('confirm_dialog_default_yes_text'),
            autofocus: true,
            buttonType: 'primary',
            action: 'yes'
          },
          {
            text: SkyResources.getString('confirm_dialog_default_cancel_text'),
            buttonType: 'link',
            action: 'cancel'
          }
        ];
        break;
    }

    return buttons;
  }

  private overrideButtonConfig() {
    const configButtons = this.context.buttons;

    this.buttons.forEach((button: any, i: number) => {
      if (configButtons[i]) {
        if (configButtons[i].text) {
          this.buttons[i].text = this.context.buttons[i].text;
        }

        if (configButtons[i].autofocus) {
          this.buttons[0].autofocus = false; // clear out default
          this.buttons[i].autofocus = true;
        }
      }
    });
  }
}
