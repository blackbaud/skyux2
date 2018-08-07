import { TestBed, ComponentFixture } from '@angular/core/testing';

import {
  expect
} from '@blackbaud/skyux-builder/runtime/testing/browser';
import { SkyAvatarFixturesModule } from './fixtures/avatar-fixtures.module';
import { SkyErrorModalService } from '../error';
import { MockErrorModalService } from './fixtures/mock-error-modal.service';
import { By } from '@angular/platform-browser';
import { AvatarTestComponent } from './fixtures/avatar.component.fixture';
import { SkyAvatarComponent } from './avatar.component';
import { SkyFileDropChange, SkyFileItem } from '../fileattachments';
import { SkyAvatarCropModalComponent } from './avatar-crop-modal.component';
import { SkyAvatarCropModalContext } from './avatar-crop-modal-context';

import {
  SkyModalInstance,
  SkyModalHostService,
  SkyModalConfiguration,
  SkyModalModule
} from '../modal';

import {
  MockSkyModalHostService,
  MockSkyModalInstance
} from './fixtures/mocks';
import { DebugElement } from '@angular/core';

fdescribe('Avatar crop modal', () => {
  /* tslint:disable-next-line max-line-length */
  let imgBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAQAAAAi5ZK2AAABcUlEQVR42u3RAQ0AAAgDoL9/aK3hJlSgmfBMpUtHOtKRjnSkIx3pSEc60pGOdKQjHelIl450pCMd6UhHOtKRjnSkIx3pSEc60pEuHelIRzrSkY50pCMd6UhHOtKRjnSkI1060pGOdKQjHelIRzrSkY50pCMd6UhHunSkIx3pSEc60pGOdKQjHelIRzrSkY506dKlIx3pSEc60pGOdKQjHelIRzrSkY50pEtHOtKRjnSkIx3pSEc60pGOdKQjHelIl450pCMd6UhHOtKRjnSkIx3pSEc60pEuHelIRzrSkY50pCMd6UhHOtKRjnSkI1060pGOdKQjHelIRzrSkY50pCMd6UhHunTp0pGOdKQjHelIRzrSkY50pCMd6UhHOtKlIx3pSEc60pGOdKQjHelIRzrSkY50pEtHOtKRjnSkIx3pSEc60pGOdKQjHelIl450pCMd6UhHOtKRjnSkIx3pSEc60pEuHelIRzrSkY50pHPDAuC/+gF4h03iAAAAAElFTkSuQmCC';
  let imgUrl = 'data:image/png;base64,' + imgBase64;

  let avatarFixture: ComponentFixture<AvatarTestComponent>;
  let modalFixture: ComponentFixture<SkyAvatarCropModalComponent>;
  let nativeElement: any;
  let componentInstance: SkyAvatarCropModalComponent;

  const modalInstance = new MockSkyModalInstance();
  const modalHost = new MockSkyModalHostService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkyAvatarFixturesModule, SkyModalModule],
      providers: [
        {
          provide: SkyErrorModalService, useValue: MockErrorModalService
        },
        { provide: SkyModalHostService, useValue: modalHost },
        { provide: SkyModalInstance, useValue: modalInstance},
        { provide: SkyModalConfiguration, useValue: {} },
        SkyAvatarCropModalContext
      ]
    });

    avatarFixture = TestBed.createComponent(AvatarTestComponent);

    modalFixture = TestBed.createComponent(SkyAvatarCropModalComponent);
    nativeElement = modalFixture.nativeElement as HTMLElement;
    componentInstance = modalFixture.componentInstance;

    avatarFixture.nativeElement.querySelector('sky-avatar').click();
  });

  // function getInputDebugEl() {
  //   return fixture.debugElement.query(By.css('input.sky-file-input-hidden'));
  // }

  function getImageEl(el: Element) {
    return el.querySelector('#imgItem') as HTMLImageElement;
  }

  function getImageDebugEl(debugEl: DebugElement) {
    return debugEl.query(By.css('#imgItem'));
  }

  function placeImage() {

    let actualFile = <SkyFileItem> {
      file: new File([imgUrl], 'avatar.png'),
      url: imgUrl
    };

    modalFixture.componentInstance.photoDrop(<SkyFileDropChange>{
      files: [
        actualFile
      ],
      rejectedFiles: []
    });

    modalFixture.detectChanges();
    console.log(modalFixture.componentInstance.file);
  }

  function dragImage(el: DebugElement, direction: string) {
    const image = getImageDebugEl(el);
    image.triggerEventHandler('mousedown', {});
    /* tslint:disable-next-line:switch-default */
    switch (direction) {
      case 'left':
        break;
      case 'right':
        break;
      case 'up':
        break;
      case 'down':
        break;
    }
  }

  function checkBoundaries(el: Element) {
    dragImage(el, 'left');
    dragImage(el, 'right');
    dragImage(el, 'up');
    dragImage(el, 'down');
  }

  fit('should show the image after it is selected', () => {
    placeImage();

    let expectedFile = <SkyFileItem> {
      file: new File([imgUrl], 'avatar.png'),
      url: imgUrl
    };

    expect(componentInstance.file).toEqual(expectedFile);
    expect(componentInstance.cropping).toBe(true);
    expect(getImageEl(nativeElement).src).toContain(expectedFile.url);
  });

  it('should respect boundaries with default scale', () => {
    placeImage();

    checkBoundaries(nativeElement);
  });

  it('should scale the image properly', () => {

  });

  it('should respect boundaries while scaled', () => {

  });

  describe('crop action', () => {

    it('should crop properly at default scale', () => {

    });

    it('should crop properly when scaled down', () => {

    });

    it('should crop properly when scaled up', () => {

    });
  });
});
