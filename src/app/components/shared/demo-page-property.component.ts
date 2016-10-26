import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'sky-demo-page-property',
  templateUrl: './demo-page-property.component.html',
  styleUrls: ['./demo-page-property.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDemoPagePropertyComponent {
  @Input()
  public propertyName: string;

  @Input()
  public defaultValue: string;

  @Input()
  public isOptional = false;
}
