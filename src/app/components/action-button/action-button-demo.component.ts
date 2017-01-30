import { Component } from '@angular/core';

@Component({
  selector: 'sky-action-button-demo',
  templateUrl: './action-button-demo.component.html'
})
export class SkyActionButtonDemoComponent {
  public filterActionClick() {
    alert('Filter action clicked');
  }

  public openActionClick() {
    alert('Open action clicked');
  }
}
