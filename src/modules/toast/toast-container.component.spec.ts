import { TestBed } from '@angular/core/testing';
import { SkyToastService, SkyToastContainerComponent } from '.';
import { SkyToastMessage } from '../../../dist/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

describe('Toast service', () => {
    let toastService: SkyToastService;
    let messages: BehaviorSubject<SkyToastMessage[]> = new BehaviorSubject([]);
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: SkyToastService,
                    useValue: {
                        getMessages: messages.asObservable()
                    }
                }
        ]});
        toastService = TestBed.get(SkyToastService);
    });

    it('should instantiate a toast container with its own subscription to the message list',
        (done: Function) => {
            let message: SkyToastMessage = new SkyToastMessage('My message', undefined, 'danger', () => {
                messages.next([]);
            }, []);
            messages.next([message]);

            let container: SkyToastContainerComponent = new SkyToastContainerComponent(toastService);
            container.ngOnInit();
            container.messages.subscribe((value) => {
                expect(value[0]).toBe(message);
                done();
            });
    });
});
