import { Component } from '@angular/core';
import { SkyActionButtonPermalink } from '../types';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './action-button.component.fixture.html'
})
export class ActionButtonTestComponent {

  public permalink1: SkyActionButtonPermalink = {
    url: 'https://host.nxt.blackbaud.com/skyux2/?component=SkyIconDemoComponent'
  }

  public permalink2: SkyActionButtonPermalink = {
    route: {
      commands: [],
      extras: {
        fragment: 'fragment',
        queryParams: {},
        queryParamsHandling: {}
      }
    }
  }

  public buttonIsClicked: boolean = false;

  public buttonClicked() {
    this.buttonIsClicked = true;
  }
}
