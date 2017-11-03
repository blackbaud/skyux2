import { Component, OnInit } from '@angular/core';
import { SkyConfirmationDialogConfig } from './confirmation-dialog-config';
import { SkyConfirmationDialogType } from './confirmation-dialog-type';
import { SkyModalInstance } from '../modal/modal-instance';
import { SkyResources } from '../resources';

export class SkyConfirmationDialogButton {
  public text?: string;
  public autofocus?: boolean;
  public style?: string;
}

@Component({
  selector: 'sky-confirmation-dialog-form',
  templateUrl: './confirmation-dialog-form.component.html',
  styleUrls: ['./confirmation-dialog-form.component.scss']
})
export class SkyConfirmationDialogFormComponent implements OnInit {
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
          style: 'sky-btn sky-btn-primary sky-dialog-btn-1'
        }
      ];
      case SkyConfirmationDialogType.YesNoCancelDialog: return [
        {
          text: SkyResources.getString('confirm_dialog_default_yes_text'),
          autofocus: true,
          style: 'sky-btn sky-btn-primary sky-dialog-btn-1'
        },
        {
          text: SkyResources.getString('confirm_dialog_default_no_text'),
          style: 'sky-btn sky-dialog-btn-2'
        },
        {
          text: SkyResources.getString('confirm_dialog_default_cancel_text'),
          style: 'sky-btn-link sky-dialog-btn-3'
        }
      ];
      default: return [
        {
          text: SkyResources.getString('confirm_dialog_default_yes_text'),
          autofocus: true,
          style: 'sky-btn sky-btn-primary sky-dialog-btn-1'
        },
        {
          text: SkyResources.getString('confirm_dialog_default_cancel_text'),
          style: 'sky-btn-link sky-dialog-btn-2'
        }
      ];
    }
  }

  private overrideButtonConfig() {
    for (let i = 0; i < this.buttons.length; i++) {
      if (this.context.buttons.length >= (i + 1) && this.context.buttons[i]) {
        if (this.context.buttons[i].text) {
          this.buttons[i].text = this.context.buttons[i].text;
        }
        if (this.context.buttons[i].autofocus) {
          this.buttons[0].autofocus = false; // clear out default
          this.buttons[i].autofocus = true;
        }
      }
    }
  }
}
