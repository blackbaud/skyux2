import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyErrorModule } from '../error.module';
import { Bootstrapper } from '../../../../visual/bootstrapper';
import { ErrorModalConfig } from '../error-modal-config';
import { SkyErrorModalService } from '../error-modal.service';
import { SkyModalModule } from '../../modal/modal.module';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './error.component.visual-fixture.html'
})
class AppComponent {
  constructor(private modal: SkyErrorModalService) { }

  public openModal() {
    const config: ErrorModalConfig = {
      errorTitle: 'Some error title',
      errorDescription: 'Description of error',
      errorCloseText: 'Close button text'
    };

    this.modal.open(config);
  }
}

@NgModule({
  imports: [
    BrowserModule,
    SkyErrorModule,
    SkyModalModule
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
