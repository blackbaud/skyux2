import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'sky-demo-button',
  templateUrl: './demo-button.component.html',
  styleUrls: ['./demo-button.component.scss']
})
export class SkyDemoButtonComponent {
  @Input()
  public componentName: string;

  @Input()
  public icon: string;

  @Input()
  public url: string;
}
