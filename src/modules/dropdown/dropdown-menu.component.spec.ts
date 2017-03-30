import {
  TestBed
} from '@angular/core/testing';

import { DropdownTestComponent } from './fixtures/dropdown.component.fixture';
import { SkyDropdownFixturesModule } from './fixtures/dropdown-fixtures.module';

import { expect } from '../testing';

describe('Dropdown menu component', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          SkyDropdownFixturesModule
        ]
      });
    });

    function getMenu(el: Element) {
      return <HTMLElement>el.querySelector('sky-dropdown-menu');
    }

    it('should have a role of type "menu"', () => {
      let fixture = TestBed.createComponent(DropdownTestComponent);
      let el: Element = fixture.nativeElement;

      fixture.detectChanges();

      expect(getMenu(el).getAttribute('role')).toBe('menu');
    });
});
