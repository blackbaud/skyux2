import {
  TestBed,
  async
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  ListState,
  ListStateDispatcher
} from '../list/state';
import { ListViewsLoadAction } from '../list/state/views/actions';
import { ListViewModel } from '../list/state/views/view.model';
import { SkyListToolbarModule } from './';
import {
  ListToolbarTestComponent
} from './fixtures/list-toolbar.component.fixture';

describe('List Toolbar Component', () => {
  describe('List Toolbar Fixture', () => {
    let state: ListState,
        dispatcher: ListStateDispatcher,
        fixture: any,
        nativeElement: HTMLElement,
        element: DebugElement;

    beforeEach(async(() => {
      dispatcher = new ListStateDispatcher();
      state = new ListState(dispatcher);

      TestBed.configureTestingModule({
        declarations: [
          ListToolbarTestComponent
        ],
        imports: [
          SkyListToolbarModule
        ],
        providers: [
          { provide: ListState, useValue: state },
          { provide: ListStateDispatcher, useValue: dispatcher }
        ]
      });

      fixture = TestBed.createComponent(ListToolbarTestComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      element = fixture.debugElement as DebugElement;
      fixture.detectChanges();

      // always skip the first update to ListState, when state is ready
      // run detectChanges once more then begin tests
      state.skip(1).take(1).subscribe(() => fixture.detectChanges());
    }));

    describe('search', () => {
      it('should be visible by default', () => {
        expect(element.query(By.css("[cmp-id='search']"))).not.toBeNull();
      });
    });

    it('should load custom items', () => {
      fixture.detectChanges();
      expect(element.query(
        By.css('[cmp-id="custom-item"]')).nativeElement.textContent.trim()
      ).toContain('Custom Item');
    });

    it('should display an empty render for a custom item without template', () => {
      fixture.detectChanges();
      expect(element.query(
        By.css('[cmp-id="custom-item-no-template"]')
      ).nativeElement.textContent.trim()).toBe('');
    });
  });
});
