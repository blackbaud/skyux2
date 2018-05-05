import { Component, ViewChild } from '@angular/core';
import { SkyVerticalTabComponent } from './../vertical-tab.component';
import { SkyVerticalTabsetComponent } from './../vertical-tabset.component';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './vertical-tabset.component.fixture.html'
})
export class VerticalTabsetTestComponent {
  public group1Open = true;
  public group1Disabled = false;

  public group2Open = false;
  public group2Disabled = false;

  public group3Open = false;
  public group3Disabled = true;

  public active = true;
  public tabDisabled = true;

  @ViewChild(SkyVerticalTabsetComponent)
  public tabset: SkyVerticalTabsetComponent;

  @ViewChild(SkyVerticalTabComponent)
  public verticalTabs: SkyVerticalTabComponent;
}
