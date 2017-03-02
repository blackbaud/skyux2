import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  SkySortService
} from './sort.service';

@Component({
  selector: 'sky-sort',
  styleUrls: ['./sort.component.scss'],
  templateUrl: './sort.component.html',
  providers: [
    SkySortService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkySortComponent {

}
