// spell-checker:ignore Colorpicker, dropdown
import {
  TestBed,
  ComponentFixture,
  tick
} from '@angular/core/testing';
import { browser } from 'protractor';
import {
  FormsModule,
  NgModel
} from '@angular/forms';

import { SkyColorpickerModule } from './colorpicker.module';
import { ColorpickerTestComponent } from './fixtures/colorpicker-component.fixture';

import { expect } from '../testing';
import { By } from '@angular/platform-browser';

describe('Colorpicker', () => {

  function openColorpicker(element: HTMLElement, compFixture: ComponentFixture<any>) {
    let dropdownButtonEl = element.querySelector('.sky-dropdown-button') as HTMLElement;
    dropdownButtonEl.click();
    compFixture.detectChanges();
  }

  function setPresetColor(element: HTMLElement, compFixture: ComponentFixture<any>, key: number) {
    let presetColors = element.querySelectorAll('.sky-preset-color') as NodeListOf<HTMLElement>;
    let applyColor = element.querySelector('.sky-btn-colorpicker-apply') as HTMLButtonElement;
    presetColors[key].click();
    applyColor.click();
    applyColor.click();
    compFixture.detectChanges();
  }

  let fixture: ComponentFixture<ColorpickerTestComponent>;
  let component: ColorpickerTestComponent;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ColorpickerTestComponent
      ],
      imports: [
        SkyColorpickerModule,
        FormsModule
      ]
    });

    fixture = TestBed.createComponent(ColorpickerTestComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  function verifyColorpicker(
    element: HTMLElement
  ) {
    fixture.detectChanges();
    fixture.whenStable();
    let inputElement: HTMLInputElement = element.querySelector('input');

    if (component.selectedOutputFormat === 'rgba') {
      expect(inputElement.value).toBe('rgba(189,64,64,1)');
    }
    if (component.selectedOutputFormat === 'hex') {
      expect(inputElement.value).toBe('#bd4040');
    }
  }

  it('should output RGBA', () => {
    component.selectedOutputFormat = 'rgba';
    openColorpicker(nativeElement, fixture);
    setPresetColor(nativeElement, fixture, 4);
    verifyColorpicker(nativeElement);
  });

  it('should output HEX', () => {
    component.selectedOutputFormat = 'hex';
    openColorpicker(nativeElement, fixture);
    setPresetColor(nativeElement, fixture, 4);
    verifyColorpicker(nativeElement);
  });

  it('Should accept a new HEX color.', () => {
    component.selectedOutputFormat = 'hex';
    openColorpicker(nativeElement, fixture);
  browser.pause();

  });


});
