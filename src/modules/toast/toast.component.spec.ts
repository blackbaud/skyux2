// #region imports
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  expect
} from '@blackbaud/skyux-builder/runtime/testing/browser';

import {
  SkyToastFixturesModule,
  SkyToastTestComponent
} from './fixtures';

import {
  SkyToastComponent
} from './toast.component';
import { SkyToastType } from '.';
// #endregion

describe('Toast component', () => {
  let fixture: ComponentFixture<SkyToastTestComponent>;
  let component: SkyToastTestComponent;
  let toastComponent: SkyToastComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyToastFixturesModule
      ]
    });

    fixture = TestBed.createComponent(SkyToastTestComponent);
    component = fixture.componentInstance;
    toastComponent = component.toastComponent;
  });

  afterEach(() => {
    fixture.destroy();
  });

  function verifyType(type?: SkyToastType) {
    component.toastType = type;
    fixture.detectChanges();
    const toastElement = fixture.nativeElement
      .querySelector(`.sky-toast-${toastComponent.toastType}`);
    expect(toastElement).not.toBeNull();
  }

  it('should set defaults', () => {
    expect(toastComponent.toastType).toEqual('info');
  });

  it('should allow setting the toast type', () => {
    verifyType(); // default
    verifyType('info');
    verifyType('success');
    verifyType('warning');
    verifyType('danger');
  });

  it('should close the toast when clicking close button', () => {
    fixture.detectChanges();
    expect(toastComponent['isOpen']).toEqual(true);
    expect(toastComponent.getAnimationState()).toEqual('toastOpen');
    fixture.nativeElement.querySelector('.sky-toast-btn-close').click();
    fixture.detectChanges();
    expect(toastComponent['isOpen']).toEqual(false);
    expect(toastComponent.getAnimationState()).toEqual('toastClosed');
  });
});
