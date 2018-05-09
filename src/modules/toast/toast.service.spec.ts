import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injector
} from '@angular/core';
import {
  TestBed
} from '@angular/core/testing';

import {
  SkyWindowRefService
} from '../window';

import {
  SkyToastService
} from './toast.service';
import {
  SkyToastAdapterService
} from './toast-adapter.service';
import {
  SkyToastInstance
} from './toast-instance';

describe('Toast service', () => {
  class TestComponent { constructor(public message: SkyToastInstance) { } }
  let toastService: SkyToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SkyToastService,
        {
          provide: SkyToastAdapterService,
          useValue: {
            appendToBody() { },
            removeHostElement() { }
          }
        },
        {
          provide: ApplicationRef,
          useValue: {
            attachView() {},
            detachView() {}
          }
        },
        Injector,
        {
          provide: ComponentFactoryResolver,
          useValue: {
            resolveComponentFactory() {
              return {
                create() {
                  return {
                    destroy() {},
                    hostView: {
                      rootNodes: [
                        {}
                      ]
                    },
                    instance: {
                      messageStream: {
                        take() {
                          return {
                            subscribe() { }
                          };
                        },
                        next() {}
                      },
                      attach() {
                        return {
                          close() { },
                          closed: {
                            take() {
                              return {
                                subscribe() { }
                              };
                            }
                          }
                        };
                      }
                    }
                  };
                }
              };
            }
          }
        },
        SkyWindowRefService
      ]
    });
    toastService = TestBed.get(SkyToastService);
  });

  it('should only create a single host component', () => {
      const spy = spyOn(toastService as any, 'createHostComponent').and.callThrough();
      toastService.openMessage('message');
      toastService.openMessage('message');
      expect(spy.calls.count()).toEqual(1);
  });

  it('should return an instance with a close method', () => {
      const toast = toastService.openMessage('message');
      expect(typeof toast.close).toEqual('function');
  });

  it('should expose a method to remove the toast from the DOM', () => {
      let message: SkyToastInstance = toastService.openMessage('message');
      const spy = spyOn(message, 'close').and.callThrough();
      toastService.ngOnDestroy();
      expect(spy).toHaveBeenCalledWith();
  });

  describe('openMessage() method', () => {
    it('should open a toast with the given message and configuration', function() {
      let internalMessage: SkyToastInstance = toastService.openMessage('Real message', {toastType: 'danger'});

      expect(internalMessage).toBeTruthy();
      expect(internalMessage.message).toBe('Real message');
      expect(internalMessage.toastType).toBe('danger');

      expect(internalMessage.close).toBeTruthy();

      let isClosedCalled = false;
      internalMessage.isClosed.subscribe(() => isClosedCalled = true);

      expect(internalMessage.isOpen).toBeTruthy();
      expect(isClosedCalled).toBeFalsy();
    });

    it('should remove message from queue when the message is closed', function(done: Function) {
      let internalMessage: SkyToastInstance = toastService.openMessage('My message', {toastType: 'danger'});

      let isClosedCalled = false;
      internalMessage.isClosed.subscribe(() => isClosedCalled = true);

      internalMessage.close();
      internalMessage.isClosed.next();
      setTimeout(() => {
          toastService.toastInstances.subscribe((value) => {
            if (!internalMessage.isOpen) {
              expect(value.length).toBe(0);
            }
          });
          expect(internalMessage.isOpen).toBeFalsy();
          expect(isClosedCalled).toBeTruthy();
          done();
      }, 600);
    });

    it('should not error when closing an already closed message', function(done: Function) {
      let internalMessage: SkyToastInstance = toastService.openMessage('My message', {toastType: 'danger'});
      internalMessage.close();
      setTimeout(() => {
          try {
            internalMessage.close();
          } catch (error) {
            fail();
          }
          done();
      }, 600);
    });

    it('should open specific toast types', function () {
      let infoMessage = toastService.openMessage('info message', {toastType: 'info'});
      let warningMessage = toastService.openMessage('warning message', {toastType: 'warning'});
      let dangerMessage = toastService.openMessage('danger message', {toastType: 'danger'});
      let successMessage = toastService.openMessage('success message', {toastType: 'success'});

      expect(infoMessage.toastType).toBe('info');
      expect(warningMessage.toastType).toBe('warning');
      expect(dangerMessage.toastType).toBe('danger');
      expect(successMessage.toastType).toBe('success');
    });

    it('should open info toast type when no or an unknown type is supplied', function () {
      let emptyType: SkyToastInstance = toastService.openMessage('info message');
      expect(emptyType.toastType).toBe('info');
    });
  });

  describe('openTemplatedMessage() method', () => {
    it('should open a custom toast with the given component type and configuration', function() {
      let internalMessage: SkyToastInstance = toastService.openTemplatedMessage(TestComponent, {toastType: 'danger'});

      expect(internalMessage).toBeTruthy();
      expect(internalMessage.message).toBeFalsy();
      expect(internalMessage.customComponentType).toBeTruthy();
      expect(internalMessage.toastType).toBe('danger');

      expect(internalMessage.close).toBeTruthy();

      let isClosedCalled = false;
      internalMessage.isClosed.subscribe(() => isClosedCalled = true);

      expect(internalMessage.isOpen).toBeTruthy();
      expect(isClosedCalled).toBeFalsy();
    });

    it('should open a custom toast with the given component type and configuration', function() {
      let internalMessage: SkyToastInstance = toastService.openTemplatedMessage(TestComponent, {toastType: 'danger'});

      expect(internalMessage).toBeTruthy();
      expect(internalMessage.message).toBeFalsy();
      expect(internalMessage.customComponentType).toBeTruthy();
      expect(internalMessage.toastType).toBe('danger');

      expect(internalMessage.close).toBeTruthy();

      let isClosedCalled = false;
      internalMessage.isClosed.subscribe(() => isClosedCalled = true);

      expect(internalMessage.isOpen).toBeTruthy();
      expect(isClosedCalled).toBeFalsy();
    });
  });
});
