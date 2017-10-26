import { Component, OnInit } from '@angular/core';
import { SkyConfirmationDialogConfig } from './confirmation-dialog-config';
import { SkyModalInstance } from '../modal/modal-instance';
import { SkyResources } from '../resources';

@Component({
  selector: 'sky-confirmation-dialog-form',
  templateUrl: './confirmation-dialog-form.component.html',
  styleUrls: ['./confirmation-dialog-form.component.scss']
})
export class SkyConfirmationDialogFormComponent implements OnInit {
  constructor(
    public context: SkyConfirmationDialogConfig,
    public instance: SkyModalInstance) {}

  public ngOnInit() {
    if (!this.context.confirmText) {
      this.context.confirmText = SkyResources.getString('confirm_dialog_default_confirm_text');
    }

    if (!this.context.cancelText) {
      this.context.cancelText = SkyResources.getString('confirm_dialog_default_cancel_text');
    }
  }
}
