import { Component } from '@angular/core';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './tile.component.fixture.html'
})
export class TileTestComponent {
  public tileIsCollapsed = false;
  public collapsedOutputCalled = false;

  public tileSettingsClick(): void { }

  public collapsedStateCallback(isCollapsed: boolean): void {
    this.collapsedOutputCalled = isCollapsed;
  }
}
