import { Component, NgModule, ViewChild} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyModule, SkyListViewChecklistComponent } from '../../../../src/core';

import { ListItemModel } from '../../../../src/modules/list/state/items/item.model';

import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './list-view-checklist.component.visual-fixture.html'
})
export class AppComponent {
  @ViewChild(SkyListViewChecklistComponent)
  public viewchecklist: SkyListViewChecklistComponent;

  public data: Array<any> = [
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
  ]
})
class AppModule { }

Bootstrapper.bootstrapModule(AppModule);
