import { Component } from '@angular/core';

import { SkyTabComponent, SkyTabsetComponent } from '../';

@Component({
  selector: 'sky-test-cmp',
  template: `
<sky-tabset>
  <sky-tab
      [tabHeading]="tab1Heading"
      [active]="activeTab === 0"
  >
    <div class="tabset-test-content-1">
      {{tab1Content}}
    </div>
  </sky-tab>
  <sky-tab
      *ngIf="tab2Available"
      [tabHeading]="tab2Heading"
      [active]="activeTab === 1"
      (close)="closeTab2()"
  >
    <div class="tabset-test-content-2">
      {{tab2Content}}
    </div>
  </sky-tab>
  <sky-tab
      *ngIf="tab3Available"
      [tabHeading]="tab3Heading"
      [active]="activeTab === 2"
  >
    <div class="tabset-test-content-3">
      {{tab3Content}}
    </div>
  </sky-tab>
</sky-tabset>
  `,
  directives: [SkyTabComponent, SkyTabsetComponent]
})
export class TabsetTestComponent {
  public tab1Heading = 'Tab 1';

  public tab1Content: string;

  public tab2Heading = 'Tab 2';

  public tab2Content: string;

  public tab2Available = true;

  public tab3Heading = 'Tab 3';

  public tab3Content: string;

  public tab3Available = true;

  public activeTab = 0;

  public newTab() { }

  public openTab() { }

  public closeTab2() {
    this.tab2Available = false;
  }
}
