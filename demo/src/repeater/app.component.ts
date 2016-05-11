import {Component} from 'angular2/core';
import {SkyRepeaterComponent, SkyRepeaterItemComponent} from '../../../src/modules/repeater';
import {Bootstrapper} from '../../bootstrapper';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  directives: [SkyRepeaterComponent, SkyRepeaterItemComponent]
})
export class AppComponent {
  public items: any[];

  constructor() {
    this.items = [
      {
        title: 'Call Robert Hernandez',
        note: 'Robert recently gave a very generous gift.  We should call him to thank him.',
        status: 'Completed',
        statusType: 'success'
      },
      {
        title: 'Send invitation to Spring Ball',
        note: 'The Spring Ball is coming up soon.  Let\'s get those invitations out!',
        status: 'Past due',
        statusType: 'warning'
      }
    ];
  }
}

Bootstrapper.bootstrap(AppComponent);
