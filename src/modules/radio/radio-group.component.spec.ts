// #region imports
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import {
  By
} from '@angular/platform-browser';

import {
  SkyRadioFixturesModule,
  SkyRadioGroupTestComponent
} from './fixtures';
// #endregion

describe('Radio group component', function () {
  let fixture: ComponentFixture<SkyRadioGroupTestComponent>;
  let componentInstance: SkyRadioGroupTestComponent;

  beforeEach(function () {
    TestBed.configureTestingModule({
      imports: [
        SkyRadioFixturesModule
      ]
    });

    fixture = TestBed.createComponent(SkyRadioGroupTestComponent);
    componentInstance = fixture.componentInstance;
  });

  afterEach(function () {
    fixture.destroy();
  });

  it('should update the ngModel properly when radio button is changed', fakeAsync(function () {
    fixture.detectChanges();

    const radios = fixture.nativeElement.querySelectorAll('input');
    radios.item(1).click();
    fixture.detectChanges();
    tick();

    const value = componentInstance.radioForm.value.option;

    expect(radios.item(1).checked).toBe(true);
    expect(value.name).toEqual('Harima Kenji');
    expect(componentInstance.radioGroupComponent.value).toEqual(value);
  }));

  it('should update the radio buttons properly when ngModel is changed', fakeAsync(function () {
    fixture.detectChanges();
    expect(componentInstance.radioGroupComponent.value.name).toEqual('Lillith Corharvest');

    componentInstance.radioForm.patchValue({
      option: componentInstance.options[1]
    });
    fixture.detectChanges();
    tick();

    expect(componentInstance.radioGroupComponent.value.name).toEqual('Harima Kenji');
  }));

  it('should handle disabled state properly', fakeAsync(function (done: Function) {
    componentInstance.options[1].disabled = true;
    fixture.detectChanges();
    tick();

    const radios = fixture.nativeElement.querySelectorAll('input');
    radios.item(1).click();
    fixture.detectChanges();
    tick();

    expect(radios.item(1).checked).toBe(false);
    expect(componentInstance.radioForm.value.option.name).toBe('Lillith Corharvest');

    componentInstance.options[1].disabled = false;
    fixture.detectChanges();
    tick();

    radios.item(1).click();
    fixture.detectChanges();
    tick();

    expect(radios.item(1).checked).toBe(true);
    expect(componentInstance.radioForm.value.option.name).toBe('Harima Kenji');
  }));

  it('should maintain checked state when value is changed', fakeAsync(function () {
    fixture.detectChanges();

    let newValue = {
      name: 'Jerry Salmonella',
      disabled: false
    };

    let radioDebugElement = fixture.debugElement.query(By.css('sky-radio'));
    radioDebugElement.componentInstance.value = newValue;
    fixture.detectChanges();
    tick();

    expect(radioDebugElement.componentInstance.checked).toBeTruthy();

    newValue = {
      name: 'Sarah Jellyman',
      disabled: false
    };

    radioDebugElement = fixture.debugElement.query(By.css('sky-radio'));
    radioDebugElement.componentInstance.value = newValue;
    fixture.detectChanges();
    tick();

    expect(radioDebugElement.componentInstance.checked).toBeTruthy();
  }));
});
