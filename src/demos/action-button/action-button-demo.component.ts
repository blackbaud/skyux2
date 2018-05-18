import { Component } from '@angular/core';

@Component({
  selector: 'sky-action-button-demo',
  templateUrl: './action-button-demo.component.html'
})
export class SkyActionButtonDemoComponent {
  public filterActionClick(): void {
    alert('Filter action clicked');
  }

  public openActionClick(): void {
    alert('Open action clicked');
  }
}
