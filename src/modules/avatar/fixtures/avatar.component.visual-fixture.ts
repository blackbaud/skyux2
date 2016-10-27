import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyModule, SkyFileItem, SkyAvatarSrc } from '../../../../src/core';

import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  template: require('./avatar.component.visual-fixture.html')
})
class AppComponent {
  public name = 'Robert C. Hernandez';

  public src: SkyAvatarSrc = require('./avatar.png');

  public avatarUpdated(file: SkyFileItem) {
    if (file !== undefined) {
      this.src = file.file;
    }
  }
}

@NgModule({
  imports: [
    BrowserModule,
    SkyModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
class AppModule { }

Bootstrapper.bootstrapModule(AppModule);
