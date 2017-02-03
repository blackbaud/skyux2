import {
  Component,
  ViewChild
} from '@angular/core';

import {
  SkyListToolbarComponent
} from '../list-toolbar.component';

 @Component({
   selector: 'sky-test-cmp',
   template: require('./list-toolbar.component.fixture.html')
 })
 export class ListToolbarTestComponent {

   public searchEnabled: boolean;

   @ViewChild(SkyListToolbarComponent)
    public toolbar: SkyListToolbarComponent;
 }
