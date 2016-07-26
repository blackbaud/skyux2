import { Component } from '@angular/core';

import { SkyLabelComponent } from '../label.component';

@Component({
  selector: 'sky-demo-app',
  template: require('./label.component.visual-fixture.html'),
  directives: [SkyLabelComponent]
})
class AppComponent {
}
