import { Component } from '@angular/core';

@Component({
  selector: 'sky-error-demo',
  templateUrl: './error-demo.component.html'
})
export class ErrorDemoComponent {
  public errorType: string = 'broken';

  public customTitle: string = 'Custom error title';
  public customDescription: string = 'Custom error description';
  public customActionText: string = 'Custom action';

  public customAction() {
    alert('action clicked!');
  }
}
