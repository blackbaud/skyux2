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
import { ListItemModel } from '../list/state/items/item.model';
import { ListItemsLoadAction } from '../list/state/items/actions';
import {
  ListSelectedSetItemsSelectedAction, ListSelectedSetItemSelectedAction
} from '../list/state/selected/actions';
import { SkyListActionBarModule } from './';
import {
  ListActionBarTestComponent
} from './fixtures/list-action-bar.component.fixture';
import {
  ListActionBarObservableTestComponent
} from './fixtures/list-action-bar-observable.component.fixture';
import {
  ListActionBarHiddenTestComponent
} from './fixtures/list-action-bar-hidden.component.fixture';

describe('List Action Bar Component', () => {
  describe('List Action Bar Fixture', () => {
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
          ListActionBarTestComponent
        ],
        imports: [
          SkyListActionBarModule
        ],
        providers: [
          { provide: ListState, useValue: state },
          { provide: ListStateDispatcher, useValue: dispatcher }
        ]
      });

      fixture = TestBed.createComponent(ListActionBarTestComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      element = fixture.debugElement as DebugElement;
      fixture.detectChanges();

      // always skip the first update to ListState, when state is ready
      // run detectChanges once more then begin tests
      state.skip(1).take(1).subscribe(() => fixture.detectChanges());
    }));

    describe('Action bar items', () => {
      it('Action bar items should be visible', () => {
        expect(element.query(By.css("[id='item1-button']"))).not.toBeNull();
        expect(element.query(By.css("[id='item2-link']"))).not.toBeNull();
        expect(element.query(By.css("[id='item3-input-template']"))).not.toBeNull();
        expect(element.query(By.css("[id='item4-no-template']"))).not.toBeNull();
      });
    });

    describe('action bar function tests', () => {
      let items: Array<ListItemModel>;

      beforeEach(async(() => {
        items = new Array<ListItemModel>(
          new ListItemModel('id1'),
          new ListItemModel('id2'),
          new ListItemModel('id3'),
          new ListItemModel('id4'),
          new ListItemModel('id5'),
        );
          dispatcher.next(new ListItemsLoadAction(items, true));
          fixture.detectChanges();
      }));

      it('selected item count should be 1', () => {
        dispatcher.next(new ListSelectedSetItemSelectedAction('id1', true));
        fixture.detectChanges();

        let el = element.query(By.css("[id='item3-input-template']")).nativeElement;

        expect(el.textContent.trim()).toBe('1');
      });

      it('SelectAll changes all items to selected', () => {
        let el = element.query(By.css("[id='btn']"));
        el.nativeElement.click();
        fixture.detectChanges();

        let count = element.query(By.css("[id='item3-input-template']")).nativeElement;
        expect(count.textContent.trim()).toBe('5');

      });

      it('ClearAll changes all items to not selected', () => {
        dispatcher.next(new ListSelectedSetItemsSelectedAction(items.map(i => i.id), true));
        fixture.detectChanges();

        let count = element.query(By.css("[id='item3-input-template']")).nativeElement;
        expect(count.textContent.trim()).toBe('5');

        let el = element.query(By.css("[id='link']"));
        el.nativeElement.click();
        fixture.detectChanges();

        expect(count.textContent.trim()).toBe('0');
      });
    });
  });

  describe('List Action Bar Observable Fixture', () => {
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
          ListActionBarObservableTestComponent
        ],
        imports: [
          SkyListActionBarModule
        ],
        providers: [
          { provide: ListState, useValue: state },
          { provide: ListStateDispatcher, useValue: dispatcher }
        ]
      });

      fixture = TestBed.createComponent(ListActionBarObservableTestComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      element = fixture.debugElement as DebugElement;
      fixture.detectChanges();

      // always skip the first update to ListState, when state is ready
      // run detectChanges once more then begin tests
      state.skip(1).take(1).subscribe(() => fixture.detectChanges());
    }));

    describe('Action bar items', () => {
      let items: Array<ListItemModel>;

      beforeEach(async(() => {
        items = new Array<ListItemModel>(
          new ListItemModel('id1'),
          new ListItemModel('id2'),
          new ListItemModel('id3'),
          new ListItemModel('id4'),
          new ListItemModel('id5'),
        );
          dispatcher.next(new ListItemsLoadAction(items, true));
          fixture.detectChanges();
      }));

      it('Action bar items should be visible', () => {
        expect(element.query(By.css("[id='item1-button']"))).not.toBeNull();
        expect(element.query(By.css("[id='item2-link']"))).not.toBeNull();
        expect(element.query(By.css("[id='item3-input-template']"))).not.toBeNull();
        expect(element.query(By.css("[id='item4-no-template']"))).not.toBeNull();
      });
    });
  });

  describe('List Action Bar Hidden Fixture', () => {
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
          ListActionBarHiddenTestComponent
        ],
        imports: [
          SkyListActionBarModule
        ],
        providers: [
          { provide: ListState, useValue: state },
          { provide: ListStateDispatcher, useValue: dispatcher }
        ]
      });

      fixture = TestBed.createComponent(ListActionBarHiddenTestComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      element = fixture.debugElement as DebugElement;
      fixture.detectChanges();

      // always skip the first update to ListState, when state is ready
      // run detectChanges once more then begin tests
      state.skip(1).take(1).subscribe(() => fixture.detectChanges());
    }));

    describe('Action bar items', () => {
      it('Action bar items should not display', () => {
        let el = element.query(By.css('sky-list-action-bar')).nativeElement as HTMLElement;
        expect(el.children.length).toBe(0);
      });
    });
  });
});
