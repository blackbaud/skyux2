import { Component } from '@angular/core';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './tabset.component.fixture.html'
})
export class TabsetTestComponent {
  public tab1Heading = 'Tab 1';

  public tab1Content: string;

  public tab2Heading = 'Tab 2';

  public tab2Content: string;

  public tab2Available = true;

  public tab2Disabled = false;

  public tab3Heading = 'Tab 3';

  public tab3Content: string;

  public tab3Available = true;

  public activeTab = 0;

  public tabMaxWidth = 2000;

  public newTab() { }

  public openTab() { }

  public closeTab2() {
    this.tab2Available = false;
  }
}
