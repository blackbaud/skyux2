import {
  Component
} from '@angular/core';

@Component({
  selector: 'sky-text-expand-repeater-demo',
  templateUrl: './text-expand-repeater-demo.component.html'
})
export class SkyTextExpandRepeaterDemoComponent {
  public repeaterData: string[] = [
    'Repeater item 1',
    'Repeater item 2',
    'Repeater item 3',
    'Repeater item 4',
    'Repeater item 5'
  ];
}
