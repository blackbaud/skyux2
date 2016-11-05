import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { SkyModule } from '../../../src/core';

import { Bootstrapper } from '../../bootstrapper';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public items: any[];

  public expandMode = 'single';

  constructor() {
    this.items = [
      {
        title: 'Call Robert Hernandez',
        note: 'Robert recently gave a very generous gift.  We should call him to thank him.',
        status: 'Completed',
        statusType: 'success'
      },
      {
        title: 'Send invitation to Spring Ball',
        note: 'The Spring Ball is coming up soon.  Let\'s get those invitations out!',
        status: 'Past due',
        statusType: 'warning'
      }
    ];
  }

  public addItem() {
    let next = this.items.length + 1;
    this.items.push({
      title: 'New reminder ' + next,
      note: 'This is a new reminder',
      expanded: true,
      status: 'Active',
      statusType: 'info'
    });
  }

  public removeItem() {
    this.items.pop();
  }
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
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
