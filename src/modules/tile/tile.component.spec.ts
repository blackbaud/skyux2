import {
  describe,
  it
} from 'angular2/testing';

import {Component} from 'angular2/core';
import {TileComponent} from './tile.component';

describe('Tile component', () => {
  it('should render the header text in the expected element', function () {
  });

  it('should collapse/expand when the header is clicked', function () {
  });

  it('should collapse/expand when the bb-tile-collapsed value changes', function () {
  });

  it('should update the tile state the tile dashboard is initialized', function () {
  });

  it('should notify the tile dashboard when the tile is collapsed', function () {
  });

  it('should notify the tile that repaint is required when the tile is expanded', function () {
  });

  it('should react when tile display mode changes', function () {
  });

  it(
    `should not update tile state when display mode changed but the tile have not
    been initialized by the tile dashboard`,
    function () {
    }
  );

  it(
    `should not update tile state when display mode changed but the tile have not
    been initialized by the tile dashboard`,
    function () {
    }
  );

  describe('settings button', function () {
    it('should be present only if a callback is provided', function () {
    });

    it('should call the specified callback when clicked', function () {
    });

    it('should not collapse the tile when clicked', function () {
    });
  });

  describe('section directive', function () {
    it('should add the expected CSS class to the element', function () {
    });
  });

  describe('header content directive', function () {
    it('should render header content next to the tile header', function () {
    });
  });

  describe('header check directive', function () {
    it('should render a check mark next to the tile header', function () {
    });
  });

  describe('dashboard directive', function () {
    it('should put the tile in the expected column for each breakpoint', function () {
    });

    it('should remove the media breakpoint listener when destroyed', function () {
    });

    it('should parse tile order when tile moves to another column', function () {
    });

    it('should parse tile order when tile moves within a column', function () {
    });

    it('should update the tile collapsed state when the tile is collapsed', function () {
    });

    it(
      'should update the tile collapsed small state when the tile is collapsed on a small screen',
      function () {
      }
    );

    it(
      'should update the all-collapsed state when a tile\'s collapsed state changes',
      function () {
      }
    );

    it(
      'should update the tile collapsed state when the tile all-collapsed attribute changes',
      function () {
      }
    );

    it(
      `should not update tile state when display mode changed but the tile collapse
      state is not changed by tile dashboard`,
      function () {
      }
    );

    it(
      `should not update tile state when display mode changed but the tile collapse state
      is not changed by tile dashboard and tile intialization occurs after dashboard
      initialization`,
      function () {
      }
    );

    it(
      `should update the tile collapsed small state when the tile all-collapsed
      attribute changes`,
      function () {
      }
    );
  });
});

@Component({
  selector: 'sky-test-cmp',
  directives: [TileComponent],
  template: ''
})
class TestComponent {
}
