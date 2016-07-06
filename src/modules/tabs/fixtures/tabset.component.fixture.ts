import { Component } from '@angular/core';

import { SkyTabComponent, SkyTabsetComponent } from '../';

@Component({
  selector: 'sky-test-cmp',
  template: `
<sky-tabset>
  <sky-tab [tabHeading]="tab1Heading" [active]="activeTab === 0">
    <div class="tabset-test-content-1">
      {{tab1Content}}
    </div>
  </sky-tab>
  <sky-tab [tabHeading]="tab2Heading" [active]="activeTab === 1">
    <div class="tabset-test-content-2">
      {{tab2Content}}
    </div>
  </sky-tab>
  <sky-tab [tabHeading]="tab3Heading" [active]="activeTab === 2">
    <div class="tabset-test-content-3">
      {{tab3Content}}
    </div>
  </sky-tab>
</sky-tabset>
  `,
  directives: [SkyTabComponent, SkyTabsetComponent]
})
export class TabsetTestComponent {
  public tab1Heading: string;

  public tab1Content: string;

  public tab2Heading: string;

  public tab2Content: string;

  public tab3Heading: string;

  public tab3Content: string;

  public activeTab = 0;

  public newTab() { }

  public openTab() { }
}
