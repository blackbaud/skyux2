import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick
} from '@angular/core/testing';

import {
  expect,
  SkyAppTestUtility
} from '@blackbaud/skyux-builder/runtime/testing/browser';

import { SkyModalService } from '../modal/modal.service';

import { SkySelectFieldComponent } from './select-field.component';
import { SkySelectFieldFixturesModule } from './fixtures/select-field-fixtures.module';
import { SkySelectFieldTestComponent } from './fixtures/select-field.component.fixture';

describe('Select field component', () => {
  let fixture: ComponentFixture<SkySelectFieldTestComponent>;
  let component: SkySelectFieldTestComponent;
  let selectField: SkySelectFieldComponent;

  function setValue(value: any) {
    component.setValue(value);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(selectField.value).toEqual(value);
  }

  function openPicker() {
    const openSpy = spyOn(selectField, 'openPicker').and.callThrough();
    const openButton = fixture.nativeElement.querySelector('.sky-btn');
    openButton.click();
    tick();
    fixture.detectChanges();
    expect(openSpy).toHaveBeenCalled();
  }

  function savePicker() {
    const modalCloseButton = document.querySelector('.sky-select-field-picker-btn-save');
    (modalCloseButton as HTMLElement).click();
    tick();
    fixture.detectChanges();
  }

  function closePicker() {
    const modalCloseButton = document.querySelector('.sky-select-field-picker-btn-close');
    (modalCloseButton as HTMLElement).click();
    tick();
    fixture.detectChanges();
  }

  function getTokens(): NodeListOf<any> {
    return document.querySelectorAll('.sky-token');
  }

  function closeToken(index: number) {
    const tokens = getTokens();
    tokens.item(index).querySelector('button').click();
    tick();
    fixture.detectChanges();
  }

  function selectOptions(numToSelect: number) {
    const checkboxes = document.querySelectorAll('sky-checkbox input');

    for (let i = 0; i < numToSelect; i++) {
      (checkboxes.item(i) as HTMLElement).click();
      tick();
      fixture.detectChanges();
    }
  }

  function selectOption(index: number) {
    const buttons = document.querySelectorAll('.sky-list-view-checklist-single-button');
    (buttons.item(index) as HTMLElement).click();
    tick();
    fixture.detectChanges();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkySelectFieldFixturesModule
      ]
    });

    fixture = TestBed.createComponent(SkySelectFieldTestComponent);
    component = fixture.componentInstance;
    selectField = component.selectField;
  });

  beforeEach(inject([SkyModalService], (_modalService: SkyModalService) => {
    _modalService.dispose();
  }));

  afterEach(() => {
    fixture.destroy();
  });

  describe('basic setup', () => {
    it('should set defaults', () => {
      expect(selectField.ariaLabel).toEqual(undefined);
      expect(selectField.ariaLabelledBy).toEqual(undefined);
      expect(selectField.data).toEqual(undefined);
      expect(selectField.descriptorKey).toEqual('label');
      expect(selectField.disabled).toEqual(false);
      expect(selectField.selectMode).toEqual('multiple');
      expect(selectField.multipleSelectOpenButtonText).toEqual('Select values');
      expect(selectField.singleSelectClearButtonTitle).toEqual('Clear selection');
      expect(selectField.singleSelectOpenButtonTitle).toEqual('Click to select a value');
      expect(selectField.singleSelectPlaceholderText).toEqual('Select a value');
      expect(selectField.pickerHeading).toEqual('Select values');
    });

    it('should provide inputs', () => {
      component.ariaLabel = 'my-aria-label';
      component.ariaLabelledBy = 'my-aria-labelledby';
      component.descriptorKey = 'name';
      component.disabled = true;
      component.selectMode = 'single';
      component.multipleSelectOpenButtonText = 'open';
      component.singleSelectClearButtonTitle = 'clear title';
      component.singleSelectOpenButtonTitle = 'open title';
      component.singleSelectPlaceholderText = 'placeholder';
      component.pickerHeading = 'heading';

      fixture.detectChanges();

      expect(selectField.ariaLabel).toEqual('my-aria-label');
      expect(selectField.ariaLabelledBy).toEqual('my-aria-labelledby');
      expect(selectField.descriptorKey).toEqual('name');
      expect(selectField.disabled).toEqual(true);
      expect(selectField.selectMode).toEqual('single');
      expect(selectField.multipleSelectOpenButtonText).toEqual('open');
      expect(selectField.singleSelectClearButtonTitle).toEqual('clear title');
      expect(selectField.singleSelectOpenButtonTitle).toEqual('open title');
      expect(selectField.singleSelectPlaceholderText).toEqual('placeholder');
      expect(selectField.pickerHeading).toEqual('heading');
    });
  });

  describe('multiple select', () => {
    it('should set the value from ngModel', fakeAsync(() => {
      fixture.detectChanges();
      setValue([component.staticData[0]]);
      expect(selectField.value[0].id).toEqual(component.staticData[0].id);
    }));

    it('should collapse all tokens into one if many options are chosen', fakeAsync(() => {
      fixture.detectChanges();
      setValue([]);
      openPicker();
      selectOptions(6);
      savePicker();
      expect(selectField.value.length).toEqual(6);
      expect(getTokens().length).toEqual(1);
    }));

    it('should refresh value if tokens are closed', fakeAsync(() => {
      fixture.detectChanges();
      setValue([component.staticData[0]]);
      openPicker();
      selectOptions(2); // Click the selected option to unselect it!
      savePicker();
      expect(selectField.value.length).toEqual(1);

      let tokens = getTokens();
      expect(tokens.length).toEqual(1);

      closeToken(0);
      tokens = getTokens();
      expect(selectField.value.length).toEqual(0);
      expect(tokens.length).toEqual(0);
    }));
  });

  describe('single select', () => {
    it('should set the value from ngModel', fakeAsync(() => {
      component.selectMode = 'single';
      fixture.detectChanges();
      setValue(component.staticData[0]);
      expect(selectField.value.id).toEqual(component.staticData[0].id);
    }));

    it('should select a value from the picker', fakeAsync(() => {
      component.selectMode = 'single';
      fixture.detectChanges();
      setValue({});
      openPicker();
      selectOption(0);
      savePicker();
      expect(selectField.value.id).toEqual('1');
    }));

    it('should allow clearing the value', fakeAsync(() => {
      component.selectMode = 'single';
      fixture.detectChanges();
      setValue(component.staticData[0]);
      expect(selectField.value.id).toEqual('1');
      const selector = '.sky-input-group-btn .sky-btn';
      (fixture.nativeElement.querySelectorAll(selector).item(0) as HTMLElement)
        .click();
      tick();
      fixture.detectChanges();
      expect(selectField.value).toEqual(undefined);
    }));
  });

  describe('picker', () => {
    it('should open and close the picker', fakeAsync(() => {
      fixture.detectChanges();
      setValue(undefined);
      openPicker();
      selectOptions(1);
      closePicker();

      // Value should be unaffected since we cancelled our selection:
      expect(selectField.value).toBeUndefined();
    }));

    it('should open and save the picker', fakeAsync(() => {
      fixture.detectChanges();
      setValue([]);
      openPicker();
      selectOptions(2);
      savePicker();

      expect(selectField.value.length).toEqual(2);
      expect(selectField.value[0].id).toEqual('1');
      expect(getTokens().length).toEqual(2);
    }));

    it('should allow filtering by category', fakeAsync(() => {
      fixture.detectChanges();
      setValue([]);
      openPicker();

      const filterButton = document.querySelector('.sky-filter-btn');
      (filterButton as HTMLElement).click();
      tick();
      fixture.detectChanges();

      let values = document.querySelectorAll('sky-checkbox input');
      expect(values.length).toEqual(6);

      const select = document.querySelector('select') as HTMLSelectElement;
      const option = select.options[1];
      option.setAttribute('selected', 'selected');
      expect(option.value).toEqual('Pome');

      SkyAppTestUtility.fireDomEvent(select, 'change');
      tick();
      fixture.detectChanges();

      values = document.querySelectorAll('sky-checkbox input');
      expect(select.options.length).toEqual(5);
      expect(values.length).toEqual(2);
    }));
  });
});
