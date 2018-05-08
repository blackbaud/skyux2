import {
  TestBed
} from '@angular/core/testing';

import {
  BehaviorSubject
} from 'rxjs';

import {
  SkyToastService,
  SkyToasterComponent
} from '.';
import {
  SkyToastInstance
} from './types';

describe('Toaster component', () => {
  let toastService: SkyToastService;
  let toastInstances: BehaviorSubject<SkyToastInstance[]> = new BehaviorSubject([]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SkyToastService,
          useValue: {
            toastInstances: toastInstances
          }
        }
    ]});
    toastService = TestBed.get(SkyToastService);
  });

  it('should instantiate a toaster with its own subscription to the toastInstance list',
    (done: Function) => {
      let instance: SkyToastInstance = new SkyToastInstance('My message', undefined, 'danger', []);
      instance.isClosed.subscribe(() => {
        toastInstances.next([]);
      });
      toastInstances.next([instance]);

      let container: SkyToasterComponent = new SkyToasterComponent(toastService);
      container.ngOnInit();
      container.toastInstances.subscribe((value) => {
        expect(value[0]).toBe(instance);
        done();
      });
  });
});
