import {
  Component,
  NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  SkyPagingModule
} from '../paging.module';

import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './paging.component.visual-fixture.html'
})
export class AppComponent {

}

@NgModule({
  imports: [
    BrowserModule,
    SkyPagingModule
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
