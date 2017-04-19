import {
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

import {
  SkyDatepickerModule
} from './datepicker.module';

import {
  DatepickerTestComponent
} from './fixtures/datepicker-calendar.component.fixture';

import {
  expect
} from '../testing';

describe('datepicker calendar', () => {

  let fixture: ComponentFixture<DatepickerTestComponent>;
  let component: DatepickerTestComponent;
  let nativeElement: HTMLElement;

  function verifyDaypicker(
    element: HTMLElement,
    header: string,
    selectedDay: string,
    activeDay: string,
    firstSecondaryDate: string
  ) {
    // Daypicker
    // verify month and year header
    expect(element.querySelector('.sky-datepicker-calendar-title'))
      .toHaveText(header);

    // verify selected date
    if (selectedDay !== '') {
       expect(element.querySelector('td .sky-datepicker-btn-selected'))
      .toHaveText(selectedDay);
    } else {
      expect(element.querySelector('td .sky-datepicker-btn-selected')).toBeNull();
    }

    // verify active date
    expect(element.querySelector('td .sky-btn-active'))
      .toHaveText(activeDay);

    // verify secondary date
    let secondaryEl = element.querySelector('tbody tr td .sky-btn-sm');
    expect(secondaryEl)
      .toHaveText(firstSecondaryDate);

    expect(secondaryEl.querySelector('span'))
      .toHaveCssClass('sky-datepicker-secondary');

  }

  beforeEach(() => {
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
  });

  it('should show the appropriate daypicker with the selected date', () => {

    component.selectedDate = new Date('4/4/2017');

    fixture.detectChanges();

    verifyDaypicker(nativeElement, 'April 2017', '04', '04', '26');

    // verify day of week labels
    let dayLabels = nativeElement.querySelectorAll('.sky-datepicker-weekdays');
    expect(dayLabels.item(0)).toHaveText('Su');
    expect(dayLabels.item(1)).toHaveText('Mo');
    expect(dayLabels.item(2)).toHaveText('Tu');
    expect(dayLabels.item(3)).toHaveText('We');
    expect(dayLabels.item(4)).toHaveText('Th');
    expect(dayLabels.item(5)).toHaveText('Fr');
    expect(dayLabels.item(6)).toHaveText('Sa');
  });

  it('should show the month picker with selected date when clicking on the month', () => {

  });

  it('should show the year picker with selected date when clicking the year', () => {

  });

  it('should move to another day within the current month in daypicker', () => {
    component.selectedDate = new Date('4/4/2017');

    fixture.detectChanges();

    // Click 8th date in datepicker (April 2nd)
    let dateButtonEl
      = nativeElement.querySelectorAll('tbody tr td .sky-btn-sm').item(7) as HTMLButtonElement;

    dateButtonEl.click();
    fixture.detectChanges();

    expect(component.selectedDate).toEqual(new Date('4/2/2017'));

    verifyDaypicker(nativeElement, 'April 2017', '02', '02', '26');

  });

  it('should move to another day in the next month in daypicker', () => {
    component.selectedDate = new Date('4/4/2017');

    fixture.detectChanges();

    // Click 38th day in datepicker (May 2nd)
    let dateButtonEl
      = nativeElement.querySelectorAll('tbody tr td .sky-btn-sm').item(37) as HTMLButtonElement;

    dateButtonEl.click();
    fixture.detectChanges();

    verifyDaypicker(nativeElement, 'May 2017', '02', '02', '30');
  });

  it('should move to the next month using arrows in daypicker', () => {
    component.selectedDate = new Date('4/4/2017');

    fixture.detectChanges();

    let nextArrowEl = nativeElement.querySelector('.sky-datepicker-btn-next') as HTMLButtonElement;

    nextArrowEl.click();
    fixture.detectChanges();

     verifyDaypicker(nativeElement, 'May 2017', '', '01', '30');
  });

  it('should move to the previous month using arrows in daypicker', () => {
    component.selectedDate = new Date('4/4/2017');

    fixture.detectChanges();

    let previousArrowEl
      = nativeElement.querySelector('.sky-datepicker-btn-previous') as HTMLButtonElement;

    previousArrowEl.click();
    fixture.detectChanges();

     verifyDaypicker(nativeElement, 'March 2017', '04', '01', '26');
  });

  it('should move to the next month and move to daypicker when clicking a month in monthpicker',
  () => {

  });

  it('should move to the next year when clicking arrows monthpicker', () => {

  });

  it('should move to the previous year when clicking arrows in monthpicker', () => {

  });

  it('should move to the next year and move to monthpicker when clicking year in yearpicker',
  () => {

  });

  it('should move to the next set of years when clicking arrows in yearpicker', () => {

  });

  it('should move to the previous set of years when clicking arrows in yearpicker', () => {

  });

  it('should handle minDate in daypicker', () => {

  });

  it('should handle maxDate in daypicker', () => {

  });

  it('should handle minDate in monthpicker', () => {

  });

  it('should handle maxDate in monthpicker', () => {

  });

  it('should handle minDate in yearpicker', () => {

  });

  it('should handle maxDate in yearpicker', () => {

  });

  it('should open current month in daypicker when no selected date is provided', () => {

  });

  it('should handle a different startingDay input', () => {

  });
});
