import { Component, NgModule, ViewChild, AfterViewInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyModule, SkyListViewRepeaterComponent } from '../../../../src/core';
import {
  ListState,
  ListStateDispatcher
} from '../../../../src/modules/list/state';
import { ListItemModel } from '../../../../src/modules/list/state/items/item.model';
import { ListViewModel } from '../../../../src/modules/list/state/views/view.model';
import { ListItemsLoadAction } from '../../../../src/modules/list/state/items/actions';
import {
  ListDisplayedItemsLoadAction
} from '../../../../src/modules/list/state/displayed-items/actions';
import { ListViewsLoadAction } from '../../../../src/modules/list/state/views/actions';

import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './list-view-repeater.component.visual-fixture.html'
})
export class AppComponent implements AfterViewInit {
  @ViewChild(SkyListViewRepeaterComponent) public viewrepeater: SkyListViewRepeaterComponent;

  constructor(private state: ListState, private dispatcher: ListStateDispatcher) {
  }

  public ngAfterViewInit() {
    let items = [
        new ListItemModel('1', { column1: '1', column2: 'Apple',
          column3: 'aa' }),
        new ListItemModel('2', { column1: '01', column2: 'Banana',
          column3: 'bb' }),
        new ListItemModel('3', { column1: '11', column2: 'Banana',
          column3: 'cc' }),
        new ListItemModel('4', { column1: '12', column2: 'Daikon',
          column3: 'dd' }),
        new ListItemModel('5', { column1: '13', column2: 'Edamame',
          column3: 'ee' }),
        new ListItemModel('6', { column1: '20', column2: 'Fig',
          column3: 'ff' }),
        new ListItemModel('7', { column1: '21', column2: 'Grape',
          column3: 'gg' })
      ];

      this.dispatcher.next(new ListItemsLoadAction(items, true));
      this.dispatcher.next(new ListDisplayedItemsLoadAction(items));
      this.dispatcher.next(new ListViewsLoadAction([
        new ListViewModel(this.viewrepeater.id, 'Test View')
      ]));
      this.dispatcher.viewsSetActive(this.viewrepeater.id);
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
