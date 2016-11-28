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
import { ListSortLabelModel } from '../list/state/sort/label.model';
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

    describe('sort selector', () => {
      beforeEach(async(() => {
        dispatcher.sortSetAvailable([
          new ListSortLabelModel({
            text: 'Status',
            fieldType: 'string',
            fieldSelector: 'status',
            global: true
          }),
          new ListSortLabelModel({
            text: 'Date',
            fieldType: 'date',
            fieldSelector: 'date',
            global: true
          }),
          new ListSortLabelModel({
            text: 'Number',
            fieldType: 'number',
            fieldSelector: 'number',
            global: true
          }),
          new ListSortLabelModel({
            text: 'Custom',
            fieldType: 'custom',
            fieldSelector: 'custom',
            global: true
          })
        ]);

        fixture.detectChanges();
      }));

      it('should display when sort provided', () => {
        expect(element.query(
          By.css("sky-list-toolbar-item-renderer[cmp-id='search']")
        )).not.toBeNull();
      });

      it('should display custom global sorts from template', () => {
        expect(element.query(
          By.css("sky-dropdown-item[cmp-id='custom_asc']")
        )).not.toBeNull();
      });

      it('should create ascending and descending items for each sort label', async(() => {
        expect(element.query(
          By.css("sky-dropdown-item[cmp-id='status_asc']")
        )).not.toBeNull();
        expect(element.query(
          By.css("sky-dropdown-item[cmp-id='status_desc']")
        )).not.toBeNull();
        expect(element.query(
          By.css("sky-dropdown-item[cmp-id='date_asc']")
        )).not.toBeNull();
        expect(element.query(
          By.css("sky-dropdown-item[cmp-id='date_desc']")
        )).not.toBeNull();
        expect(element.query(
          By.css("sky-dropdown-item[cmp-id='number_asc']")
        )).not.toBeNull();
        expect(element.query(
          By.css("sky-dropdown-item[cmp-id='number_desc']")
        )).not.toBeNull();
      }));

      it('should use "A-Z" and "Z-A" for string sort labels', async(() => {
        expect(element.query(
          By.css("sky-dropdown-item[cmp-id='status_asc']")
        ).nativeElement.textContent).toContain('A-Z');
        expect(element.query(
          By.css("sky-dropdown-item[cmp-id='status_desc']")
        ).nativeElement.textContent).toContain('Z-A');
      }));

      it('should use "newest first" and "oldest first" for date sort labels', async(() => {
        expect(element.query(
          By.css("sky-dropdown-item[cmp-id='date_asc']")
        ).nativeElement.textContent).toContain('newest first');
        expect(element.query(
          By.css("sky-dropdown-item[cmp-id='date_desc']")
        ).nativeElement.textContent).toContain('oldest first');
      }));

      it('should use "lowest first" and "highest first" for number sort labels', async(() => {
        expect(element.query(
          By.css("sky-dropdown-item[cmp-id='number_asc']")
        ).nativeElement.textContent).toContain('lowest first');
        expect(element.query(
          By.css("sky-dropdown-item[cmp-id='number_desc']")
        ).nativeElement.textContent).toContain('highest first');
      }));

      it('should use "ascending" and "descending" for number sort labels', async(() => {
        expect(element.query(
          By.css("sky-dropdown-item[cmp-id='custom_asc']")
        ).nativeElement.textContent).toContain('ascending');
        expect(element.query(
          By.css("sky-dropdown-item[cmp-id='custom_desc']")
        ).nativeElement.textContent).toContain('descending');
      }));

      it('should show selected sort with a different style', async(() => {
        let sortSelector = element.query(
          By.css('sky-list-toolbar-item-renderer[cmp-id="sort-selector"]')
        );
        let sortSelectorButton = sortSelector.query(By.css('.sky-dropdown-button'));
        sortSelectorButton.triggerEventHandler('click', undefined);

        sortSelector.query(
          By.css('sky-dropdown-item[cmp-id="status_desc"] button')
        ).triggerEventHandler('click', undefined);
        fixture.detectChanges();
        expect(sortSelector.query(
          By.css('sky-dropdown-item[cmp-id="status_desc"]')
        ).nativeElement.classList.contains('selected')).toBe(true);

        sortSelector.query(
          By.css('sky-dropdown-item[cmp-id="status_asc"] button')
        ).triggerEventHandler('click', undefined);
        fixture.detectChanges();
        expect(sortSelector.query(
          By.css('sky-dropdown-item[cmp-id="status_asc"]')
        ).nativeElement.classList.contains('selected')).toBe(true);
      }));
    });

    describe('view selector', () => {
      it('should not display when there is one or no views', () => {
        expect(element.query(
          By.css('sky-list-toolbar-item-renderer[cmp-id="view-selector"]')
        ).nativeElement.textContent.trim()).toBe('');
      });

      describe('with views', () => {
        beforeEach(async(() => {
          dispatcher.next(new ListViewsLoadAction([
            new ListViewModel('test1', 'test1'),
            new ListViewModel('test2', 'test2')
          ]));

          fixture.detectChanges();
        }));

        it('should display when there is more than one view', () => {
          expect(element.query(By.css('sky-dropdown-item[cmp-id="test1"]'))).not.toBeNull();
          expect(element.query(By.css('sky-dropdown-item[cmp-id="test2"]'))).not.toBeNull();
        });

        it('should show selected view with a different style', async(() => {
          let viewSelector = element.query(
            By.css('sky-list-toolbar-item-renderer[cmp-id="view-selector"]')
          );
          let viewSelectorButton = viewSelector.query(By.css('.sky-dropdown-button'));
          viewSelectorButton.triggerEventHandler('click', undefined);
          viewSelector.query(
            By.css('sky-dropdown-item[cmp-id="test2"] button')
          ).triggerEventHandler('click', undefined);
          fixture.detectChanges();

          expect(viewSelector.query(
            By.css('sky-dropdown-item[cmp-id="test2"]')
          ).nativeElement.classList.contains('selected')).toBe(true);
        }));
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
