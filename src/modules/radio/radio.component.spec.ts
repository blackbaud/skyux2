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
  Component
} from '@angular/core';

import {
  By
} from '@angular/platform-browser';

import { SkyRadioModule } from './radio.module';
import { SkyRadioComponent } from './radio.component';
import { SkyRadioLabelComponent } from './radio-label.component';

describe('Radio component', function () {

  @Component({
    template: `
    <form>
      <sky-radio
        id="hey-2"
        name="testName"
        [value]="value1"
        [(ngModel)]="selectedValue"
        [label]="label1">
        <sky-radio-label>My label</sky-radio-label>
      </sky-radio>
      <sky-radio
        id="hey"
        name="testName"
        [value]="value2"
        [(ngModel)]="selectedValue"
        [tabindex]="tabindex2"
        [disabled]="disabled2">
        <sky-radio-label>My label</sky-radio-label>
      </sky-radio>
      <sky-radio
        id="hey-3"
        name="testName"
        [value]="value3"
        [(ngModel)]="selectedValue"
        [labelledBy]="labelledBy3">
        <sky-radio-label>My label</sky-radio-label>
      </sky-radio>
      <sky-radio id="radio-clickable" (click)="onClick()">
        <sky-radio-label>Label</sky-radio-label>
      </sky-radio>
    </form>
    `
  })
  class RadioTestComponent {
    public value1 = '1';
    public value2 = '2';
    public value3 = '3';
    public disabled2: boolean = false;
    public label1: string;
    public labelledBy3: string;
    public tabindex2: string;
    public selectedValue = '1';
    public onClick() {}
  }

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
    expect(ngModel.touched).toBe(false);
    expect(radio2El.query(By.css('input')).nativeElement.checked).toBe(true);
    expect(componentInstance.selectedValue).toBe('2');

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

  it('should not change the selected value if input is disabled', fakeAsync(() => {
    const radioElement = fixture.debugElement.queryAll(By.directive(SkyRadioComponent))[2];
    const radioComponent = radioElement.componentInstance;

    radioComponent.selectedValue = 'foo';
    radioComponent.disabled = true;
    radioComponent.onRadioChanged('bar');

    expect(radioComponent.selectedValue).toEqual('foo');
  }));

  it('should not change the selected value if the new value is the same', fakeAsync(() => {
    const radioElement = fixture.debugElement.queryAll(By.directive(SkyRadioComponent))[2];
    const radioComponent = radioElement.componentInstance;

    radioComponent.selectedValue = 'foo';
    radioComponent.disabled = false;
    radioComponent.onRadioChanged('foo');

    expect(radioComponent.selectedValue).toEqual('foo');
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
