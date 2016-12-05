import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyModule } from '../../../../src/core';
import {
  ListState,
  ListStateDispatcher
} from '../../../../src/modules/list/state';
import { ListItemModel } from '../../../../src/modules/list/state/items/item.model';
import { ListItemsLoadAction } from '../../../../src/modules/list/state/items/actions';

import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './list-paging-default.component.visual-fixture.html'
})
export class AppComponent {
  constructor(private state: ListState, private dispatcher: ListStateDispatcher) {
    dispatcher.next(new ListItemsLoadAction([
      new ListItemModel('1', {}),
      new ListItemModel('2', {}),
      new ListItemModel('3', {}),
      new ListItemModel('4', {}),
      new ListItemModel('5', {}),
      new ListItemModel('6', {}),
      new ListItemModel('7', {})
    ], true));
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
  ],
  providers: [
    ListState,
    ListStateDispatcher
  ]
})
class AppModule { }

Bootstrapper.bootstrapModule(AppModule);
