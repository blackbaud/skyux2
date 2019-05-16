import {
  Component
} from '@angular/core';

import {
  SkyConfirmCloseEventArgs,
  SkyConfirmService,
  SkyConfirmType,
  SkyModalBeforeCloseHandler,
  SkyModalInstance
} from '@skyux/modals';

@Component({
  selector: 'sky-demo-modal-close-confirm',
  templateUrl: './modal-demo-close-confirmation.component.html'
})
export class SkyModalDemoCloseConfirmationComponent {
  public confirmationConfig = true;

  public hasUnsavedWork = true;

  public title = 'Hello world';

  constructor(
    public instance: SkyModalInstance,
    public confirmService: SkyConfirmService
  ) {
    this.instance.beforeClose.subscribe((closeHandler: SkyModalBeforeCloseHandler) => {
      this.onClose(closeHandler);
    });
  }

  public onClose(closeHandler: SkyModalBeforeCloseHandler): void {
    if (this.hasUnsavedWork) {
      this.confirmService.open({
        message: 'You have unsaved work. Are you sure you want to close this dialog?',
        type: SkyConfirmType.YesCancel
      }).closed.subscribe((closeArgs: SkyConfirmCloseEventArgs) => {
        if (closeArgs.action.toLowerCase() === 'yes') {
          closeHandler.closeModal();
        }
      });
    } else {
      closeHandler.closeModal();
    }
  }
}
