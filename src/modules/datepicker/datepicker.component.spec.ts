import {
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

import {
  SkyDatepickerModule
} from './datepicker.module';

import {
  DatepickerTestComponent
} from './fixtures/datepicker.component.fixture';

import {
  expect
} from '../testing';

describe('datepicker', () => {

  it('should create the component with the appropriate styles', () => {
    let fixture: ComponentFixture<DatepickerTestComponent>;
    let component: DatepickerTestComponent;
    let nativeElement: HTMLElement;

    TestBed.configureTestingModule({
      declarations: [
        DatepickerTestComponent
      ],
      imports: [
        SkyDatepickerModule
      ]
    });

    fixture = TestBed.createComponent(DatepickerTestComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
    expect(nativeElement.querySelector('input')).toHaveCssClass('sky-form-control');
    expect(nativeElement
      .querySelector('.sky-input-group .sky-input-group-btn .sky-dropdown-button'))
      .not.toBeNull();
  });

  it('should keep the calendar open on mode change', () => {

  });

  describe('initialization', () => {
    it('should handle initializing with a Date object', () => {

    });

    it('should handle initializing with a string with the expected format', () => {

    });

    it('should handle initializing with a ISO string', () => {

    });

    it('should handle initializing with an ISO string with offset', () => {

    });

    it('should handle two digit years', () => {

    });

    it('should handle undefined initialization', () => {

    });

  });

  describe('input change', () => {
    it('should handle input change with a Date object', () => {

    });

    it('should handle input change with a string with the expected format', () => {

    });

    it('should handle input change with a ISO string', () => {

    });

    it('should handle input change with an ISO string with offset', () => {

    });

    it('should handle two digit years', () => {

    });

    it('should pass date to calendar', () => {

    });
  });

  describe('formats', () => {
    it('should handle a dateFormat on the input different than the default', () => {

    });

    it('should handle a different dateFormat from the configuration service', () => {

    });
  });

  describe('model change', () => {
     it('should handle model change with a Date object', () => {

    });

    it('should handle model change with a string with the expected format', () => {

    });

    it('should handle model change with a ISO string', () => {

    });

    it('should handle model change with an ISO string with offset', () => {

    });

    it('should handle two digit years', () => {

    });
  });

  describe('validation', () => {
    it('should validate properly when invalid date is passed through input change', () => {

    });

    it('should validate properly when invalid date on initialization', () => {

    });

    it('should validate properly when invalid date on model change', () => {

    });

    it('should validate properly when input changed to empty string', () => {

    });

    it('should handle invalid and then valid date', () => {

    });

    it('should handle calendar date on invalid date', () => {

    });
  });

  describe('min max date', () => {
    it('should handle change above max date', () => {

    });

    it('should handle change below min date', () => {

    });

    it('should pass max date to calendar', () => {

    });

    it('should pass min date to calendar', () => {

    });
  });

});
