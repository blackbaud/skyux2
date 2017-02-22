import {
  Component,
  Input,
  OnDestroy
} from '@angular/core';

import {
  SkyMediaQueryService,
  SkyMediaBreakpoints
} from '../media-queries';

import {
  Subscription
} from 'rxjs/Subscription';

@Component({
  selector: 'sky-action-button-icon',
  styleUrls: ['./action-button-icon.component.scss'],
  templateUrl: './action-button-icon.component.html'
})
export class SkyActionButtonIconComponent implements OnDestroy {

  @Input()
  public iconType: string;

  public fontSizeClass: string;

  private subscription: Subscription;

  constructor(private mediaQueryService: SkyMediaQueryService) {
    this.subscription = this.mediaQueryService.subscribe((args: SkyMediaBreakpoints) => {
      if (args === SkyMediaBreakpoints.xs) {
        this.fontSizeClass = 'fa-2x';
      } else {
        this.fontSizeClass = 'fa-3x';
      }
    });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
