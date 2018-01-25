import {
  async,
  fakeAsync,
  flush,
  TestBed,
  tick,
  ComponentFixture
} from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SkyColorpickerModule } from './colorpicker.module';
import { ColorpickerTestComponent } from './fixtures/colorpicker-component.fixture';
import { expect } from '../testing';

describe('Colorpicker Component', () => {
  let fixture: ComponentFixture<ColorpickerTestComponent>;
  let component: ColorpickerTestComponent;
  let nativeElement: HTMLElement;

  function openColorpicker(element: HTMLElement, compFixture: ComponentFixture<any>) {
    flush();
    tick();
    fixture.detectChanges();

    const dropdownButtonEl = element.querySelector('.sky-dropdown-button') as HTMLElement;

    dropdownButtonEl.click();
    flush();
    tick();
    fixture.detectChanges();
  }

  function setPresetColor(element: HTMLElement, compFixture: ComponentFixture<any>, key: number) {
    let presetColors = element.querySelectorAll('.sky-preset-color') as NodeListOf<HTMLElement>;
    let applyColor = element.querySelector('.sky-btn-colorpicker-apply') as HTMLButtonElement;
    presetColors[key].click();
    applyColor.click();
    applyColor.click();
    compFixture.detectChanges();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ColorpickerTestComponent
      ],
      imports: [
        SkyColorpickerModule,
        FormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorpickerTestComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function keyHelper(keyName: string, key: number, deprecatedKeyName: string) {
    let document = <HTMLDocument>nativeElement.parentNode.parentNode.parentNode;
    let keyPress: KeyboardEvent;
    try { // Chrome, Safari, Firefox
      keyPress = new KeyboardEvent('keydown', {
        'key': keyName,
        'code': keyName,
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
      document.dispatchEvent(keyPress);
    } catch (error) {
      // Deprecated browser API... IE
      let keyPressDeprecated = document.createEvent('KeyboardEvent');
      keyPressDeprecated.initKeyboardEvent('keydown', true, true, window,
        deprecatedKeyName, 27, 'window', false, '');
      document.dispatchEvent(keyPressDeprecated);
    }
  }

  function mouseHelper(x: number, y: number, event: string) {
    let document = <HTMLDocument>nativeElement.parentNode.parentNode.parentNode;

    try {
      // Deprecated browser API... IE
      let mouseEventDeprecated = document.createEvent('MouseEvents');
      mouseEventDeprecated.initMouseEvent(
        event, true, true, window, 0, 0, 0, x, y, false, false, false, false, 0, undefined
      );
      document.dispatchEvent(mouseEventDeprecated);
    } catch (error) {
      // Chrome, Safari, Firefox
      let mouseEvent = new MouseEvent(event, {
        'clientX': x,
        'clientY': y
      });
      document.dispatchEvent(mouseEvent);
    }
    fixture.detectChanges();
  }

  function verifyColorpicker(element: HTMLElement, spaColor: string, test: string) {
    fixture.detectChanges();
    fixture.whenStable();
    let inputElement: HTMLInputElement = element.querySelector('input');
    expect(inputElement.value).toBe(spaColor);
    let selectedColor: HTMLDivElement = <HTMLDivElement>element.querySelector('.selected-color');
    let browserCSS = selectedColor.style.backgroundColor.replace(/[rgba\(\)]/g, '').split(',');
    // Some browsers convert RGBA to multiple points pass the decimal.
    let outcome = browserCSS.map((eachNumber) => {
      return Math.round(Number(eachNumber) * 100) / 100;
    });
    expect(outcome.toString()).toContain(test.replace(/[\s]/g, '').split(',').toString());
  }

  function getElementCords(elementRef: any) {
    const rect = (elementRef.nativeElement as HTMLElement).getBoundingClientRect();

    return {
      x: Math.round(rect.left + (rect.width / 2)),
      y: Math.round(rect.top + (rect.height / 2))
    };
  }

  function setInputElementValue(element: HTMLElement, name: string, value: string) {
    fixture.detectChanges();
    fixture.whenStable();
    let inputElement: NodeListOf<Element> =
      element.querySelectorAll('.rgba-text > div:last-child > input');
    let input: any = {
      'hex': inputElement[0],
      'red': inputElement[1],
      'green': inputElement[2],
      'blue': inputElement[3],
      'alpha': inputElement[4]
    };
    input[name].value = value;
    let params: any = {
      'bubbles': false,
      'cancelable': false
    };
    let inputEvent = document.createEvent('Event');
    inputEvent.initEvent('input', params.bubbles, params.cancelable);
    let changeEvent = document.createEvent('Event');
    changeEvent.initEvent('change', params.bubbles, params.cancelable);
    input[name].dispatchEvent(inputEvent);
    input[name].dispatchEvent(changeEvent);
    fixture.detectChanges();
    fixture.whenStable();
    return input[name];
  }

  it('should output RGBA', fakeAsync(() => {
    component.selectedOutputFormat = 'rgba';
    openColorpicker(nativeElement, fixture);
    setPresetColor(nativeElement, fixture, 4);
    verifyColorpicker(nativeElement, 'rgba(189,64,64,1)', '189, 64, 64');
  }));

  it('should handle undefined initial color', fakeAsync(() => {
    fixture.destroy();

    fixture = TestBed.createComponent(ColorpickerTestComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    component.selectedHexType = 'hex8';
    component.selectedOutputFormat = 'hex';
    component.selectedColor = undefined;

    openColorpicker(nativeElement, fixture);
    verifyColorpicker(nativeElement, '#fff', '255, 255, 255');
  }));

  it('should output HEX', fakeAsync(() => {
    component.selectedOutputFormat = 'hex';
    openColorpicker(nativeElement, fixture);
    setPresetColor(nativeElement, fixture, 4);
    verifyColorpicker(nativeElement, '#bd4040', '189, 64, 64');
  }));

  it('Should accept a new HEX3 color.', fakeAsync(() => {
    component.selectedOutputFormat = 'rgba';
    openColorpicker(nativeElement, fixture);
    setInputElementValue(nativeElement, 'hex', '#BC4');
    verifyColorpicker(nativeElement, 'rgba(187,204,68,1)', '187, 204, 68');
  }));

  it('Should accept a new HEX6 color.', fakeAsync(() => {
    component.selectedOutputFormat = 'hex';
    openColorpicker(nativeElement, fixture);
    setInputElementValue(nativeElement, 'hex', '#BFF666');
    verifyColorpicker(nativeElement, '#bff666', '191, 246, 102');
  }));

  it('Should accept a new RGB color.', fakeAsync(() => {
    component.selectedOutputFormat = 'hex';
    openColorpicker(nativeElement, fixture);
    setInputElementValue(nativeElement, 'red', '77');
    setInputElementValue(nativeElement, 'green', '58');
    setInputElementValue(nativeElement, 'blue', '183');
    verifyColorpicker(nativeElement, '#4d3ab7', '77, 58, 183');
  }));

  it('Should accept a new RGBA color.', fakeAsync(() => {
    component.selectedOutputFormat = 'hex';
    openColorpicker(nativeElement, fixture);
    setInputElementValue(nativeElement, 'red', '163');
    setInputElementValue(nativeElement, 'green', '19');
    setInputElementValue(nativeElement, 'blue', '84');
    setInputElementValue(nativeElement, 'alpha', '0.3');
    verifyColorpicker(nativeElement, '#a31354', '163, 19, 84, 0.3');
  }));

  it('Should accept a new HSL color.', fakeAsync(() => {
    component.selectedOutputFormat = 'hex';
    openColorpicker(nativeElement, fixture);
    setInputElementValue(nativeElement, 'hex', 'hsl(113,78%,41%)');
    verifyColorpicker(nativeElement, '#2aba17', '42, 186, 23');
  }));

  it('Should accept a new HSLA color.', fakeAsync(() => {
    component.selectedOutputFormat = 'hex';
    openColorpicker(nativeElement, fixture);
    setInputElementValue(nativeElement, 'hex', 'hsla(231,66%,41%,0.62)');
    verifyColorpicker(nativeElement, '#2438ae', '36, 56, 174');
  }));

  it('Should allow user to click cancel the color change.', fakeAsync(() => {
    let button = nativeElement.querySelector('.sky-btn-colorpicker-close');
    let buttonEvent = document.createEvent('Event');
    component.selectedOutputFormat = 'hex';
    openColorpicker(nativeElement, fixture);
    setInputElementValue(nativeElement, 'hex', '#BFF666');
    verifyColorpicker(nativeElement, '#bff666', '191, 246, 102');
    buttonEvent.initEvent('click', true, false);
    button.dispatchEvent(buttonEvent);
    verifyColorpicker(nativeElement, '#2889e5', '40, 137, 229');
  }));

  it('Should allow user to click apply the color change.', fakeAsync(() => {
    let button = nativeElement.querySelector('.sky-btn-colorpicker-apply');
    let buttonEvent = document.createEvent('Event');
    component.selectedOutputFormat = 'hex';
    openColorpicker(nativeElement, fixture);
    setInputElementValue(nativeElement, 'hex', '#2B7230');
    verifyColorpicker(nativeElement, '#2b7230', '43, 114, 48');
    buttonEvent.initEvent('click', true, false);
    button.dispatchEvent(buttonEvent);
    verifyColorpicker(nativeElement, '#2b7230', '43, 114, 48');
  }));

  it('Should accept mouse down events on hue bar.', fakeAsync(() => {
    component.selectedOutputFormat = 'hex';
    openColorpicker(nativeElement, fixture);
    let hueBar = fixture.debugElement.query(By.css('.hue'));
    let axis = getElementCords(hueBar);
    hueBar.triggerEventHandler('mousedown', { 'pageX': axis.x, 'pageY': axis.y });
    fixture.detectChanges();
    verifyColorpicker(nativeElement, '#28e5e5', '40, 229, 229');
    hueBar.triggerEventHandler('mousedown', { 'pageX': axis.x - 50, 'pageY': axis.y });
    fixture.detectChanges();
    verifyColorpicker(nativeElement, '#a3e528', '163, 229, 40');
    hueBar.triggerEventHandler('mousedown', { 'pageX': axis.x + 50, 'pageY': axis.y });
    fixture.detectChanges();
    verifyColorpicker(nativeElement, '#a328e5', '163, 40, 229');
  }));

  it('Should accept mouse down events on alpha bar.', fakeAsync(() => {
    component.selectedOutputFormat = 'rgba';
    openColorpicker(nativeElement, fixture);
    let alphaBar = fixture.debugElement.query(By.css('.alpha'));
    let axis = getElementCords(alphaBar);
    alphaBar.triggerEventHandler('mousedown', { 'pageX': axis.x, 'pageY': axis.y });
    fixture.detectChanges();
    verifyColorpicker(nativeElement, 'rgba(40,137,229,0.5)', '40, 137, 229, 0.5');
    alphaBar.triggerEventHandler('mousedown', { 'pageX': axis.x - 50, 'pageY': axis.y });
    fixture.detectChanges();
    verifyColorpicker(nativeElement, 'rgba(40,137,229,0.23)', '40, 137, 229, 0.23');
    alphaBar.triggerEventHandler('mousedown', { 'pageX': axis.x + 50, 'pageY': axis.y });
    fixture.detectChanges();
    verifyColorpicker(nativeElement, 'rgba(40,137,229,0.77)', '40, 137, 229, 0.77');
  }));

  it('Should accept mouse down events on saturation and lightness.', fakeAsync(() => {
    component.selectedOutputFormat = 'hex';
    openColorpicker(nativeElement, fixture);
    let slBar = fixture.debugElement.query(By.css('.saturation-lightness'));
    let axis = getElementCords(slBar);

    slBar.triggerEventHandler('mousedown', { 'pageX': axis.x, 'pageY': axis.y });
    fixture.detectChanges();

    verifyColorpicker(nativeElement, '#406080', '64, 96, 128');

    slBar.triggerEventHandler('mousedown', { 'pageX': axis.x - 50, 'pageY': axis.y });
    fixture.detectChanges();

    verifyColorpicker(nativeElement, '#576b80', '87, 107, 128');

    slBar.triggerEventHandler('mousedown', { 'pageX': axis.x - 50, 'pageY': axis.y / 2 });
    fixture.detectChanges();

    verifyColorpicker(nativeElement, '#88a7c7', '136, 167, 199');

    slBar.triggerEventHandler('mousedown', { 'pageX': axis.x, 'pageY': axis.y / 2 });
    fixture.detectChanges();

    verifyColorpicker(nativeElement, '#6394c7', '99, 148, 199');

    slBar.triggerEventHandler('mousedown', { 'pageX': axis.x + 50, 'pageY': axis.y / 2 });
    fixture.detectChanges();

    verifyColorpicker(nativeElement, '#3f81c7', '63, 129, 199');

    slBar.triggerEventHandler('mousedown', { 'pageX': axis.x + 50, 'pageY': axis.y });
    fixture.detectChanges();

    verifyColorpicker(nativeElement, '#285380', '40, 83, 128');
  }));

  it('Should accept mouse dragging on saturation and lightness.', fakeAsync(() => {
    component.selectedOutputFormat = 'hex';
    openColorpicker(nativeElement, fixture);
    let slBar = fixture.debugElement.query(By.css('.saturation-lightness'));
    let axis = getElementCords(slBar);
    slBar.triggerEventHandler('mousedown', { 'pageX': axis.x, 'pageY': axis.y });
    fixture.detectChanges();
    mouseHelper(axis.x - 50, axis.y - 50, 'mousemove');
    fixture.detectChanges();
    verifyColorpicker(nativeElement, '#8babcb', '139, 171, 203');
    mouseHelper(axis.x + 50, axis.y, 'mousemove');
    verifyColorpicker(nativeElement, '#285480', '40, 84, 128');
    mouseHelper(axis.x + 50, axis.y, 'mouseup');
    verifyColorpicker(nativeElement, '#285480', '40, 84, 128');
    fixture.detectChanges();
  }));

  it('Should output HSLA in css format.', fakeAsync(() => {
    component.selectedOutputFormat = 'hsla';
    openColorpicker(nativeElement, fixture);
    setInputElementValue(nativeElement, 'hex', '#123456');
    verifyColorpicker(nativeElement, 'hsla(210,65%,20%,1)', '18, 51, 84');
  }));

  it('Should accept HEX8 alpha conversions.', fakeAsync(() => {
    component.selectedHexType = 'hex8';
    component.selectedOutputFormat = 'rgba';
    openColorpicker(nativeElement, fixture);
    setInputElementValue(nativeElement, 'hex', '#12345680');
    verifyColorpicker(nativeElement, 'rgba(18,52,86,0.5)', '18, 52, 86, 0.5');
  }));

  it('Should output CMYK in css format.', fakeAsync(() => {
    component.selectedOutputFormat = 'cmyk';
    openColorpicker(nativeElement, fixture);
    setInputElementValue(nativeElement, 'hex', '#654321');
    verifyColorpicker(nativeElement, 'cmyk(0%,34%,67%,60%)', '101, 67, 33');
  }));

  it('Should accept transparency', fakeAsync(() => {
    component.selectedOutputFormat = 'hsla';
    openColorpicker(nativeElement, fixture);
    setInputElementValue(nativeElement, 'red', '0');
    setInputElementValue(nativeElement, 'green', '0');
    setInputElementValue(nativeElement, 'blue', '0');
    setInputElementValue(nativeElement, 'alpha', '0');
    verifyColorpicker(nativeElement, 'hsla(0,0%,0%,0)', '0, 0, 0, 0');
  }));

  it('Should accept color change through directive host listener', fakeAsync(() => {
    component.selectedOutputFormat = 'rgba';
    openColorpicker(nativeElement, fixture);
    nativeElement.querySelector('input').value = '#4523FC';
    let inputEvent = document.createEvent('Event');
    inputEvent.initEvent('input', true, false);
    let changeEvent = document.createEvent('Event');
    changeEvent.initEvent('change', true, false);
    nativeElement.querySelector('input').dispatchEvent(inputEvent);
    nativeElement.querySelector('input').dispatchEvent(changeEvent);
    fixture.detectChanges();
    verifyColorpicker(nativeElement, 'rgba(69,35,252,1)', '69, 35, 252');
  }));

  it('Should allow user to esc cancel the color change.', fakeAsync(() => {
    component.selectedOutputFormat = 'hex';
    openColorpicker(nativeElement, fixture);
    setInputElementValue(nativeElement, 'hex', '#086A93');
    verifyColorpicker(nativeElement, '#086a93', '8, 106, 147');
    keyHelper('Escape', 27, 'Esc');
    fixture.detectChanges();
    verifyColorpicker(nativeElement, '#2889e5', '40, 137, 229');
  }));

  it('Should specify type="button" on all button elements.', fakeAsync(() => {
    component.selectedOutputFormat = 'hex';
    openColorpicker(nativeElement, fixture);
    expect(nativeElement.querySelectorAll('button:not([type="button"])').length).toBe(0);
  }));
});
