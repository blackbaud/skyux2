import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyActionButtonModule } from '../action-button.module';

import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './action-button.component.visual-fixture.html'
})
export class AppComponent {

  public buttonIsClicked: boolean = false;

  public buttonClicked() {
    this.buttonIsClicked = true;
  }
}

@NgModule({
  imports: [
    BrowserModule,
    SkyActionButtonModule
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
