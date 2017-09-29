import { Component } from '@angular/core';

@Component({
  selector: 'sky-text-expand-demo',
  templateUrl: './text-expand.component.fixture.html'
})
export class TextExpandTestComponent {
  // tslint:disable-next-line
  public text: string;
  public maxLength: number;
  public truncateNewlines: boolean = true;
}
