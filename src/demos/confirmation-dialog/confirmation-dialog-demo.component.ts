import { Component } from '@angular/core';

import { SkyConfirmationDialogService } from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'sky-confirmation-dialog-demo',
  templateUrl: './confirmation-dialog-demo.component.html'
})
export class SkyConfirmationDialogDemoComponent {
  public action: string;

  constructor(
    private confirmService: SkyConfirmationDialogService
  ) { }

  public openConfirmationDialog(type: number) {
    const config: any = {
      message: 'Are you really sure you want to do this?',
      type: type
    };

    this.confirmService.open(config).closed.subscribe((result: string) => {
      this.action = 'You clicked \'' + result + '\'';
    });
  }

  public openCustomDialog() {
    const config: any = {
      message: 'What option are you going to select?',
      type: 3,
      buttons: [ { text: '1' }, { text: '2' }, { text: '3', autofocus: true } ]
    };

    this.confirmService.open(config).closed.subscribe((result: string) => {
      this.action = 'You clicked \'' + result + '\'';
    });
  }
}
