import {
  Component
} from '@angular/core';

@Component({
  selector: 'lookup-visual',
  templateUrl: './lookup-visual.component.html'
})
export class LookupVisualComponent {
  public data: Array<any>;
  public selectedItems: Array<any>;

  constructor() {
    this.data = [
      { name: 'Blue' },
      { name: 'Green' },
      { name: 'Black' },
      { name: 'Red' },
      { name: 'Orange' }
    ];
  }
}
