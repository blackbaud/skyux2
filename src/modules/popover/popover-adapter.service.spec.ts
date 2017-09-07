import {
  ElementRef,
  Renderer2
} from '@angular/core';

import {
  inject,
  TestBed
} from '@angular/core/testing';

import {
  SkyWindowRefService
} from '../window';

import {
  SkyPopoverAdapterService
} from './popover-adapter.service';

class MockWindowService {
  public getWindow(): any {
    return {
      setTimeout(callback: Function) {
        callback();
      },
      document: {
        body: {
          clientWidth: 0,
          clientHeight: 0
        }
      },
      pageXOffset: 0,
      pageYOffset: 0
    };
  }
}

describe('SkyPopoverAdapterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SkyPopoverAdapterService,
        { provide: Renderer2, useValue: {
          setStyle() {}
        } },
        { provide: SkyWindowRefService, useValue: new MockWindowService() }
      ]
    });
  });

  it('should set a popover top and left values',
    inject([SkyPopoverAdapterService], (adapterService: SkyPopoverAdapterService) => {
      const elementRefDefinition = {
        getBoundingClientRect: function () {
          return {
            top: 0,
            left: 0,
            width: 0,
            height: 0
          };
        }
      };
      adapterService.setPopoverPosition({
        popover: new ElementRef(elementRefDefinition),
        popoverArrow: new ElementRef(elementRefDefinition),
        caller: new ElementRef(elementRefDefinition)
      }, 'above');
    })
  );

  // it('should',
  //   inject([SkyPopoverAdapterService], (adapterService: SkyPopoverAdapterService) => {
  //   })
  // );

});
