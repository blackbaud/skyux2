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
} from 'rxjs';

@Component({
  selector: 'sky-button-large-icon',
  styleUrls: ['./button-large-icon.component.scss'],
  templateUrl: './button-large-icon.component.html'
})
export class SkyButtonLargeIconComponent implements OnDestroy {

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
