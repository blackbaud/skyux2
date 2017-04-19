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

let moment = require('moment');

describe('datepicker calendar', () => {

  let fixture: ComponentFixture<DatepickerTestComponent>;
  let component: DatepickerTestComponent;
  let nativeElement: HTMLElement;

  function verifyDatepicker(
    element: HTMLElement,
    header: string,
    selectedLabel: string,
    activeLabel: string,
    firstSecondaryDate: string
  ) {
    // Daypicker
    // verify month and year header
    expect(element.querySelector('.sky-datepicker-calendar-title'))
      .toHaveText(header);

    // verify selected date
    if (selectedLabel !== '') {
       expect(element.querySelector('td .sky-datepicker-btn-selected'))
      .toHaveText(selectedLabel);
    } else {
      expect(element.querySelector('td .sky-datepicker-btn-selected')).toBeNull();
    }

    // verify active date
    expect(element.querySelector('td .sky-btn-active'))
      .toHaveText(activeLabel);

    // verify secondary date
    if (firstSecondaryDate !== '') {
      let secondaryEl = element.querySelector('tbody tr td .sky-btn-sm');
      expect(secondaryEl)
        .toHaveText(firstSecondaryDate);

      expect(secondaryEl.querySelector('span'))
        .toHaveCssClass('sky-datepicker-secondary');
    }

  }

  function clickDatepickerTitle(element: HTMLElement) {
    let monthTrigger
      = element.querySelector('.sky-datepicker-calendar-title') as HTMLButtonElement;

    monthTrigger.click();

    fixture.detectChanges();
  }

  function clickNextArrow(element: HTMLElement) {
    let nextArrowEl = element.querySelector('.sky-datepicker-btn-next') as HTMLButtonElement;

    nextArrowEl.click();
    fixture.detectChanges();
  }

  function clickPreviousArrow(element: HTMLElement) {
    let previousArrowEl
      = element.querySelector('.sky-datepicker-btn-previous') as HTMLButtonElement;

    previousArrowEl.click();
    fixture.detectChanges();
  }

  function clickNthDate(element: HTMLElement, index: number) {
    let dateButtonEl
      = element.querySelectorAll('tbody tr td .sky-btn-default').item(index) as HTMLButtonElement;

    dateButtonEl.click();
    fixture.detectChanges();
  }

  function verifyNthDateDisabled(
    element: HTMLElement,
    index: number,
    header: string,
    selectedLabel: string,
    activeLabel: string,
    firstSecondaryDate: string
    ) {
    let dateButtonEl
      = element.querySelectorAll('tbody tr td .sky-btn-default').item(index) as HTMLButtonElement;

    expect(dateButtonEl).toHaveCssClass('sky-btn-disabled');

    dateButtonEl.click();
    fixture.detectChanges();
    verifyDatepicker(element, header, selectedLabel, activeLabel, firstSecondaryDate);
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

    verifyDatepicker(nativeElement, 'April 2017', '04', '04', '26');

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
    component.selectedDate = new Date('4/4/2017');
    fixture.detectChanges();

    clickDatepickerTitle(nativeElement);

    verifyDatepicker(nativeElement, '2017', 'April', 'April', '');
  });

  it('should show the year picker with selected date when clicking the year', () => {
    component.selectedDate = new Date('4/4/2017');
    fixture.detectChanges();

    clickDatepickerTitle(nativeElement);
    clickDatepickerTitle(nativeElement);

    verifyDatepicker(nativeElement, '2017 - 2036', '2017', '2017', '');
  });

  it('should move to another day within the current month in daypicker', () => {
    component.selectedDate = new Date('4/4/2017');

    fixture.detectChanges();

    clickNthDate(nativeElement, 7);

    expect(component.selectedDate).toEqual(new Date('4/2/2017'));

    verifyDatepicker(nativeElement, 'April 2017', '02', '02', '26');

  });

  it('should move to another day in the next month in daypicker', () => {
    component.selectedDate = new Date('4/4/2017');

    fixture.detectChanges();

    clickNthDate(nativeElement, 37);

    verifyDatepicker(nativeElement, 'May 2017', '02', '02', '30');
  });

  it('should move to the next month using arrows in daypicker', () => {
    component.selectedDate = new Date('4/4/2017');

    fixture.detectChanges();

    clickNextArrow(nativeElement);
    verifyDatepicker(nativeElement, 'May 2017', '', '01', '30');
  });

  it('should move to the previous month using arrows in daypicker', () => {
    component.selectedDate = new Date('4/4/2017');

    fixture.detectChanges();

    clickPreviousArrow(nativeElement);

    verifyDatepicker(nativeElement, 'March 2017', '04', '01', '26');
  });

  it('should move to the next month and move to daypicker when clicking a month in monthpicker',
  () => {
    component.selectedDate = new Date('4/4/2017');
    fixture.detectChanges();

    clickDatepickerTitle(nativeElement);

    clickNthDate(nativeElement, 4);

    verifyDatepicker(nativeElement, 'May 2017', '', '01', '30');
  });

  it('should move to the next year when clicking arrows monthpicker', () => {
    component.selectedDate = new Date('4/4/2017');
    fixture.detectChanges();

    clickDatepickerTitle(nativeElement);

    clickNextArrow(nativeElement);

    verifyDatepicker(nativeElement, '2018', '', 'April', '');

  });

  it('should move to the previous year when clicking arrows in monthpicker', () => {
    component.selectedDate = new Date('4/4/2017');
    fixture.detectChanges();

    clickDatepickerTitle(nativeElement);

    clickPreviousArrow(nativeElement);

    verifyDatepicker(nativeElement, '2016', '', 'April', '');
  });

  it('should move to the next year and move to monthpicker when clicking year in yearpicker',
  () => {
    component.selectedDate = new Date('4/4/2017');
    fixture.detectChanges();

    clickDatepickerTitle(nativeElement);
    clickDatepickerTitle(nativeElement);

    clickNthDate(nativeElement, 3);

    verifyDatepicker(nativeElement, '2020', '', 'January', '');

  });

  it('should move to the next set of years when clicking arrows in yearpicker', () => {
    component.selectedDate = new Date('4/4/2017');
    fixture.detectChanges();

    clickDatepickerTitle(nativeElement);
    clickDatepickerTitle(nativeElement);

    clickNextArrow(nativeElement);

    verifyDatepicker(nativeElement, '2037 - 2056', '', '2037', '');
  });

  it('should move to the previous set of years when clicking arrows in yearpicker', () => {
    component.selectedDate = new Date('4/4/2017');
    fixture.detectChanges();

    clickDatepickerTitle(nativeElement);
    clickDatepickerTitle(nativeElement);

    clickPreviousArrow(nativeElement);

    verifyDatepicker(nativeElement, '1997 - 2016', '', '1997', '');
  });

  it('should handle minDate in daypicker', () => {

    component.selectedDate = new Date('4/4/2017');
    component.minDate = new Date('4/2/2017');
    fixture.detectChanges();

    verifyNthDateDisabled(nativeElement, 6, 'April 2017', '04', '04', '');

  });

  it('should handle maxDate in daypicker', () => {
    component.selectedDate = new Date('4/4/2017');
    component.maxDate = new Date('4/15/2017');
    fixture.detectChanges();

    verifyNthDateDisabled(nativeElement, 28, 'April 2017', '04', '04', '');
  });

  it('should handle minDate in monthpicker', () => {
    component.selectedDate = new Date('4/4/2017');
    component.minDate = new Date('4/2/2017');
    fixture.detectChanges();

    clickDatepickerTitle(nativeElement);

    verifyNthDateDisabled(nativeElement, 2, '2017', 'April', 'April', '');
  });

  it('should handle maxDate in monthpicker', () => {
    component.selectedDate = new Date('4/4/2017');
    component.maxDate = new Date('4/15/2017');
    fixture.detectChanges();

    clickDatepickerTitle(nativeElement);

    verifyNthDateDisabled(nativeElement, 4, '2017', 'April', 'April', '');
  });

  it('should handle minDate in yearpicker', () => {
    component.selectedDate = new Date('4/4/2017');
    component.minDate = new Date('4/2/2017');
    fixture.detectChanges();

    clickDatepickerTitle(nativeElement);
    clickDatepickerTitle(nativeElement);
    clickPreviousArrow(nativeElement);

    verifyNthDateDisabled(nativeElement, 19, '1997 - 2016', '', '1997', '');

    clickNextArrow(nativeElement);

    verifyDatepicker(nativeElement, '2017 - 2036', '2017', '2017', '');

  });

  it('should handle maxDate in yearpicker', () => {
    component.selectedDate = new Date('4/4/2017');
    component.maxDate = new Date('4/2/2017');
    fixture.detectChanges();

    clickDatepickerTitle(nativeElement);
    clickDatepickerTitle(nativeElement);
    verifyNthDateDisabled(nativeElement, 1, '2017 - 2036', '2017', '2017', '');
  });

  function verifyTodayDayPicker(element: HTMLElement) {
    let today = new Date();

    let monthLabel = moment(today.getTime()).format('MMMM');

    let yearLabel = moment(today.getTime()).format('YYYY');

    let dayLabel = moment(today.getTime()).format('DD');

    let dayPickerLabel = monthLabel + ' ' + yearLabel;

    verifyDatepicker(element, dayPickerLabel, '', dayLabel, '');
  }

  it('should open current month in daypicker when no selected date is provided', () => {
    fixture.detectChanges();

    verifyTodayDayPicker(nativeElement);
  });

  it('should handle a different startingDay input', () => {
    component.startingDay = 1;

    fixture.detectChanges();

    let dayLabels = nativeElement.querySelectorAll('.sky-datepicker-weekdays');
    expect(dayLabels.item(6)).toHaveText('Su');
    expect(dayLabels.item(0)).toHaveText('Mo');
    expect(dayLabels.item(1)).toHaveText('Tu');
    expect(dayLabels.item(2)).toHaveText('We');
    expect(dayLabels.item(3)).toHaveText('Th');
    expect(dayLabels.item(4)).toHaveText('Fr');
    expect(dayLabels.item(5)).toHaveText('Sa');
  });

  it('should handle a different startingDay input', () => {
    component.startingDay = 3;
    component.selectedDate = new Date('5/4/2017');

    fixture.detectChanges();

    let dayLabels = nativeElement.querySelectorAll('.sky-datepicker-weekdays');
    expect(dayLabels.item(4)).toHaveText('Su');
    expect(dayLabels.item(5)).toHaveText('Mo');
    expect(dayLabels.item(6)).toHaveText('Tu');
    expect(dayLabels.item(0)).toHaveText('We');
    expect(dayLabels.item(1)).toHaveText('Th');
    expect(dayLabels.item(2)).toHaveText('Fr');
    expect(dayLabels.item(3)).toHaveText('Sa');

    verifyDatepicker(nativeElement, 'May 2017', '04', '04', '26');
  });

  it('should allow users to set selected date using the writeValue function', () => {
    fixture.detectChanges();
    component.datepicker.writeValue(new Date('4/4/2017'));
    fixture.detectChanges();
    verifyDatepicker(nativeElement, 'April 2017', '04', '04', '');

    component.datepicker.writeValue(new Date('4/4/2017'));
    fixture.detectChanges();
    verifyDatepicker(nativeElement, 'April 2017', '04', '04', '');

    component.datepicker.writeValue(undefined);
    fixture.detectChanges();
    verifyTodayDayPicker

  });
});
