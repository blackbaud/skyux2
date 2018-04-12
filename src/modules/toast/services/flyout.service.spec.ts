import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injector
} from '@angular/core';

import {
  inject,
  TestBed
} from '@angular/core/testing';

import {
  NoopAnimationsModule
} from '@angular/platform-browser/animations';

import {
  expect
} from '@blackbaud/skyux-builder/runtime/testing/browser';

import {
  SkyWindowRefService
} from '../../window';

import { SkyToastAdapterService } from './toast-adapter.service';
import { SkyToastService } from './toast.service';

import {
  SkyToastType
} from '../types';

describe('Toast service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
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
  });

  it('should only create a single host component', inject(
    [SkyToastService],
    (service: SkyToastService) => {
      const spy = spyOn(service as any, 'createHostComponent').and.callThrough();
      service.open({} as any);
      service.open({} as any);
      expect(spy.calls.count()).toEqual(1);
    }
  ));

  it('should return an instance with a close method', inject(
    [SkyToastService],
    (service: SkyToastService) => {
      const toast = service.open({} as any);
      expect(typeof toast.close).toEqual('function');
    }
  ));

  it('should expose a method to remove the toast from the DOM', inject(
    [SkyToastService, SkyToastAdapterService, ApplicationRef],
    (
      service: SkyToastService,
      adapter: SkyToastAdapterService,
      appRef: ApplicationRef
    ) => {
      service.open({} as any);
      const spy = spyOn(service['host'].instance.messageStream, 'next').and.callThrough();
      service.close();
      expect(spy).toHaveBeenCalledWith({
        type: SkyToastType.Info
      });
    }
  ));
});
