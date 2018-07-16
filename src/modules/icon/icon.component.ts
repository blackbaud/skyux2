import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'sky-icon',
  styleUrls: ['./icon.component.scss'],
  templateUrl: './icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyIconComponent {
  @Input()
  public icon: string = '';
}
