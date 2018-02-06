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
} from '../testing';

import {
  SkyWindowRefService
} from '../window';

import { SkyFlyoutAdapterService } from './flyout-adapter.service';
import { SkyFlyoutService } from './flyout.service';

describe('Flyout service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      providers: [
        SkyFlyoutService,
        {
          provide: SkyFlyoutAdapterService,
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
                      attach() {
                        return {
                          close() { }
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
    [SkyFlyoutService],
    (service: SkyFlyoutService) => {
      const spy = spyOn(service as any, 'createHostComponent').and.callThrough();
      service.open({} as any);
      service.open({} as any);
      expect(spy.calls.count()).toEqual(1);
    }
  ));

  it('should return an instance with a close method', inject(
    [SkyFlyoutService],
    (service: SkyFlyoutService) => {
      const flyout = service.open({} as any);
      expect(typeof flyout.close).toEqual('function');
    }
  ));

  it('should expose a method to remove the flyout from the DOM', inject(
    [SkyFlyoutService, SkyFlyoutAdapterService, ApplicationRef],
    (
      service: SkyFlyoutService,
      adapter: SkyFlyoutAdapterService,
      appRef: ApplicationRef
    ) => {
      const adapterSpy = spyOn(adapter, 'removeHostElement').and.callThrough();
      const appRefSpy = spyOn(appRef, 'detachView').and.callThrough();
      service.open({} as any);
      service.dispose();
      expect(adapterSpy).toHaveBeenCalled();
      expect(appRefSpy).toHaveBeenCalled();
    }
  ));
});
