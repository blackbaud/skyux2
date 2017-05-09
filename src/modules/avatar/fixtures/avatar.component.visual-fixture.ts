import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyAvatarModule,  SkyAvatarSrc } from '../';

import { SkyFileItem } from '../../fileattachments';

import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './avatar.component.visual-fixture.html'
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
    SkyAvatarModule
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
