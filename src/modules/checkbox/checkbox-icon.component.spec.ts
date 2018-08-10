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
  SkyCheckboxModule
} from './checkbox.module';

/** Simple component for testing a single checkbox. */
@Component({
  template: `
  <div>
    <sky-checkbox-icon
        id="simple-check"
        [icon]="icon"
        [checkboxType]="checkboxType">
    </sky-checkbox-icon>
  </div>`
})
class SingleCheckboxComponent {
  public icon: string = 'bold';
  public checkboxType: string;
}

describe('Icon checkbox component', () => {
  let fixture: ComponentFixture<any>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SingleCheckboxComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        SkyCheckboxModule
      ]
    });
    fixture = TestBed.createComponent(SingleCheckboxComponent);
    debugElement = fixture.debugElement;
  });

  it('should set icon based on input', () => {
    fixture.detectChanges();

    let checkboxIcon = debugElement.query(By.css('i')).nativeElement;
    expect(checkboxIcon).toHaveCssClass('fa-bold');

    fixture.componentInstance.icon = 'umbrella';
    fixture.detectChanges();

    checkboxIcon = debugElement.query(By.css('i')).nativeElement;
    expect(checkboxIcon).toHaveCssClass('fa-umbrella');
  });

  it('should set span class based on checkbox type input', () => {
    fixture.detectChanges();

    let span = debugElement.query(By.css('span')).nativeElement;
    expect(span).toHaveCssClass('sky-switch-control-info');

    fixture.componentInstance.checkboxType = 'info';
    fixture.detectChanges();

    span = debugElement.query(By.css('span')).nativeElement;
    expect(span).toHaveCssClass('sky-switch-control-info');

    fixture.componentInstance.checkboxType = 'success';
    fixture.detectChanges();

    span = debugElement.query(By.css('span')).nativeElement;
    expect(span).toHaveCssClass('sky-switch-control-success');

    fixture.componentInstance.checkboxType = 'warning';
    fixture.detectChanges();

    span = debugElement.query(By.css('span')).nativeElement;
    expect(span).toHaveCssClass('sky-switch-control-warning');

    fixture.componentInstance.checkboxType = 'danger';
    fixture.detectChanges();

    span = debugElement.query(By.css('span')).nativeElement;
    expect(span).toHaveCssClass('sky-switch-control-danger');
  });
});
