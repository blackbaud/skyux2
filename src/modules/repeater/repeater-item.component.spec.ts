import {
  beforeEach,
  ComponentFixture,
  describe,
  expect,
  it,
  inject,
  TestComponentBuilder
} from 'angular2/testing';

import {Component} from 'angular2/core';
import {SkyRepeaterComponent} from './repeater.component';
import {SkyRepeaterItemComponent} from './repeater-item.component';

describe('Repeater item component', () => {
  let tcb: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
    tcb = _tcb;
  }));

  xit('should remove the corresponding item from DOM when item is removed', () => {
  });

  xit('should add the appropriate class to an item when a context menu is present', () => {
  });

  xit('should enable expand/collapse animation only after an item is initially rendered', () => {
  });

  xdescribe('with expand mode of "single"', () => {
    it('should collapse other items when an item is expanded', () => {
    });
  });

  xdescribe('with expand mode of "multiple"', () => {
    it('should not collapse other items when an item is expanded', () => {
    });
  });

  describe('with expand mode of "none"', () => {
    it('should not allow items to be collapsed', () => {
    });

    it('should hide each item\'s chevron button', () => {
    });

    it('should expand all items when mode was previously set to "single" or "multiple"', () => {
    });
  });
});

@Component({
  selector: 'sky-test-cmp',
  directives: [SkyRepeaterComponent, SkyRepeaterItemComponent],
  template: `
<sky-repeater sky-repeater-expand-mode="{{expandMode}}">
  <sky-repeater-item>
    <sky-repeater-item-context-menu ng-if="showContextMenu">
      <sky-context-menu>
      </sky-context-menu>
    </sky-repeater-item-context-menu>
    <sky-repeater-item-title>Title 1</sky-repeater-item-title>
    <sky-repeater-item-content>Content 1</sky-repeater-item-content>
  </sky-repeater-item>
  <sky-repeater-item>
    <sky-repeater-item-context-menu ng-if="showContextMenu">
      <sky-context-menu>
      </sky-context-menu>
    </sky-repeater-item-context-menu>
    <sky-repeater-item-title>Title 2</sky-repeater-item-title>
    <sky-repeater-item-content>Content 2</sky-repeater-item-content>
  </sky-repeater-item>
  <sky-repeater-item ng-if="!removeLastItem">
    <sky-repeater-item-context-menu ng-if="showContextMenu">
      <sky-context-menu>
      </sky-context-menu>
    </sky-repeater-item-context-menu>
    <sky-repeater-item-title>Title 3</sky-repeater-item-title>
    <sky-repeater-item-content>Content 3</sky-repeater-item-content>
  </sky-repeater-item>
</sky-repeater>`
})
class TestComponent {
  public showContextMenu: boolean;
  public expandMode: string;
}
