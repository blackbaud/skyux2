import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import {
  SkyActionButtonPermalink
} from './types';

@Component({
  selector: 'sky-action-button',
  styleUrls: ['./action-button.component.scss'],
  templateUrl: './action-button.component.html'
})
export class SkyActionButtonComponent {
  @Input()
  public get permalink(): SkyActionButtonPermalink {
    if (!this._permaLink) {
      return undefined;
    }

    if (this._permaLink.url) {
      return {
        url: this._permaLink.url
      };
    }

    return {
      route: this._permaLink.route
    };
  }
  public set permalink(value: SkyActionButtonPermalink) {
    this._permaLink = value;
  }

  @Output()
  public actionClick = new EventEmitter<any>();

  private _permaLink: SkyActionButtonPermalink;

  public buttonClicked() {
    this.actionClick.emit();
  }

  public enterPress() {
    this.actionClick.emit();
  }
}
