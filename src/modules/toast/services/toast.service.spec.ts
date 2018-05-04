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
} from '../../window';

import {
  SkyToastService
} from './toast.service';
import {
  SkyToastAdapterService
} from './toast-adapter.service';
import {
  SkyToastConfig,
  SkyToastType,
  SkyToastInstance
} from '../types';

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
      toastService.open({message: 'message'});
      toastService.open({message: 'message'});
      expect(spy.calls.count()).toEqual(1);
  });

  it('should return an instance with a close method', () => {
      const toast = toastService.open({message: 'message'});
      expect(typeof toast.close).toEqual('function');
  });

  it('should expose a method to remove the toast from the DOM', () => {
      let message: SkyToastInstance = toastService.open({message: 'message'});
      const spy = spyOn(message, 'close').and.callThrough();
      toastService.ngOnDestroy();
      expect(spy).toHaveBeenCalledWith();
  });

  describe('openMessage() method', () => {
    it('should open a toast with the given message and configuration', function() {
      let configuration: SkyToastConfig = {
        toastType: SkyToastType.Danger,
        message: 'fake message'
      };
      let internalMessage: SkyToastInstance = toastService.openMessage('Real message', configuration);

      expect(internalMessage).toBeTruthy();
      expect(internalMessage.message).toBe('Real message');
      expect(internalMessage.toastType).toBe('danger');

      expect(internalMessage.close).toBeTruthy();

      let isClosingCalled = false;
      let isClosedCalled = false;
      internalMessage.isClosing.subscribe(() => isClosingCalled = true);
      internalMessage.isClosed.subscribe(() => isClosedCalled = true);

      expect(isClosingCalled).toBeFalsy();
      expect(isClosedCalled).toBeFalsy();
    });
  });

  describe('openCustom() method', () => {
    it('should open a custom toast with the given component type and configuration', function() {
      let configuration: SkyToastConfig = {
        message: 'fake message',
        toastType: SkyToastType.Danger
      };

      let internalMessage: SkyToastInstance = toastService.openTemplatedMessage(TestComponent, configuration);

      expect(internalMessage).toBeTruthy();
      expect(internalMessage.message).toBeFalsy();
      expect(internalMessage.customComponentType).toBeTruthy();
      expect(internalMessage.toastType).toBe('danger');

      expect(internalMessage.close).toBeTruthy();

      let isClosingCalled = false;
      let isClosedCalled = false;
      internalMessage.isClosing.subscribe(() => isClosingCalled = true);
      internalMessage.isClosed.subscribe(() => isClosedCalled = true);

      expect(isClosingCalled).toBeFalsy();
      expect(isClosedCalled).toBeFalsy();
    });
  });

  describe('open() method', () => {
    it('should open a toast with the given message and configuration', function() {
      let configuration: SkyToastConfig = {
        toastType: SkyToastType.Danger,
        message: 'My message'
      };

      let internalMessage: SkyToastInstance = toastService.open(configuration);

      expect(internalMessage).toBeTruthy();
      expect(internalMessage.message).toBe('My message');
      expect(internalMessage.customComponentType).toBeFalsy();
      expect(internalMessage.toastType).toBe('danger');

      expect(internalMessage.close).toBeTruthy();

      let isClosingCalled = false;
      let isClosedCalled = false;
      internalMessage.isClosing.subscribe(() => isClosingCalled = true);
      internalMessage.isClosed.subscribe(() => isClosedCalled = true);

      expect(isClosingCalled).toBeFalsy();
      expect(isClosedCalled).toBeFalsy();
    });

    it('should open a custom toast with the given component type and configuration', function() {
      let configuration: SkyToastConfig = {
        toastType: SkyToastType.Danger,
        customComponentType: TestComponent
      };

      let internalMessage: SkyToastInstance = toastService.open(configuration);

      expect(internalMessage).toBeTruthy();
      expect(internalMessage.message).toBeFalsy();
      expect(internalMessage.customComponentType).toBeTruthy();
      expect(internalMessage.toastType).toBe('danger');

      expect(internalMessage.close).toBeTruthy();

      let isClosingCalled = false;
      let isClosedCalled = false;
      internalMessage.isClosing.subscribe(() => isClosingCalled = true);
      internalMessage.isClosed.subscribe(() => isClosedCalled = true);

      expect(isClosingCalled).toBeFalsy();
      expect(isClosedCalled).toBeFalsy();
    });

    it('should remove message from queue when the message is closed', function(done: Function) {
      let configuration: SkyToastConfig = {
        toastType: SkyToastType.Danger,
        message: 'My message'
      };

      let internalMessage: SkyToastInstance = toastService.open(configuration);

      let isClosingCalled = false;
      let isClosedCalled = false;
      internalMessage.isClosing.subscribe(() => isClosingCalled = true);
      internalMessage.isClosed.subscribe(() => isClosedCalled = true);

      internalMessage.close();
      internalMessage.isClosed.next();
      setTimeout(() => {
          toastService.messages.subscribe((value) => {
            if (isClosingCalled) {
              expect(value.length).toBe(0);
            }
          });
          expect(isClosingCalled).toBeTruthy();
          expect(isClosedCalled).toBeTruthy();
          done();
      }, 600);
    });

    it('should not error when closing an already closed message', function(done: Function) {
      let configuration: SkyToastConfig = {
        toastType: SkyToastType.Danger,
        message: 'My message'
      };

      let internalMessage: SkyToastInstance = toastService.open(configuration);
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

    it('should require a message or customComponentType parameter', function() {
      try {
        toastService.open({});
      } catch (error) {
        expect(error).toBe('You must provide either a message or a customComponentType.');
      }
    });

    it('should reject both a message and customComponentType being supplied', function() {
      try {
        toastService.open({ message: 'My message', customComponentType: TestComponent });
      } catch (error) {
        expect(error).toBe('You must not provide both a message and a customComponentType.');
      }
    });

    it('should open specific toast types', function () {
      let infoMessage = toastService.open({message: 'info message', toastType: SkyToastType.Info});
      let warningMessage = toastService.open({message: 'warning message', toastType: SkyToastType.Warning});
      let dangerMessage = toastService.open({message: 'danger message', toastType: SkyToastType.Danger});
      let successMessage = toastService.open({message: 'success message', toastType: SkyToastType.Success});

      expect(infoMessage.toastType).toBe('info');
      expect(warningMessage.toastType).toBe('warning');
      expect(dangerMessage.toastType).toBe('danger');
      expect(successMessage.toastType).toBe('success');
    });

    it('should open info toast type when no or an unknown type is supplied', function () {
      let emptyType: SkyToastInstance = toastService.open({message: 'info message'});
      let unknownType: SkyToastInstance = toastService.open({message: 'info message', toastType: 5});

      expect(emptyType.toastType).toBe('info');
      expect(unknownType.toastType).toBe('info');
    });
  });
});
