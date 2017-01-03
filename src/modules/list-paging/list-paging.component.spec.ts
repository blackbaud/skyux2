import {
  TestBed,
  async
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import {
  ListState,
  ListStateDispatcher
} from '../list/state';
import { SkyListPagingModule } from './';
import {
  ListPagingTestComponent
} from './fixtures/list-paging.component.fixture';

describe('List Paging Component', () => {
  let state: ListState,
      dispatcher: ListStateDispatcher,
      component: ListPagingTestComponent,
      fixture: any,
      nativeElement: HTMLElement,
      element: DebugElement;

  beforeEach(async(() => {
    dispatcher = new ListStateDispatcher();
    state = new ListState(dispatcher);

    TestBed.configureTestingModule({
      declarations: [
        ListPagingTestComponent
      ],
      imports: [
        SkyListPagingModule
      ],
      providers: [
        { provide: ListState, useValue: state },
        { provide: ListStateDispatcher, useValue: dispatcher }
      ]
    });

    fixture = TestBed.createComponent(ListPagingTestComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    element = fixture.debugElement as DebugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();

    // always skip the first update to ListState, when state is ready
    // run detectChanges once more then begin tests
    state.skip(1).take(1).subscribe(() => fixture.detectChanges());
  }));

  describe('Only test state changes and expected result here', () => {

  });
});
