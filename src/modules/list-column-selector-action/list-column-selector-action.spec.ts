import {
  TestBed,
  ComponentFixture,
  inject,
  async,
  fakeAsync,
  tick
} from '@angular/core/testing';

import {
  ListState,
  ListStateDispatcher
} from '../list/state';

import {
  SkyListModule,
  SkyListComponent
} from '../list';

import {
  SkyListToolbarModule
} from '../list-toolbar';

import {
  SkyListSecondaryActionsModule
} from '../list-secondary-actions';

import {
  SkyListViewGridModule
} from '../list-view-grid';

import {
  ListColumnSelectorActionTestComponent
} from './fixtures/list-column-selector-action.component.fixture';

import {
  SkyListColumnSelectorActionModule
} from '.';

import {
  SkyGridModule
} from '../grid';

import {
  expect
} from '../testing';

import {
  SkyModalService
} from '../modal';

import {
  SkyColumnSelectorModule
} from '../column-selector';

describe('List column selector action', () => {
  let state: ListState,
    dispatcher: ListStateDispatcher,
    component: ListColumnSelectorActionTestComponent,
    fixture: ComponentFixture<ListColumnSelectorActionTestComponent>,
    nativeElement: HTMLElement;

  beforeEach(async(() => {
    dispatcher = new ListStateDispatcher();
    state = new ListState(dispatcher);

    TestBed.configureTestingModule({
      declarations: [
        ListColumnSelectorActionTestComponent

      ],
      imports: [
        SkyListColumnSelectorActionModule,
        SkyListModule,
        SkyListToolbarModule,
        SkyListSecondaryActionsModule,
        SkyGridModule,
        SkyListViewGridModule,
        SkyColumnSelectorModule
      ]
    })
    .overrideComponent(SkyListComponent, {
        set: {
          providers: [
            { provide: ListState, useValue: state },
            { provide: ListStateDispatcher, useValue: dispatcher }
          ]
        }
      });

    fixture = TestBed.createComponent(ListColumnSelectorActionTestComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    fixture.detectChanges();

    // always skip the first update to ListState, when state is ready
    // run detectChanges once more then begin tests
    state.skip(1).take(1).subscribe(() => fixture.detectChanges());
    fixture.detectChanges();
  }));

  beforeEach(
    inject(
      [
        SkyModalService
      ],
      (
        _modalService: SkyModalService
      ) => {
        _modalService.dispose();
      }
    )
  );

  it('should show an action in the secondary actions dropdown', fakeAsync(() => {
    tick();
    fixture.detectChanges();
    tick();
    /* tslint:disable */
    let query =
      '.sky-list-toolbar-container .sky-toolbar-item .sky-list-secondary-actions .sky-dropdown .sky-dropdown-menu sky-list-secondary-action';
    /* tslint:enable */
    expect(nativeElement.querySelector(query)).toHaveText('Choose columns');
  }));

  function getChooseColumnsAction() {
    /* tslint:disable */
    return nativeElement.querySelector('.sky-list-toolbar-container .sky-toolbar-item .sky-list-secondary-actions .sky-dropdown .sky-dropdown-menu sky-list-secondary-action button') as HTMLElement;
    /* tslint:enable */
  }

  it('should open the appropriate modal on click and apply column changes on save',
    fakeAsync(() => {
    fixture.detectChanges();
    tick();

    getChooseColumnsAction().click();
    tick();

    let checkboxLabelEl =
      document
        .querySelectorAll('.sky-modal .sky-list-view-checklist-item input') as
        NodeListOf<HTMLElement>;

    expect(checkboxLabelEl.length).toBe(2);
    checkboxLabelEl.item(0).click();

    tick();

    let submitButtonEl =
      document.querySelector('.sky-modal .sky-btn-primary') as HTMLButtonElement;

    submitButtonEl.click();
    tick();

    component.grid.gridState.take(1).subscribe((gridState) => {
      expect(gridState.displayedColumns.items.length).toBe(2);
    });
    tick();

  }));

  it('should keep previous columns on cancel', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    getChooseColumnsAction().click();
    tick();

    let checkboxLabelEl =
      document.querySelector('.sky-modal .sky-list-view-checklist-item input') as HTMLElement;
    checkboxLabelEl.click();

    tick();

    let cancelButtonEl =
      document.querySelector('.sky-modal [sky-cmp-id="cancel"]') as HTMLButtonElement;

    cancelButtonEl.click();

    tick();

    component.grid.gridState.take(1).subscribe((gridState) => {
      expect(gridState.displayedColumns.items.length).toBe(3);
    });
    tick();

  }));

  it('should not appear if not in grid view', fakeAsync(() => {
    tick();
    dispatcher.viewsSetActive('other');
    tick();

    /* tslint:disable */
    let query =
      '.sky-list-toolbar-container .sky-toolbar-item .sky-list-secondary-actions .sky-dropdown .sky-dropdown-menu sky-list-secondary-action';
    /* tslint:enable */
    expect(nativeElement.querySelector(query)).toBeNull();
  }));
});
