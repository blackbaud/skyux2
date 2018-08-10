import { TestBed, ComponentFixture } from '@angular/core/testing';

import {
  expect
} from '@blackbaud/skyux-builder/runtime/testing/browser';
import { SkyAvatarFixturesModule } from './fixtures/avatar-fixtures.module';
import { SkyErrorModalService } from '../error';
import { MockErrorModalService } from './fixtures/mock-error-modal.service';
import { By } from '@angular/platform-browser';
import { AvatarTestComponent } from './fixtures/avatar.component.fixture';
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
  RouterTestingModule
} from '@angular/router/testing';

import {
  MockSkyModalHostService,
  MockSkyModalInstance
} from './fixtures/mocks';
import { DebugElement } from '@angular/core';

describe('Avatar crop modal', () => {
  /* tslint:disable-next-line max-line-length */
  let imgBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAZAAAAD6CAQAAAAlrtnPAAAB2UlEQVR42u3TMQEAAAgDoK1/aL09bAAdaCbAo4KAICAICAKCgCAgCAgCgoAggCAgCAgCgoAgIAgIAoKAICAIIAgIAoKAICAICAKCgCAgCCAICAKCgCAgCAgCgoAgIAgIAggCgoAgIAgIAoKAICAICAIIAoKAICAICAKCgCAgCAgCggCCgCAgCAgCgoAgIAgIAoIAgoAgIAgIAoKAICAICAKCgCCAICAICAKCgCAgCAgCgoAgIIggIAgIAoKAICAICAKCgCAgCCAICAKCgCAgCAgCgoAgIAgIAggCgoAgIAgIAoKAICAICAIIAoKAICAICAKCgCAgCAgCggCCgCAgCAgCgoAgIAgIAoIAgoAgIAgIAoKAICAICAKCgCCAICAICAKCgCAgCAgCgoAggCAgCAgCgoAgIAgIAoKAICAIIAgIAoKAICAICAKCgCAgCAgiCAgCgoAgIAgIAoKAICAICAIIAoKAICAICAKCgCAgCAgCggCCgCAgCAgCgoAgIAgIAoIAgoAgIAgIAoKAICAICAKCgCCAICAICAKCgCAgCAgCgoAggCAgCAgCgoAgIAgIAoKAICAIIAgIAoKAICAICAKCgCAgCCAICAKCgCAgCAgCgoAgIAgIAlwLBK36AT/fEzwAAAAASUVORK5CYII=';
  let imgUrl = 'data:image/png;base64,' + imgBase64;
  let testFile = <SkyFileItem> {
    file: new File([imgUrl], 'avatar.png'),
    url: imgUrl
  };
  const imgWidth = 400;
  const imgHeight = 250;

  let avatarFixture: ComponentFixture<AvatarTestComponent>;
  let modalFixture: ComponentFixture<SkyAvatarCropModalComponent>;
  let nativeElement: any;
  let componentInstance: SkyAvatarCropModalComponent;

  const modalInstance = new MockSkyModalInstance();
  const modalHost = new MockSkyModalHostService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkyAvatarFixturesModule, SkyModalModule, RouterTestingModule],
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

  function getViewEl(el: Element) {
    return el.querySelector('#circleDiv') as HTMLElement;
  }

  function getViewDebugEl(debugEl: DebugElement) {
    return debugEl.query(By.css('#circleDiv'));
  }

  function placeImage() {

    modalFixture.componentInstance.photoDrop(<SkyFileDropChange>{
      files: [
        testFile
      ],
      rejectedFiles: []
    });

    modalFixture.detectChanges();
  }

  function dragImage(el: Element, direction: number) {
    const viewport = getViewEl(el);

    const centerX = viewport.offsetLeft + (viewport.offsetWidth / 2);
    const centerY = viewport.offsetTop + (viewport.offsetHeight / 2);

    const mouseEvent = new MouseEvent('mousedown', {
      'clientX': centerX,
      'clientY': centerY
    });
    viewport.dispatchEvent(mouseEvent);
    /* tslint:disable-next-line:switch-default */
    switch (direction) {
      // right
      case 0:
        document.dispatchEvent(new MouseEvent('mousemove', {
          clientX: centerX + 5000,
          clientY: centerY
        }));
        break;
      // left
      case 1:
        document.dispatchEvent(new MouseEvent('mousemove', {
          clientX: centerX - 5000,
          clientY: centerY
        }));
        break;
      // up
      case 2:
        document.dispatchEvent(new MouseEvent('mousemove', {
          clientX: centerX,
          clientY: centerY - 5000
        }));
        break;
      // down
      case 3:
        document.dispatchEvent(new MouseEvent('mousemove', {
          clientX: centerX,
          clientY: centerY + 5000
        }));
        break;
    }
    viewport.dispatchEvent(new MouseEvent('mouseup', {}));
    modalFixture.detectChanges();
    // modalFixture.detectChanges();
    // modalFixture.detectChanges();
  }

  function checkBoundaries(el: Element, scale: number) {
    const image = getImageEl(el);
    const viewport = getViewEl(el);

    dragImage(el, 0);
    let newLeft = parseInt(getComputedStyle(image).getPropertyValue('left'), 10);
    expect(newLeft + componentInstance.totalXZoomOffset).toBeCloseTo(viewport.offsetLeft, -1);

    dragImage(el, 1);
    newLeft = parseInt(getComputedStyle(image).getPropertyValue('left'), 10);
    /* tslint:disable-next-line max-line-length */
    expect(newLeft + componentInstance.totalXZoomOffset).toBeCloseTo(viewport.offsetLeft - ((image.offsetWidth * scale) - viewport.offsetWidth), -1);

    dragImage(el, 2);
    let newTop = parseInt(getComputedStyle(image).getPropertyValue('top'), 10);
    /* tslint:disable-next-line max-line-length */
    expect(newTop + componentInstance.totalYZoomOffset).toBeCloseTo(viewport.offsetTop - ((image.offsetHeight * scale) - viewport.offsetHeight), -1);

    dragImage(el, 3);
    newTop = parseInt(getComputedStyle(image).getPropertyValue('top'), 10);
    expect(newTop + componentInstance.totalYZoomOffset).toBeCloseTo(viewport.offsetTop, -1);
  }

  it('should show the image after it is selected', () => {
    placeImage();
    modalFixture.whenStable().then(() => {
      const expectedFile = <SkyFileItem> {
        file: new File([imgUrl], 'avatar.png'),
        url: imgUrl
      };

      expect(componentInstance.file).toEqual(expectedFile);
      expect(componentInstance.cropping).toBe(true);
      expect(getImageEl(nativeElement).src).toContain(expectedFile.url);
    });
  });

  it('should calculate the proper minimun for the zoom slider', () => {
    placeImage();
    modalFixture.whenStable().then(() => {
      // expect(componentInstance.minRange).toBe(getViewEl(nativeElement).offsetWidth / getImageEl(nativeElement).offsetWidth);
    });
  });

  it('should respect boundaries with default scale', (done) => {
    placeImage();
    modalFixture.whenStable().then(() => {
      checkBoundaries(nativeElement, 1);
      setTimeout(() => {
        done();
      }, 0);
    });
  });

  it('should respect boundaries when moving while scaled out', (done) => {
    placeImage();
    modalFixture.whenStable().then(() => {
      componentInstance.changeZoom(.75);
      checkBoundaries(nativeElement, .75);
      setTimeout(() => {
        done();
      }, 0);
    });
  });

  it('should respect boundaries when moving while scaled in', (done) => {
    placeImage();
    modalFixture.whenStable().then(() => {
      componentInstance.changeZoom(componentInstance.maxRange);
      checkBoundaries(nativeElement, componentInstance.maxRange);
      setTimeout(() => {
        done();
      }, 0);
    });
  });

  describe('crop action', () => {

    it('should crop properly at default scale', () => {
      placeImage();
      modalFixture.whenStable().then(() => {
        const saveSpy = spyOn(modalInstance, 'save');
        dragImage(nativeElement, 0);
        componentInstance.getCropResult();
        expect(saveSpy).toHaveBeenCalled();
        // Add test to actually look at the cropped result image
      });
    });

    it('should crop properly when scaled down', () => {
      placeImage();
      modalFixture.whenStable().then(() => {
        const saveSpy = spyOn(modalInstance, 'save');
        dragImage(nativeElement, 0);
        componentInstance.getCropResult();
        expect(saveSpy).toHaveBeenCalled();
        // Add test to actually look at the cropped result image
      });
    });

    it('should crop properly when scaled up', () => {
      placeImage();
      modalFixture.whenStable().then(() => {
        const saveSpy = spyOn(modalInstance, 'save');
        dragImage(nativeElement, 0);
        componentInstance.getCropResult();
        expect(saveSpy).toHaveBeenCalled();
        // Add test to actually look at the cropped result image
      });
    });
  });
});
