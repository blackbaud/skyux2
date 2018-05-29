// #region imports
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import {
  NgModel
} from '@angular/forms';

import {
  By
} from '@angular/platform-browser';

import {
  SkyAppTestUtility
} from '@blackbaud/skyux-builder/runtime/testing/browser';

import {
  SkyRadioFixturesModule,
  SkyRadioTestComponent
} from './fixtures';

import {
  SkyRadioComponent
} from './radio.component';

import {
  SkyRadioLabelComponent
} from './radio-label.component';
// #endregion

describe('Radio component', function () {
  let fixture: ComponentFixture<SkyRadioTestComponent>;
  let componentInstance: SkyRadioTestComponent;

  beforeEach(function () {
    TestBed.configureTestingModule({
      imports: [
        SkyRadioFixturesModule
      ]
    });
  });

  beforeEach(function () {
    fixture = TestBed.createComponent(SkyRadioTestComponent);
    componentInstance = fixture.componentInstance;
  });

  afterEach(function () {
    fixture.destroy();
  });

  it('should update the ngModel properly when radio button is changed', fakeAsync(function () {
    fixture.detectChanges();
    tick();

    const radioElement = fixture.debugElement.queryAll(By.directive(SkyRadioComponent))[0];
    const ngModel = <NgModel>radioElement.injector.get(NgModel);

    expect(ngModel.valid).toBe(true);
    expect(ngModel.pristine).toBe(true);
    expect(ngModel.touched).toBe(false);

    const radios = fixture.nativeElement.querySelectorAll('input');
    radios.item(1).click();
    fixture.detectChanges();
    tick();

    expect(ngModel.valid).toBe(true);
    expect(ngModel.pristine).toBe(false);
    expect(ngModel.touched).toBe(true);
    expect(radios.item(1).checked).toBe(true);
    expect(componentInstance.selectedValue).toBe('2');

    SkyAppTestUtility.fireDomEvent(radios.item(1), 'blur');
    fixture.detectChanges();
    tick();

    expect(ngModel.touched).toBe(true);
  }));

  it('should register touch on blur', fakeAsync(function () {
    fixture.detectChanges();
    tick();

    const radioElement = fixture.debugElement.queryAll(By.directive(SkyRadioComponent))[0];
    const ngModel = <NgModel>radioElement.injector.get(NgModel);

    expect(ngModel.touched).toBe(false);

    const radios = fixture.nativeElement.querySelectorAll('input');
    SkyAppTestUtility.fireDomEvent(radios.item(1), 'blur');
    fixture.detectChanges();
    tick();

    expect(ngModel.touched).toBe(true);
  }));

  it('should update the radio buttons properly when ngModel is changed', fakeAsync(function () {
    fixture.detectChanges();
    componentInstance.selectedValue = '2';
    fixture.detectChanges();
    tick();

    const radios = fixture.nativeElement.querySelectorAll('input');
    expect(radios.item(1).checked).toBe(true);
  }));

  it('should maintain checked state when value is changed', fakeAsync(function() {
    fixture.detectChanges();
    tick();

    let radios = fixture.nativeElement.querySelectorAll('input');
    expect(radios.item(0).checked).toBeTruthy();

    fixture.componentInstance.value1 = 'abc';
    fixture.detectChanges();
    tick();

    radios = fixture.nativeElement.querySelectorAll('input');
    expect(radios.item(0).checked).toBeTruthy();
  }));

  it('should handle disabled state properly', fakeAsync(function () {
    componentInstance.disabled2 = true;
    fixture.detectChanges();
    tick();

    const radios = fixture.nativeElement.querySelectorAll('input');
    radios.item(1).click();
    fixture.detectChanges();
    tick();

    expect(radios.item(1).checked).toBe(false);
    expect(componentInstance.selectedValue).toBe('1');

    componentInstance.disabled2 = false;
    fixture.detectChanges();
    tick();

    radios.item(1).click();
    fixture.detectChanges();
    tick();

    expect(radios.item(1).checked).toBe(true);
    expect(componentInstance.selectedValue).toBe('2');
  }));

  it('should pass a label when specified', fakeAsync(function () {
    componentInstance.label1 = 'My label';
    fixture.detectChanges();
    tick();

    const radios = fixture.nativeElement.querySelectorAll('input');
    expect(radios.item(0).getAttribute('aria-label')).toBe('My label');
  }));

  it('should pass a labelled by id properly when specified', fakeAsync(function () {
    componentInstance.labelledBy3 = 'label-id';
    fixture.detectChanges();
    tick();

    const radios = fixture.nativeElement.querySelectorAll('input');
    expect(radios.item(2).getAttribute('aria-labelledby')).toBe('label-id');
  }));

  it('should pass a tabindex when specified', fakeAsync(function () {
    componentInstance.tabindex2 = '3';
    fixture.detectChanges();
    tick();

    const radios = fixture.nativeElement.querySelectorAll('input');
    expect(radios.item(1).getAttribute('tabindex')).toBe('3');
  }));

  it('should not change the selected value if the new value is undefined', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    const radioElement = fixture.debugElement.queryAll(By.directive(SkyRadioComponent))[2];
    const radioComponent = radioElement.componentInstance;

    radioComponent.selectedValue = 'foo';
    radioComponent.writeValue(undefined);

    expect(radioComponent.selectedValue).toEqual('foo');
  }));

  it('should prevent click events on the label from bubbling to parents', async(() => {
    let radioLabelElement = fixture.debugElement
      .query(By.css('#radio-clickable'))
      .query(By.directive(SkyRadioLabelComponent));

    spyOn(componentInstance, 'onClick');
    spyOn(radioLabelElement.componentInstance, 'onClick').and.callThrough();

    radioLabelElement.nativeElement.click();

    expect((componentInstance.onClick as any).calls.count()).toEqual(1);
    expect(radioLabelElement.componentInstance.onClick).toHaveBeenCalled();
  }));

  it('should not write the value if it is the same', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    const radioElement = fixture.debugElement.queryAll(By.directive(SkyRadioComponent))[0];
    const radioComponent = radioElement.componentInstance;

    let radios = fixture.nativeElement.querySelectorAll('input');
    expect(radios.item(0).checked).toBeTruthy();

    const spy = spyOn(radioComponent, 'onChangeCallback').and.callThrough();
    radioComponent.value = 'abc';
    fixture.detectChanges();
    tick();

    radios = fixture.nativeElement.querySelectorAll('input');
    expect(radios.item(0).checked).toBeTruthy();
    expect(spy).toHaveBeenCalled();
    spy.calls.reset();

    // Set the same value again:
    radioComponent.value = 'abc';
    fixture.detectChanges();
    tick();

    radios = fixture.nativeElement.querySelectorAll('input');
    expect(radios.item(0).checked).toBeTruthy();
    expect(spy).not.toHaveBeenCalled();
  }));
});
