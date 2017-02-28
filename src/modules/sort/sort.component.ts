import {
  Component
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
  ]
})
export class SkySortComponent {

}
