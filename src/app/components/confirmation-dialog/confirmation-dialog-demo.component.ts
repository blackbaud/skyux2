import { Component } from '@angular/core';

import { SkyConfirmationDialogService } from
  '../../../modules/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'sky-confirmation-dialog-demo',
  templateUrl: './confirmation-dialog-demo.component.html'
})
export class SkyConfirmationDialogDemoComponent {
  public action: string;

  constructor(private confirmService: SkyConfirmationDialogService) {}

  public openConfirmationDialog(type: number) {
    const config: any = {
      description: 'Are you really sure you want to do this?',
      type: type
    };

    this.confirmService.open(config).closed.subscribe((result: string) => {
        this.action = 'You clicked \'' + result + '\'';
    });
  }

  public openCustomDialog() {
    const config: any = {
      description: 'What option are you going to select?',
      type: 3,
      buttons: [ { text: '1' }, { text: '2' }, { text: '3', autofocus: true } ]
    };

    this.confirmService.open(config).closed.subscribe((result: string) => {
        switch (result) {
          case '1': this.action = 'Action 1'; break;
          case '2': this.action = 'Action 2'; break;
          case '3': this.action = 'Action 3'; break;
          default: this.action = 'Unhandled case'; break;
        }
    });
  }
}
