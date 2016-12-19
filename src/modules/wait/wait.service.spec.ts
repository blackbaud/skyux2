import {
  TestBed,
  inject,
  fakeAsync
} from '@angular/core/testing';

import {
  SkyWaitFixturesModule
} from './fixtures/wait-fixtures.module';

import {
  SkyWaitService
} from './wait.service';

import {
  ApplicationRef
} from '@angular/core';

describe('Wait service', () => {
  let waitService: SkyWaitService;
  let applicationRef: ApplicationRef;

  let pageBlockingSelector =
    '.sky-wait-page .sky-wait-mask-loading-fixed.sky-wait-mask-loading-blocking';
  let pageNonBlockingSelector =
    '.sky-wait-page .sky-wait-mask-loading-fixed.sky-wait-mask-loading-non-blocking';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyWaitFixturesModule
      ]
    });
  });

  beforeEach(
    inject(
      [
        ApplicationRef,
        SkyWaitService
      ],
      (
        _applicationRef: ApplicationRef,
        _waitService: SkyWaitService
      ) => {
        applicationRef = _applicationRef;
        waitService = _waitService;
        waitService.dispose();
      }
    )
  );

  function verifyBlockingPageWaitExists(doesExist: boolean) {
    if (doesExist) {
      expect(document.body.querySelector(pageBlockingSelector)).not.toBeNull();
      expect(document.body.querySelectorAll(pageBlockingSelector).length).toBe(1);
    } else {
      expect(document.body.querySelector(pageBlockingSelector)).toBeNull();
    }
  }

  function verifyNonBlockingPageWaitExists(doesExist: boolean) {
    if (doesExist) {
      expect(document.body.querySelector(pageNonBlockingSelector)).not.toBeNull();
      expect(document.body.querySelectorAll(pageNonBlockingSelector).length).toBe(1);
    } else {
      expect(document.body.querySelector(pageNonBlockingSelector)).toBeNull();
    }
  }

  it('should add a blocking page wait when beginPageWait is called with isBlocking true',
    fakeAsync(() => {
    waitService.beginBlockingPageWait();
    applicationRef.tick();

    verifyBlockingPageWaitExists(true);

    waitService.beginBlockingPageWait();
    applicationRef.tick();
    verifyBlockingPageWaitExists(true);

    waitService.endBlockingPageWait();
    applicationRef.tick();
    verifyBlockingPageWaitExists(true);

    waitService.endBlockingPageWait();
    applicationRef.tick();
    verifyBlockingPageWaitExists(false);

  }));

  it('should add a nonblocking page wait when beginPageWait is called with isBlocking false',
    () => {
    waitService.beginNonBlockingPageWait();
    applicationRef.tick();

    verifyNonBlockingPageWaitExists(true);

    waitService.beginNonBlockingPageWait();
    applicationRef.tick();
    verifyNonBlockingPageWaitExists(true);

    waitService.endNonBlockingPageWait();
    applicationRef.tick();
    verifyNonBlockingPageWaitExists(true);

    waitService.endNonBlockingPageWait();
    applicationRef.tick();
    verifyNonBlockingPageWaitExists(false);
  });

  it('do nothing if wait component not created and endPageWait is called', () => {
    waitService.endNonBlockingPageWait();
    applicationRef.tick();
    verifyNonBlockingPageWaitExists(false);
  });

  it('not drop counts below zero', () => {
    waitService.beginNonBlockingPageWait();
    applicationRef.tick();

    verifyNonBlockingPageWaitExists(true);

    waitService.endNonBlockingPageWait();
    applicationRef.tick();
    verifyNonBlockingPageWaitExists(false);

    waitService.endNonBlockingPageWait();
    applicationRef.tick();
    verifyNonBlockingPageWaitExists(false);

    waitService.beginNonBlockingPageWait();
    applicationRef.tick();

    verifyNonBlockingPageWaitExists(true);

    waitService.endBlockingPageWait();
    applicationRef.tick();
    verifyBlockingPageWaitExists(false);

    waitService.beginBlockingPageWait();
    applicationRef.tick();
    verifyBlockingPageWaitExists(true);
  });

  it('should clear appropriate waits when clearPageWait is called', () => {
    waitService.beginNonBlockingPageWait();
    applicationRef.tick();

    waitService.beginBlockingPageWait();
    applicationRef.tick();

    waitService.clearAllPageWaits();
    applicationRef.tick();

    verifyNonBlockingPageWaitExists(false);
    verifyBlockingPageWaitExists(false);
  });

  it('should only clear waits if waitcomponent not created', () => {
    waitService.clearAllPageWaits();
    applicationRef.tick();

    verifyNonBlockingPageWaitExists(false);
    verifyBlockingPageWaitExists(false);
  });
});
