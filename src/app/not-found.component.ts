import {
  Component
} from '@angular/core';

import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: [ './not-found.component.scss' ]
})
export class NotFoundComponent {

  public redirect = 'https://developer.blackbaud.com/skyux';

  public redirectInSeconds = 5;

  constructor(
    router: Router
  ) {
    this.redirect = this.redirect + router.url;
    setTimeout(() => {
      location.href = this.redirect;
    }, this.redirectInSeconds * 1000);
  }
}
