import {
  Component,
  DebugElement
} from '@angular/core';
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  BrowserModule,
  By
} from '@angular/platform-browser';
import {
  FormsModule
} from '@angular/forms';

import {
  expect
} from '@blackbaud/skyux-builder/runtime/testing/browser';

import {
  SkyRadioModule
} from './radio.module';

/** Simple component for testing a single radio button. */
@Component({
  template: `
  <div>
    <sky-radio-icon
        id="simple-check"
        [icon]="icon"
        [radioType]="radioType">
    </sky-radio-icon>
  </div>`
})
class SingleRadioComponent {
  public icon: string = 'bold';
  public radioType: string;
}

describe('Radio icon component', () => {
  let fixture: ComponentFixture<any>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SingleRadioComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        SkyRadioModule
      ]
    });
    fixture = TestBed.createComponent(SingleRadioComponent);
    debugElement = fixture.debugElement;
  });

  it('should set icon based on input', () => {
    fixture.detectChanges();

    let radioIcon = debugElement.query(By.css('i')).nativeElement;
    expect(radioIcon).toHaveCssClass('fa-bold');

    fixture.componentInstance.icon = 'umbrella';
    fixture.detectChanges();

    radioIcon = debugElement.query(By.css('i')).nativeElement;
    expect(radioIcon).toHaveCssClass('fa-umbrella');
  });

  it('should set span class based on radio type input', () => {
    fixture.detectChanges();

    let span = debugElement.query(By.css('span')).nativeElement;
    expect(span).toHaveCssClass('sky-switch-control-info');

    fixture.componentInstance.radioType = 'info';
    fixture.detectChanges();

    span = debugElement.query(By.css('span')).nativeElement;
    expect(span).toHaveCssClass('sky-switch-control-info');

    fixture.componentInstance.radioType = 'success';
    fixture.detectChanges();

    span = debugElement.query(By.css('span')).nativeElement;
    expect(span).toHaveCssClass('sky-switch-control-success');

    fixture.componentInstance.radioType = 'warning';
    fixture.detectChanges();

    span = debugElement.query(By.css('span')).nativeElement;
    expect(span).toHaveCssClass('sky-switch-control-warning');

    fixture.componentInstance.radioType = 'danger';
    fixture.detectChanges();

    span = debugElement.query(By.css('span')).nativeElement;
    expect(span).toHaveCssClass('sky-switch-control-danger');
  });
});
