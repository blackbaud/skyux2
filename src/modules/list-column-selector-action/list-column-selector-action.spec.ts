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
        SkyListViewGridModule

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

    // it('should handle grid columns changing', () => {
    //   expect(element.queryAll(By.css('th.sky-grid-heading')).length).toBe(2);
    //   expect(element.query(
    //     By.css('th[sky-cmp-id="name"]')).nativeElement.textContent.trim()
    //   ).toBe('Name Initial');
    //   expect(element.query(
    //     By.css('th[sky-cmp-id="email"]')
    //   ).nativeElement.textContent.trim()).toBe('Email Initial');

    //   component.changeColumns();
    //   fixture.detectChanges();
    //   expect(element.queryAll(By.css('th.sky-grid-heading')).length).toBe(2);
    //   expect(element.query(
    //     By.css('th[sky-cmp-id="name"]')).nativeElement.textContent.trim()
    //   ).toBe('Name');
    //   expect(element.query(
    //     By.css('th[sky-cmp-id="email"]')
    //   ).nativeElement.textContent.trim()).toBe('Email');

    // });
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

  it('should open the appropriate modal on click and apply column changes on save', () => {
    tick();
    fixture.detectChanges();
    tick();

    getChooseColumnsAction().click();
    tick();
    fixture.detectChanges();

    nativeElement.querySelector(query)
    expect(nativeElement.querySelector(query)).toHaveText('Choose columns');
  });

  it('should keep previous columns on cancel', () => {

  });

  it('should not appear if not in grid view', () => {

  });
});
