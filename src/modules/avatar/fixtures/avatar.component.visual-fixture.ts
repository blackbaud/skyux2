import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyAvatarModule,  SkyAvatarSrc } from '../';

import { SkyFileItem } from '../../fileattachments';

import { Bootstrapper } from '../../../../visual/bootstrapper';
import { SkyErrorModalService } from '../../error/error-modal.service';
import { SkyModalModule } from '../../modal/modal.module';

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
    SkyAvatarModule,
    SkyModalModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    SkyErrorModalService
  ]
})
class AppModule { }

Bootstrapper.bootstrapModule(AppModule);
