import {
  Component
} from '@angular/core';

import {
  ActivatedRoute
} from '@angular/router';

@Component({
  templateUrl: './not-found.component.html',
  styleUrls: [ './not-found.component.scss' ]
})
export class NotFoundComponent {

  public redirect = 'https://developer.blackbaud.com/skyux/';

  public redirectInSeconds = 5;

  constructor(
    route: ActivatedRoute
  ) {
    this.redirect = this.redirect + route.snapshot.url[0].path;
    setTimeout(() => {
      location.href = this.redirect;
    }, this.redirectInSeconds * 1000);
  }
}
