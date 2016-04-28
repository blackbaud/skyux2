import {Component} from 'angular2/core';
import {SkyTileComponent, SkyTileContentSectionComponent} from '../../../src/modules/core';
import {Bootstrapper} from '../../bootstrapper';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  directives: [SkyTileComponent, SkyTileContentSectionComponent]
})
export class AppComponent {

}

Bootstrapper.bootstrap(AppComponent);
