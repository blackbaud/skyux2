import {
  Component
} from '@angular/core';

@Component({
  templateUrl: './radio.component.fixture.html'
})
export class RadioTestComponent {
  public selectedValue = '1';
  public disabled2: boolean = false;

  public value1 = '1';
  public value2 = '2';
  public value3 = '3';

  public label1: string;
  public labelledBy3: string;

  public tabindex2: string;

  public onClick() {}
}
