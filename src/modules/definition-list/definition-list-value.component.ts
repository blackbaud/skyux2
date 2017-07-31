import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

@Component({
  selector: 'sky-definition-list-value',
  templateUrl: './definition-list-value.component.html',
  styleUrls: ['./definition-list-value.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDefinitionListValueComponent {
  public defaultValue: string;
}
