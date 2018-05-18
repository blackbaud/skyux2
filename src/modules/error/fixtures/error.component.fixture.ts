import { Component } from '@angular/core';

@Component({
  selector: 'sky-test-cmp',
  template: ''
})
export class ErrorTestComponent {

  public customAction(): void {
    console.log('custom action happened');
  }

}
