import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyDatepickerModule } from '../../datepicker';

import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './datepicker-calendar.component.visual-fixture.html'
})
class AppComponent {
  public selectedDate: Date = new Date('4/4/2017');
}

@NgModule({
  imports: [
    BrowserModule,
    SkyDatepickerModule
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
