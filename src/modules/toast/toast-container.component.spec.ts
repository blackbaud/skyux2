import {
  TestBed
} from '@angular/core/testing';

import {
  BehaviorSubject
} from 'rxjs';

import {
  SkyToastService,
  SkyToastContainerComponent
} from '.';
import {
  SkyToastInstance
} from './types';

describe('Toast service', () => {
  let toastService: SkyToastService;
  let messages: BehaviorSubject<SkyToastInstance[]> = new BehaviorSubject([]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SkyToastService,
          useValue: {
            messages: messages
          }
        }
    ]});
    toastService = TestBed.get(SkyToastService);
  });

  it('should instantiate a toast container with its own subscription to the message list',
    (done: Function) => {
      let message: SkyToastInstance = new SkyToastInstance('My message', undefined, 'danger', [], () => {
        messages.next([]);
      });
      messages.next([message]);

      let container: SkyToastContainerComponent = new SkyToastContainerComponent(toastService);
      container.ngOnInit();
      container.messages.subscribe((value) => {
        expect(value[0]).toBe(message);
        done();
      });
  });
});
