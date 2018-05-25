import {
  TestBed,
  fakeAsync,
  ComponentFixture,
  tick,
  async
} from '@angular/core/testing';
import {
  FormsModule,
  NgModel
} from '@angular/forms';
import {
  By
} from '@angular/platform-browser';

import {
  SkyRadioModule
} from './radio.module';
import {
  SkyRadioComponent
} from './radio.component';
import {
  SkyRadioLabelComponent
} from './radio-label.component';
import {
  RadioTestComponent
} from './fixtures/radio.component.fixture';

describe('Radio component', function () {
  let fixture: ComponentFixture<RadioTestComponent>;
  let componentInstance: RadioTestComponent;

  beforeEach(function () {
    TestBed.configureTestingModule({
      imports: [
        SkyRadioModule,
        FormsModule
      ],
      declarations: [
        RadioTestComponent
      ]
    });
  });

  beforeEach(fakeAsync(function () {
    fixture = TestBed.createComponent(RadioTestComponent);

    fixture.detectChanges();
    tick();
    componentInstance = fixture.componentInstance;
  }));

  afterEach(fakeAsync(function() {
    fixture.destroy();
  }));

  function createEvent(eventName: string) {
    let evt = document.createEvent('CustomEvent');
    evt.initEvent(eventName, false, false);
    return evt;
  }

  it('should update the ngModel properly when radio button is changed', fakeAsync(function () {
    let radioElement = fixture.debugElement.queryAll(By.directive(SkyRadioComponent))[0];
    let ngModel = <NgModel>radioElement.injector.get(NgModel);
    let radio2El = fixture.debugElement.query(By.css('#hey .sky-radio-wrapper'));

    expect(ngModel.valid).toBe(true);
    expect(ngModel.pristine).toBe(true);
    expect(ngModel.touched).toBe(false);

    radio2El.nativeElement.click();

    fixture.detectChanges();
    tick();

    expect(ngModel.valid).toBe(true);
    expect(ngModel.pristine).toBe(false);
    expect(ngModel.touched).toBe(true);
    expect(radio2El.query(By.css('input')).nativeElement.checked).toBe(true);
    expect(componentInstance.selectedValue).toBe('2');
    expect(radio2El.componentInstance.checked).toBeTruthy();

    radio2El.query(By.css('input')).nativeElement.dispatchEvent(createEvent('blur'));
    expect(ngModel.touched).toBe(true);
  }));

  it('should update the radio buttons properly when ngModel is changed', fakeAsync(function () {
    componentInstance.selectedValue = '2';

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    tick();

    let radio2El = fixture.debugElement.query(By.css('#hey input'));
    expect(radio2El.nativeElement.checked).toBe(true);
  }));

  it('should maintain checked state when value is changed', fakeAsync(function() {
    let radio1El = fixture.debugElement.query(By.css('sky-radio'));
    radio1El.componentInstance.value = '55';

    fixture.detectChanges();
    tick();

    expect(radio1El.componentInstance.checked).toBeTruthy();

    let radio2El = fixture.debugElement.queryAll(By.css('sky-radio'))[2];
    radio2El.componentInstance.value = '44';

    fixture.detectChanges();
    tick();

    expect(radio2El.componentInstance.checked).toBeFalsy();
  }));

  it('should handle disabled state properly', fakeAsync(function () {
    componentInstance.disabled2 = true;
    fixture.detectChanges();
    tick();

    let radio2El = fixture.debugElement.query(By.css('#hey .sky-radio-wrapper'));

    radio2El.nativeElement.click();

    fixture.detectChanges();
    tick();
    expect(radio2El.query(By.css('input')).nativeElement.checked).toBe(false);
    expect(componentInstance.selectedValue).toBe('1');

    componentInstance.disabled2 = false;
    fixture.detectChanges();
    tick();

    radio2El.nativeElement.click();

    fixture.detectChanges();
    tick();
    expect(radio2El.query(By.css('input')).nativeElement.checked).toBe(true);
    expect(componentInstance.selectedValue).toBe('2');

  }));

  it('should pass a label when specified', fakeAsync(function () {
    componentInstance.label1 = 'My label';

    fixture.detectChanges();
    tick();

    let radio1El = fixture.debugElement.query(By.css('#hey-2 input'));
    expect(radio1El.nativeElement.getAttribute('aria-label')).toBe('My label');
  }));

  it('should pass a labelled by id properly when specified', fakeAsync(function () {
    componentInstance.labelledBy3 = 'label-id';

    fixture.detectChanges();
    tick();

    let radio1El = fixture.debugElement.query(By.css('#hey-3 input'));
    expect(radio1El.nativeElement.getAttribute('aria-labelledby')).toBe('label-id');
  }));

  it('should pass a tabindex when specified', fakeAsync(function () {
    componentInstance.tabindex2 = '3';

    fixture.detectChanges();
    tick();

    let radio1El = fixture.debugElement.query(By.css('#hey input'));
    expect(radio1El.nativeElement.getAttribute('tabindex')).toBe('3');
  }));

  it('should not change the selected value if the new value is undefined', fakeAsync(() => {
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
});
