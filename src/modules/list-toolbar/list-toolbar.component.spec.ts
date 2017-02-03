import {
  TestBed,
  async,
  ComponentFixture
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  ListState,
  ListStateDispatcher
} from '../list/state';
import { SkyListToolbarModule } from './';
import {
  ListToolbarTestComponent
} from './fixtures/list-toolbar.component.fixture';

import {
  ListToolbarItemModel
} from '../list/state';


import { expect } from '../testing';

describe('List Toolbar Component', () => {
  describe('List Toolbar Fixture', () => {
    let state: ListState,
        dispatcher: ListStateDispatcher,
        fixture: ComponentFixture<ListToolbarTestComponent>,
        nativeElement: HTMLElement,
        component: ListToolbarTestComponent,
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
      component = fixture.componentInstance;
    }));

    function initializeToolbar() {
      fixture.detectChanges();
      // always skip the first update to ListState, when state is ready
      // run detectChanges once more then begin tests
      state.skip(1).take(1).subscribe(() => fixture.detectChanges());
    }

    describe('search', () => {
      it('should be visible by default', async(() => {
        initializeToolbar();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          expect(element.query(By.css('input'))).not.toBeNull();
        });
      }));

      it('should be able to disable search', async(() => {
        component.searchEnabled = false;
        initializeToolbar();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          expect(element.query(By.css('input'))).toBeNull();
        });
      }));
    });

    it('should load custom items', async(() => {
      initializeToolbar();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        let items = element.queryAll(By.css('.sky-toolbar-item'));
        expect(items[0].nativeElement).toHaveText('');
        expect(items[1].query(By.css('input'))).not.toBeNull();
        expect(items[2].nativeElement).toHaveText('Custom Item');
        expect(items[3].nativeElement).toHaveText('Custom Item 2');
      });

    }));

    it('should display an empty render for a custom item without template', () => {

    });
  });
});
