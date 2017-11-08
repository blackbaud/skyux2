import { Component, OnInit } from '@angular/core';
import { SkyConfirmationDialogConfig } from './confirmation-dialog-config';
import { SkyConfirmationDialogType } from './confirmation-dialog-type';
import { SkyConfirmationDialogButton } from './confirmation-dialog-button';
import { SkyModalInstance } from '../modal/modal-instance';
import { SkyResources } from '../resources';

@Component({
  selector: 'sky-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class SkyConfirmationDialogComponent implements OnInit {
  public buttons: Array<SkyConfirmationDialogButton>;

  constructor(
    public context: SkyConfirmationDialogConfig,
    public instance: SkyModalInstance) {}

  public ngOnInit() {
    if (!this.context.type) {
      this.context.type = SkyConfirmationDialogType.YesCancelDialog;
    }

    if (!this.context.buttons) {
      this.context.buttons = new Array<SkyConfirmationDialogButton>();
    }

    this.createButtons();
  }

  private createButtons() {
    this.buttons = this.getDefaultButtons();

    // If button config is supplied through the config object, use those values
    this.overrideButtonConfig();
  }

  private getDefaultButtons(): Array<SkyConfirmationDialogButton> {
    switch (this.context.type) {
      case SkyConfirmationDialogType.OKDialog: return [
        {
          text: SkyResources.getString('confirm_dialog_default_ok_text'),
          autofocus: true,
          buttonType: 'primary'
        }
      ];
      case SkyConfirmationDialogType.YesNoCancelDialog: return [
        {
          text: SkyResources.getString('confirm_dialog_default_yes_text'),
          autofocus: true,
          buttonType: 'primary'
        },
        {
          text: SkyResources.getString('confirm_dialog_default_no_text'),
          buttonType: 'default'
        },
        {
          text: SkyResources.getString('confirm_dialog_default_cancel_text'),
          buttonType: 'link'
        }
      ];
      default: return [
        {
          text: SkyResources.getString('confirm_dialog_default_yes_text'),
          autofocus: true,
          buttonType: 'primary'
        },
        {
          text: SkyResources.getString('confirm_dialog_default_cancel_text'),
          buttonType: 'link'
        }
      ];
    }
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
