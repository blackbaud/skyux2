import {
  Component,
  ViewChild,
  TemplateRef
} from '@angular/core';

import {
  SkyListToolbarComponent
} from '../list-toolbar.component';

 @Component({
   selector: 'sky-test-cmp',
   template: require('./list-toolbar.component.fixture.html')
 })
 export class ListToolbarTestComponent {

  public toolbarType: string;
  public searchEnabled: boolean;
  public sortEnabled: boolean;
  public searchText: string;
  @ViewChild(SkyListToolbarComponent)
  public toolbar: SkyListToolbarComponent;

  @ViewChild('default')
  public default: TemplateRef<any>;
 }
