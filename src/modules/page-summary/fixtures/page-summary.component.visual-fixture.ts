import {
  Component,
  NgModule
} from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { SkyModule } from '../../../../src/core';

import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  template: require('./page-summary.component.visual-fixture.html')
})
export class AppComponent {
  public name = 'Robert C. Hernandez';

  public showAlert = false;

  public showImage = false;

  public showTitle = false;

  public showSubtitle = false;

  public showStatus = false;

  public showContent = false;

  public showKeyInfo = false;

  public get itemsToShow(): string {
    return this._itemsToShow;
  };

  public set itemsToShow(value: string) {
    let itemsToShow = value.split(',');

    itemsToShow.forEach((itemToShow) => {
        this['show' + itemToShow] = true;
    });

    this._itemsToShow = value;
  }

  private _itemsToShow = '';
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
