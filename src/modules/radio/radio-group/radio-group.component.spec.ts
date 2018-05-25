import {
  TestBed,
  fakeAsync,
  ComponentFixture,
  tick
} from '@angular/core/testing';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  By
} from '@angular/platform-browser';

import { SkyRadioModule } from '../radio.module';
import { RadioGroupTestComponent } from '../fixtures/radio-group.component.fixture';

describe('Radio component', function () {

  let fixture: ComponentFixture<RadioGroupTestComponent>;
  let componentInstance: RadioGroupTestComponent;
  beforeEach(function () {
    TestBed.configureTestingModule({
      imports: [
        SkyRadioModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        RadioGroupTestComponent
      ]
    });
  });

  beforeEach(fakeAsync(function () {
    fixture = TestBed.createComponent(RadioGroupTestComponent);

    fixture.detectChanges();
    tick();
    componentInstance = fixture.componentInstance;
  }));

  afterEach(fakeAsync(function() {
    fixture.destroy();
  }));

  it('should update the ngModel properly when radio button is changed', fakeAsync(function () {
    let radio2El = fixture.debugElement.queryAll(By.css('sky-radio .sky-radio-wrapper'))[1];

    radio2El.nativeElement.click();
    fixture.detectChanges();
    tick();

    expect(radio2El.query(By.css('input')).nativeElement.checked).toBe(true);
    expect(componentInstance.radioForm.value['option'].name).toBe('Harima Kenji');

    let radioGroup = fixture.debugElement.query(By.css('sky-radio-group')).componentInstance;
    expect(radioGroup.selected).toBe(radio2El.componentInstance);
  }));

  it('should update the radio buttons properly when ngModel is changed', fakeAsync(function () {
    componentInstance.radioForm.patchValue({
      option: componentInstance.options[1]
    });

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    tick();

    let radio2El = fixture.debugElement.queryAll(By.css('sky-radio input'))[1];
    expect(radio2El.nativeElement.checked).toBe(true);
  }));

  it('should handle disabled state properly', fakeAsync(function (done: Function) {
    componentInstance.options[1].disabled = true;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    tick();

    let radio2El = fixture.debugElement.queryAll(By.css('sky-radio input'))[1];

    radio2El.nativeElement.click();

    fixture.detectChanges();
    tick();
    expect(radio2El.nativeElement.checked).toBe(false);
    expect(componentInstance.radioForm.value['option'].name).toBe('Lillith Corharvest');

    componentInstance.options[1].disabled = false;
    fixture.detectChanges();
    tick();

    radio2El.nativeElement.click();

    fixture.detectChanges();
    tick();
    expect(radio2El.nativeElement.checked).toBe(true);
    expect(componentInstance.radioForm.value['option'].name).toBe('Harima Kenji');
  }));

  it('should maintain checked state when value is changed', fakeAsync(function() {
    let newValue = {name: 'Jerry Salmonella', disabled: false};
    let radio1El = fixture.debugElement.query(By.css('sky-radio'));
    radio1El.componentInstance.value = newValue;

    fixture.detectChanges();
    tick();

    expect(radio1El.componentInstance.checked).toBeTruthy();

    let newValue2 = {name: 'Sarah Jellyman', disabled: false};
    let radio2El = fixture.debugElement.queryAll(By.css('sky-radio'))[2];
    radio2El.componentInstance.value = newValue2;

    fixture.detectChanges();
    tick();

    expect(radio2El.componentInstance.checked).toBeFalsy();
  }));

  it('should call update checked if radio is not yet checked', fakeAsync(function() {
    let radioGroup = fixture.debugElement.query(By.css('sky-radio-group')).componentInstance;
    let radio2El = fixture.debugElement.queryAll(By.css('sky-radio .sky-radio-wrapper'))[1].componentInstance;
    let changedCount = 0;

    radioGroup.registerOnChange(() => {
      changedCount += 1;
    });
    radioGroup.selected = radio2El;

    fixture.detectChanges();
    tick();

    expect(changedCount).toBe(0);
  }));

  it('should not call update checked if it is already checked', fakeAsync(function () {
    let radioGroup = fixture.debugElement.query(By.css('sky-radio-group')).componentInstance;
    let radio2El = fixture.debugElement.query(By.css('sky-radio .sky-radio-wrapper')).componentInstance;

    radioGroup.selected = radio2El;
    fixture.detectChanges();
    tick();

    expect(radio2El.checked).toBeTruthy();
  }));

  it('should clear selected if given an undefined value', fakeAsync(function () {
    let radioGroup = fixture.debugElement.query(By.css('sky-radio-group')).componentInstance;
    radioGroup.selected = undefined;

    fixture.detectChanges();
    tick();

    expect(radioGroup.value).toBe(undefined);
  }));

  it('should update radio button names when group name is changed', fakeAsync(function () {
    let radioGroup = fixture.debugElement.query(By.css('sky-radio-group')).componentInstance;
    radioGroup.name = 'datgroupdoh';

    fixture.detectChanges();
    tick();

    let radio2El = fixture.debugElement.query(By.css('sky-radio .sky-radio-wrapper')).componentInstance;
    expect(radio2El.name).toBe('datgroupdoh');
  }));
});
