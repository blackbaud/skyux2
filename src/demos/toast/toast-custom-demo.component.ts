import {
  Component,
  OnInit
} from '@angular/core';
import {
  SkyToastInstance
} from '../../core';

@Component({
  selector: 'sky-toast-custom-demo',
  template: "<p>{{text}}<a *ngIf='!(message.isClosing | async)' href='http://example.com'>example.com</a></p>"
})
export class SkyToastCustomDemoComponent implements OnInit {
  public text = 'This is a templated message. It can even link you to ';

  constructor(public message: SkyToastInstance) {}

  public ngOnInit() {
    this.message.isClosing.subscribe(() => {
      this.text = 'Bye bye :D';
    });
  }
}
