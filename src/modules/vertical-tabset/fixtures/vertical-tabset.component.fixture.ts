import { Component, ViewChild } from '@angular/core';
import { SkyVerticalTabComponent } from './../vertical-tab.component';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './vertical-tabset.component.fixture.html'
})
export class VerticalTabsetTestComponent {
  public group1Open: boolean = true;
  public group1Disabled: boolean = false;

  public group2Open: boolean = false;
  public group2Disabled: boolean = false;

  public group3Open: boolean = false;
  public group3Disabled: boolean = true;

  public active: boolean = true;
  public tabDisabled: boolean = true;

  @ViewChild(SkyVerticalTabComponent)
  public verticalTabs: SkyVerticalTabComponent;
}
