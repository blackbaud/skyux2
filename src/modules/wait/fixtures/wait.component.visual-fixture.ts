import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyWaitModule } from '../wait.module';

import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './wait.component.visual-fixture.html',
  styleUrls: ['./wait.component.visual-fixture.scss']
})
export class AppComponent {
  public isWaiting: boolean;
  public isFullPage: boolean;
  public isNonBlocking: boolean;
}

@NgModule({
  imports: [
    BrowserModule,
    SkyWaitModule
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
