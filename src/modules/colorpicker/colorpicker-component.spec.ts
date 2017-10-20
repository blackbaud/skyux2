import { FormsModule } from '@angular/forms';

import {
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { expect } from '../testing';

import { SkyDropdownModule } from '../dropdown/dropdown.module';
import { SkyColorpickerModule } from './colorpicker.module';
import { ColorpickerTestComponent } from './fixtures/colorpicker-component.fixture';

fdescribe('Colorpicker Component', () => {
  let fixture: ComponentFixture<ColorpickerTestComponent>;
  let component: ColorpickerTestComponent;

  function openColorpickerAsync(): Promise<any> {
    fixture.detectChanges();

    return new Promise((resolve: any) => {
      fixture.componentInstance
        .selectedColorChanged
        .first()
        .subscribe((data: any) => {
          fixture.nativeElement.querySelector('.sky-dropdown-button').click();
          fixture.detectChanges();
          fixture.whenStable().then(() => resolve());
        });
    });
  }

  function selectColorByIndex(index: number) {
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const presetColorsBtn = element.querySelectorAll('.sky-preset-color');
    const applyColorBtn = element.querySelector('.sky-btn-colorpicker-apply');

    presetColorsBtn[index].click();
    applyColorBtn.click();
  }

  function verifyColorpicker(spaColor: string, test: string) {
    const inputElem = fixture.nativeElement.querySelector('input');

    fixture.detectChanges();
    expect(inputElem.value).toBe(spaColor);

    const selectedColor = fixture.nativeElement.querySelector('.selected-color');
    const browserCSS = selectedColor.style.backgroundColor.replace(/[rgba\(\)]/g, '').split(',');

    // Some browsers convert RGBA to multiple points pass the decimal.
    const outcome = browserCSS.map((eachNumber: any) => {
      return Math.round(Number(eachNumber) * 100) / 100;
    });

    fixture.detectChanges();
    expect(outcome.toString()).toContain(test.replace(/[\s]/g, '').split(',').toString());
  }

  function setInputElementValue(name: string, value: string) {
    const inputEvent = document.createEvent('Event');
    const changeEvent = document.createEvent('Event');
    const inputElem = fixture.nativeElement.querySelectorAll(
      '.rgba-text > div:last-child > input'
    );

    const input: any = {
      'hex': inputElem[0],
      'red': inputElem[1],
      'green': inputElem[2],
      'blue': inputElem[3],
      'alpha': inputElem[4]
    };

    const params = {
      'bubbles': false,
      'cancelable': false
    };

    inputEvent.initEvent('input', params.bubbles, params.cancelable);
    changeEvent.initEvent('change', params.bubbles, params.cancelable);

    input[name].value = value;
    input[name].dispatchEvent(inputEvent);
    input[name].dispatchEvent(changeEvent);
  }

  function getElementCords(elementRef: any): { middle: number, top: number } {
    const el = elementRef.nativeElement;
    const parent = el.offsetParent;

    // Avoid box model issues in IE by moving color picker top left.
    parent.style.left = '0px';
    parent.style.top = '0px';

    const middle = el.offsetLeft + (el.offsetWidth / 2);
    const top = el.scrollHeight / 2;

    return { middle, top };
  }

  function mouseHelper(x: number, y: number, event: string) {
    const document = fixture.nativeElement.parentNode.parentNode.parentNode;

    let mouseEvent: any;

    try {
      // Deprecated browser API... IE
      mouseEvent = document.createEvent('MouseEvents');
      mouseEvent.initMouseEvent(
        event, true, true, window, 0, 0, 0, x, y, false, false, false, false, 0, undefined
      );
    } catch (error) {
      // Chrome, Safari, Firefox
      mouseEvent = new MouseEvent(event, {
        'clientX': x,
        'clientY': y
      });
    }

    document.dispatchEvent(mouseEvent);
  }

  function keyHelper(keyName: string, key: number, deprecatedKeyName: string) {
    const document = fixture.nativeElement.parentNode.parentNode.parentNode;

    let keyPress: KeyboardEvent;

    try {
      // Chrome, Safari, Firefox
      keyPress = new KeyboardEvent('keydown', {
        'key': keyName,
        'code': keyName,
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
    } catch (error) {
      // Deprecated browser API... IE
      keyPress = document.createEvent('KeyboardEvent');
      keyPress.initKeyboardEvent(
        'keydown', true, true, window, deprecatedKeyName, 27, 'window', false, ''
      );
    }

    document.dispatchEvent(keyPress);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ColorpickerTestComponent
      ],
      imports: [
        FormsModule,
        SkyDropdownModule,
        SkyColorpickerModule
      ]
    });

    fixture = TestBed.createComponent(ColorpickerTestComponent);
    component = fixture.componentInstance;
  });

  it('should output RGBA', async(() => {
    openColorpickerAsync().then(() => {
      selectColorByIndex(4);
      verifyColorpicker('rgba(189,64,64,1)', '189, 64, 64');
    });
  }));

  it('should output HEX', async(() => {
    component.selectedOutputFormat = 'hex';
    openColorpickerAsync().then(() => {
      selectColorByIndex(4);
      verifyColorpicker('#bd4040', '189, 64, 64');
    });
  }));

  it('should accept a new HEX3 color', async(() => {
    component.selectedOutputFormat = 'rgba';
    openColorpickerAsync().then(() => {
      setInputElementValue('hex', '#BC4');
      verifyColorpicker('rgba(187,204,68,1)', '187, 204, 68');
    });
  }));

  it('should accept a new HEX6 color', async(() => {
    component.selectedOutputFormat = 'hex';
    openColorpickerAsync().then(() => {
      setInputElementValue('hex', '#BFF666');
      verifyColorpicker('#bff666', '191, 246, 102');
    });
  }));

  it('should accept a new RGB color', async(() => {
    component.selectedOutputFormat = 'hex';
    openColorpickerAsync().then(() => {
      setInputElementValue('red', '77');
      setInputElementValue('green', '58');
      setInputElementValue('blue', '183');
      verifyColorpicker('#4d3ab7', '77, 58, 183');
    });
  }));

  it('should accept a new RGBA color', async(() => {
    component.selectedOutputFormat = 'hex';
    openColorpickerAsync().then(() => {
      setInputElementValue('red', '163');
      setInputElementValue('green', '19');
      setInputElementValue('blue', '84');
      setInputElementValue('alpha', '0.3');
      verifyColorpicker('#a31354', '163, 19, 84, 0.3');
    });
  }));

  it('should accept a new HSL color', async(() => {
    component.selectedOutputFormat = 'hex';
    openColorpickerAsync().then(() => {
      setInputElementValue('hex', 'hsl(113,78%,41%)');
      verifyColorpicker('#2aba17', '42, 186, 23');
    });
  }));

  it('should accept a new HSLA color', async(() => {
    component.selectedOutputFormat = 'hex';
    openColorpickerAsync().then(() => {
      setInputElementValue('hex', 'hsla(231,66%,41%,0.62)');
      verifyColorpicker('#2438ae', '36, 56, 174');
    });
  }));

  it('should allow user to click cancel the color change', async(() => {
    component.selectedOutputFormat = 'hex';
    openColorpickerAsync().then(() => {
      const button = fixture.nativeElement.querySelector('.sky-btn-colorpicker-close');
      const buttonEvent = document.createEvent('Event');

      setInputElementValue('hex', '#BFF666');
      verifyColorpicker('#bff666', '191, 246, 102');

      buttonEvent.initEvent('click', true, false);
      button.dispatchEvent(buttonEvent);
      verifyColorpicker('#2889e5', '40, 137, 229');
    });
  }));

  it('should allow user to click apply the color change', async(() => {
    component.selectedOutputFormat = 'hex';
    openColorpickerAsync().then(() => {
      const button = fixture.nativeElement.querySelector('.sky-btn-colorpicker-apply');
      const buttonEvent = document.createEvent('Event');

      setInputElementValue('hex', '#2B7230');
      verifyColorpicker('#2b7230', '43, 114, 48');

      buttonEvent.initEvent('click', true, false);
      button.dispatchEvent(buttonEvent);
      verifyColorpicker('#2b7230', '43, 114, 48');
    });
  }));

  it('should accept mouse down events on hue bar', async(() => {
    component.selectedOutputFormat = 'hex';
    openColorpickerAsync().then(() => {
      const hueBar = fixture.debugElement.query(By.css('.hue'));
      const axis = getElementCords(hueBar);

      hueBar.triggerEventHandler('mousedown', {
        'pageX': axis.middle,
        'pageY': axis.top
      });

      verifyColorpicker('#28e5e5', '40, 229, 229');

      hueBar.triggerEventHandler('mousedown', {
        'pageX': axis.middle - 50,
        'pageY': axis.top
      });

      verifyColorpicker('#a3e528', '163, 229, 40');

      hueBar.triggerEventHandler('mousedown', {
        'pageX': axis.middle + 50,
        'pageY': axis.top
      });

      verifyColorpicker('#a328e5', '163, 40, 229');
    });
  }));

  it('should accept mouse down events on alpha bar', async(() => {
    component.selectedOutputFormat = 'rgba';
    openColorpickerAsync().then(() => {
      const alphaBar = fixture.debugElement.query(By.css('.alpha'));
      const axis = getElementCords(alphaBar);

      alphaBar.triggerEventHandler('mousedown', {
        'pageX': axis.middle,
        'pageY': axis.top
      });

      verifyColorpicker('rgba(40,137,229,0.5)', '40, 137, 229, 0.5');

      alphaBar.triggerEventHandler('mousedown', {
        'pageX': axis.middle - 50,
        'pageY': axis.top
      });

      verifyColorpicker('rgba(40,137,229,0.23)', '40, 137, 229, 0.23');

      alphaBar.triggerEventHandler('mousedown', {
        'pageX': axis.middle + 50,
        'pageY': axis.top
      });

      verifyColorpicker('rgba(40,137,229,0.77)', '40, 137, 229, 0.77');
    });
  }));

  it('should accept mouse down events on saturation and lightness', async(() => {
    component.selectedOutputFormat = 'hex';
    openColorpickerAsync().then(() => {
      const slBar = fixture.debugElement.query(By.css('.saturation-lightness'));
      const axis = getElementCords(slBar);

      slBar.triggerEventHandler('mousedown', {
        'pageX': axis.middle,
        'pageY': axis.top
      });

      verifyColorpicker('#406080', '64, 96, 128');

      slBar.triggerEventHandler('mousedown', {
        'pageX': axis.middle - 50,
        'pageY': axis.top
      });

      verifyColorpicker('#576b80', '87, 107, 128');

      slBar.triggerEventHandler('mousedown', {
        'pageX': axis.middle - 50,
        'pageY': axis.top / 2
      });

      verifyColorpicker('#83a0bf', '131, 160, 191');

      slBar.triggerEventHandler('mousedown', {
        'pageX': axis.middle,
        'pageY': axis.top / 2
      });

      verifyColorpicker('#608ebf', '96, 142, 191');

      slBar.triggerEventHandler('mousedown', {
        'pageX': axis.middle + 50,
        'pageY': axis.top / 2
      });

      verifyColorpicker('#3c7cbf', '60, 124, 191');

      slBar.triggerEventHandler('mousedown', {
        'pageX': axis.middle + 50,
        'pageY': axis.top
      });

      verifyColorpicker('#285380', '40, 83, 128');
    });
  }));

  it('should accept mouse dragging on saturation and lightness', async(() => {
    component.selectedOutputFormat = 'hex';
    openColorpickerAsync().then(() => {
      const slBar = fixture.debugElement.query(By.css('.saturation-lightness'));
      const axis = getElementCords(slBar);

      slBar.triggerEventHandler('mousedown', {
        'pageX': axis.middle,
        'pageY': axis.top
      });

      mouseHelper(axis.middle - 50, axis.top - 50, 'mousemove');
      verifyColorpicker('#8babcb', '139, 171, 203');

      mouseHelper(axis.middle + 50, axis.top, 'mousemove');
      verifyColorpicker('#285480', '40, 84, 128');

      mouseHelper(axis.middle + 50, axis.top, 'mouseup');
      verifyColorpicker('#285480', '40, 84, 128');
    });
  }));

  it('should output HSLA in css format', async(() => {
    component.selectedOutputFormat = 'hsla';
    openColorpickerAsync().then(() => {
      setInputElementValue('hex', '#123456');
      verifyColorpicker('hsla(210,65%,20%,1)', '18, 51, 84');
    });
  }));

  it('should accept HEX8 alpha conversions', async(() => {
    component.colorModel = '#12345680';
    component.selectedOutputFormat = 'rgba';
    component.selectedHexType = 'hex8';
    openColorpickerAsync().then(() => {
      verifyColorpicker('rgba(18,52,86,0.5)', '18, 52, 86, 0.5');
    });
  }));

  it('should handle invalid HEX8 conversions', async(() => {
    component.selectedOutputFormat = 'hsla';
    component.selectedHexType = 'hex8';
    openColorpickerAsync().then(() => {
      setInputElementValue('hex', '#123456');
      verifyColorpicker('hsla(210,65%,20%,1)', '18, 51, 84');
    });
  }));

  it('should output CMYK in css format', async(() => {
    component.selectedOutputFormat = 'cmyk';
    openColorpickerAsync().then(() => {
      setInputElementValue('hex', '#654321');
      verifyColorpicker('cmyk(0%,34%,67%,60%)', '101, 67, 33');
    });
  }));

  it('should accept transparency', async(() => {
    component.selectedOutputFormat = 'hsla';
    openColorpickerAsync().then(() => {
      setInputElementValue('red', '0');
      setInputElementValue('green', '0');
      setInputElementValue('blue', '0');
      setInputElementValue('alpha', '0');
      verifyColorpicker('hsla(0,0%,0%,0)', '0, 0, 0, 0');
    });
  }));

  it('should accept color change through directive host listener', async(() => {
    component.selectedOutputFormat = 'rgba';
    openColorpickerAsync().then(() => {
      const inputElem = fixture.nativeElement.querySelector('input');
      const inputEvent = document.createEvent('Event');
      const changeEvent = document.createEvent('Event');

      inputElem.value = '#4523FC';

      inputEvent.initEvent('input', true, false);
      changeEvent.initEvent('change', true, false);

      inputElem.dispatchEvent(inputEvent);
      inputElem.dispatchEvent(changeEvent);

      verifyColorpicker('rgba(69,35,252,1)', '69, 35, 252');
    });
  }));

  it('should allow user to esc cancel the color change', async(() => {
    component.selectedOutputFormat = 'hex';
    openColorpickerAsync().then(() => {
      setInputElementValue('hex', '#086A93');
      verifyColorpicker('#086a93', '8, 106, 147');

      keyHelper('Escape', 27, 'Esc');
      verifyColorpicker('#2889e5', '40, 137, 229');
    });
  }));

  it('should specify type="button" on all button elements', async(() => {
    component.selectedOutputFormat = 'hex';
    openColorpickerAsync().then(() => {
      expect(fixture.nativeElement.querySelectorAll('button:not([type="button"])').length)
        .toBe(0);
    });
  }));
});
