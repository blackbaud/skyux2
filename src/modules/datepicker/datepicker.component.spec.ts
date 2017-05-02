import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick
} from '@angular/core/testing';

import {
  FormsModule
} from '@angular/forms';

import {
  SkyDatepickerModule
} from './datepicker.module';

import {
  DatepickerTestComponent
} from './fixtures/datepicker.component.fixture';

import {
  expect
} from '../testing';

let moment = require('moment');

describe('datepicker', () => {
  let fixture: ComponentFixture<DatepickerTestComponent>;
  let component: DatepickerTestComponent;
  let nativeElement: HTMLElement;

  function openDatepicker(element: HTMLElement) {
    let dropdownButtonEl = element.querySelector('.sky-dropdown-button') as HTMLElement;
    dropdownButtonEl.click();
    fixture.detectChanges();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DatepickerTestComponent
      ],
      imports: [
        SkyDatepickerModule,
        FormsModule
      ]
    });

    fixture = TestBed.createComponent(DatepickerTestComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should create the component with the appropriate styles', () => {

    fixture.detectChanges();
    expect(nativeElement.querySelector('input')).toHaveCssClass('sky-form-control');
    expect(nativeElement
      .querySelector('.sky-input-group .sky-input-group-btn .sky-dropdown-button'))
      .not.toBeNull();
  });

  it('should keep the calendar open on mode change', () => {
    fixture.detectChanges();
    openDatepicker(nativeElement);

    let dropdownMenuEl = nativeElement.querySelector('.sky-dropdown-menu');
    expect(dropdownMenuEl).toHaveCssClass('sky-dropdown-open');

    let titleEl
      = nativeElement.querySelector('.sky-datepicker-calendar-title') as HTMLButtonElement;

    titleEl.click();
    fixture.detectChanges();

    dropdownMenuEl = nativeElement.querySelector('.sky-dropdown-menu');
    expect(dropdownMenuEl).toHaveCssClass('sky-dropdown-open');
  });

  it('should pass date back when date is selected in calendar', fakeAsync(() => {
    component.selectedDate = new Date('5/12/2017');
    fixture.detectChanges();
    openDatepicker(nativeElement);
    tick();
    fixture.detectChanges();

    expect(nativeElement.querySelector('td .sky-datepicker-btn-selected'))
      .toHaveText('12');

    expect(nativeElement.querySelector('.sky-datepicker-calendar-title'))
      .toHaveText('May 2017');

    // Click May 2nd
    let dateButtonEl
      = nativeElement.querySelectorAll('tbody tr td .sky-btn-default').item(2) as HTMLButtonElement;

    dateButtonEl.click();
    fixture.detectChanges();

    expect(component.selectedDate).toEqual(new Date('5/2/2017'));

    expect(nativeElement.querySelector('input').value).toBe('05/02/2017');

  }));

  describe('initialization', () => {
    it('should handle initializing with a Date object', fakeAsync(() => {
      component.selectedDate = new Date('5/12/2017');
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(nativeElement.querySelector('input').value).toBe('05/12/2017');
    }));

    it('should handle initializing with a string with the expected format', fakeAsync(() => {
      component.selectedDate = '5/12/2017';
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(nativeElement.querySelector('input').value).toBe('05/12/2017');

      expect(component.selectedDate).toEqual(new Date('05/12/2017'));
    }));

    it('should handle initializing with a ISO string', fakeAsync(() => {
      component.selectedDate = '2009-06-15T00:00:01';
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(nativeElement.querySelector('input').value).toBe('06/15/2009');

      expect(component.selectedDate)
        .toEqual(moment('2009-06-15T00:00:01', 'YYYY-MM-DDTHH:mm:ss').toDate());
    }));

    it('should handle initializing with an ISO string with offset', fakeAsync(() => {
      component.selectedDate = '1994-11-05T08:15:30-05:00';
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(nativeElement.querySelector('input').value).toBe('11/05/1994');

       expect(component.selectedDate)
        .toEqual(moment('1994-11-05T08:15:30-05:00', 'YYYY-MM-DDThh:mm:ss.sssZ').toDate());
    }));

    it('should handle two digit years', fakeAsync(() => {
      component.selectedDate = '5/12/17';
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(nativeElement.querySelector('input').value).toBe('05/12/2017');

      expect(component.selectedDate).toEqual(new Date('05/12/2017'));
    }));

    it('should handle undefined initialization', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(nativeElement.querySelector('input').value).toBe('');

      expect(nativeElement.querySelector('input')).not.toHaveCssClass('ng-invalid');
    }));

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

    it('should handle noValidate property', () => {

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
