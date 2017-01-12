import {
  TestBed
} from '@angular/core/testing';

import { DropdownTestComponent } from './fixtures/dropdown.component.fixture';
import { SkyDropdownFixturesModule } from './fixtures/dropdown-fixtures.module';

import { expect } from '../testing';

describe('Dropdown menu item component', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          SkyDropdownFixturesModule
        ]
      });
    });

    function getMenuItem(el: Element) {
      return <HTMLElement>el.querySelector('sky-dropdown-item');
    }

    it('should have a role of type "menuitem"', () => {
      let fixture = TestBed.createComponent(DropdownTestComponent);
      let el: Element = fixture.nativeElement;

      fixture.detectChanges();

      expect(getMenuItem(el).getAttribute('role')).toBe('menuitem');
    });
});
