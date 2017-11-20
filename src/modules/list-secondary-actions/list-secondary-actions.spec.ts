import {
  TestBed,
  async,
  ComponentFixture,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import {
  ListState,
  ListStateDispatcher
} from '../list/state';
import { SkyListToolbarModule } from '../list-toolbar';

import {
  ListSecondaryActionsTestComponent
} from './fixtures/list-secondary-actions.component.fixture';
import { expect } from '../testing';

import {
  SkyListSecondaryActionsModule
} from '.';

describe('List Secondary Actions Component', () => {

  describe('secondary actions', () => {
     let state: ListState,
        dispatcher: ListStateDispatcher,
        fixture: ComponentFixture<ListSecondaryActionsTestComponent>,
        nativeElement: HTMLElement,
        component: ListSecondaryActionsTestComponent,
        element: DebugElement;

    beforeEach(async(() => {
      dispatcher = new ListStateDispatcher();
      state = new ListState(dispatcher);

      TestBed.configureTestingModule({
        declarations: [
          ListSecondaryActionsTestComponent
        ],
        imports: [
          SkyListToolbarModule,
          SkyListSecondaryActionsModule
        ],
        providers: [
          { provide: ListState, useValue: state },
          { provide: ListStateDispatcher, useValue: dispatcher }
        ]
      });

      fixture = TestBed.createComponent(ListSecondaryActionsTestComponent);
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

    it('should show secondary actions when specified', async(() => {
      initializeToolbar();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();

        /* tslint:disable:max-line-length */
        let query =
          '.sky-list-toolbar-container .sky-toolbar-item .sky-list-secondary-actions .sky-dropdown .sky-dropdown-menu sky-list-secondary-action';
        /* tslint:enable:max-line-length */
        expect(nativeElement.querySelector(query)).not.toBeNull();
      });
    }));

    it('should hide secondary actions when no child actions available', fakeAsync(() => {
      component.showOption = false;
      initializeToolbar();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(component.secondaryActions.dropdownHidden.valueOf()).toBe(true);

      component.showOption = true;
      fixture.detectChanges();
      tick();

      expect(component.secondaryActions.dropdownHidden.valueOf()).toBe(false);
    }));
  });
});
