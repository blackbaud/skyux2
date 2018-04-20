import {
  Component,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

import { Subject } from 'rxjs/Subject';

import {
  SkyDropdownMessage,
  SkyDropdownMessageType
} from '../dropdown';

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
  @Input()
  public showButtonText = false;

  public dropdownController = new Subject<SkyDropdownMessage>();

  public dropdownClicked() {
    this.dropdownController.next({
      type: SkyDropdownMessageType.Close
    });
  }
}
