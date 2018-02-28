import {
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';

import { SkyModalService } from '../modal/modal.service';
import { expect } from '../testing';

import { SkySelectFieldComponent } from './select-field.component';
import { SkySelectFieldFixturesModule } from './fixtures/select-field-fixtures.module';
import { SkySelectFieldTestComponent } from './fixtures/select-field.component.fixture';

describe('selectField component', () => {
  let fixture: ComponentFixture<SkySelectFieldTestComponent>;
  let component: SkySelectFieldTestComponent;
  let selectFieldComponent: SkySelectFieldComponent;

  function getSelectFieldElements(): NodeListOf<HTMLElement> {
    fixture.detectChanges();
    const selectFieldElement = component.selectFieldElementRef.nativeElement;
    const selectFieldElements = selectFieldElement.querySelectorAll('.sky-select-field');
    return selectFieldElements as NodeListOf<HTMLElement>;
  }

  function testDefaults() {
    selectFieldComponent.selectField = testPickerItemsSelected;
    selectFieldComponent.selectFieldClear = true;
    selectFieldComponent.selectFieldIcon = testSelectFieldIcon;
    selectFieldComponent.selectFieldPickerList = testPickerItems;
    selectFieldComponent.selectFieldStyle = testSingleSelectFieldStyle;
    selectFieldComponent.selectFieldText = testSelectFieldText;
    selectFieldComponent.selectFieldPickerHeader = testSelectFieldPickerHeader;
  }

  const testPickerItems = [
    { id: '1', category: 'Pome', label: 'Apple', description: 'Anne eats apples' },
    { id: '2', category: 'Berry', label: 'Banana', description: 'Ben eats bananas' },
    { id: '3', category: 'Pome', label: 'Pear', description: 'Patty eats pears' },
    { id: '4', category: 'Berry', label: 'Grape', description: 'George eats grapes' },
    { id: '5', category: 'Berry', label: 'Banana', description: 'Becky eats bananas' },
    { id: '6', category: 'Citrus', label: 'Lemon', description: 'Larry eats lemons' },
    { id: '7', category: 'Aggregate fruit', label: 'Strawberry', description: 'Sally eats strawberries' }
  ];
  const testSelectFieldIcon = 'fa-search';
  const testSelectFieldPickerHeader = 'Test Select Field Picker Header';
  const testSelectFieldText = 'Test Select Field Text';
  const testSingleSelectFieldStyle = 'single';
  const testMultiSelectFieldStyle = 'multiple';
  const testPickerItemsSelected = [testPickerItems[2], testPickerItems[4], testPickerItems[6]];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkySelectFieldFixturesModule
      ]
    });

    fixture = TestBed.createComponent(SkySelectFieldTestComponent);
    component = fixture.componentInstance;
    selectFieldComponent = component.selectFieldComponent;
  });

  beforeEach(inject([SkyModalService], (_modalService: SkyModalService) => { _modalService.dispose(); }));
  afterEach(() => { fixture.destroy(); });

  describe('basic setup', () => {
    it('should have defaults', () => {
      expect(selectFieldComponent.isSelectMultiple()).toEqual(true);
      expect(selectFieldComponent.isClearable()).toEqual(false);
      expect(selectFieldComponent.selectFieldIcon).toEqual('fa-sort');
      expect(selectFieldComponent.selectField).toEqual([]);
    });

    it('should set multiple select mode defaults', () => {
      selectFieldComponent.selectFieldStyle = testMultiSelectFieldStyle;
      fixture.detectChanges();
      expect(selectFieldComponent.isSelectMultiple()).toEqual(true);
      expect(selectFieldComponent.isClearable()).toEqual(false);
    });

    it('should set single select mode defaults', () => {
      testDefaults();
      selectFieldComponent.selectField = [testPickerItems[3]];
      fixture.detectChanges();
      expect(selectFieldComponent.isSelectMultiple()).toEqual(false);
      expect(selectFieldComponent.isClearable()).toEqual(true);
    });

    it('should set defaults', () => {
      testDefaults();
      fixture.detectChanges();
      expect(selectFieldComponent.selectFieldIcon).toEqual(testSelectFieldIcon);
      expect(selectFieldComponent.selectFieldText).toEqual(testSelectFieldText);
      expect(selectFieldComponent.selectField.length).toEqual(3);
    });
  });

  describe('Select field component', () => {
    it('should open and close select field picker', () => {
      let selectFieldElements: NodeListOf<HTMLElement>;
      const spyOnModalOpen = spyOn(selectFieldComponent, 'openFormModal').and.callThrough();
      selectFieldComponent.selectFieldPickerList = testPickerItems;
      selectFieldElements = getSelectFieldElements();
      (selectFieldElements.item(0).querySelector('.sky-select-field-picker-btn-open') as HTMLElement).click();
      expect(spyOnModalOpen).toHaveBeenCalled();
      fixture.detectChanges();
      const spyOnChangeEvent = spyOn(selectFieldComponent.selectFieldChange, 'emit');
      expect(document.querySelector('sky-checkbox input')).toExist();
      expect(document.querySelector('.sky-select-field-picker-btn-close')).toExist();
      (document.querySelector('sky-checkbox input') as HTMLElement).click();
      (document.querySelector('.sky-select-field-picker-btn-close') as HTMLElement).click();
      expect(spyOnChangeEvent).not.toHaveBeenCalled();
    });

    it('should open and save select field picker', () => {
      let selectFieldElements: NodeListOf<HTMLElement>;
      const expectedResults = [Object(testPickerItems[0])];
      const spyOnModalOpen = spyOn(selectFieldComponent, 'openFormModal').and.callThrough();
      selectFieldComponent.selectFieldPickerList = testPickerItems;
      selectFieldElements = getSelectFieldElements();
      (selectFieldElements.item(0).querySelector('.sky-select-field-picker-btn-open') as HTMLElement).click();
      expect(spyOnModalOpen).toHaveBeenCalled();
      fixture.detectChanges();
      const spyOnChangeEvent = spyOn(selectFieldComponent.selectFieldChange, 'emit');
      expect(document.querySelector('sky-checkbox input')).toExist();
      expect(document.querySelector('.sky-select-field-picker-btn-save')).toExist();
      (document.querySelector('sky-checkbox input') as HTMLElement).click();
      (document.querySelector('.sky-select-field-picker-btn-save') as HTMLElement).click();
      expect(spyOnChangeEvent).toHaveBeenCalledWith(expectedResults);
    });

  });
  describe('events', () => {
    it('should clear single select item', () => {
      testDefaults();
      selectFieldComponent.selectField = [testPickerItems[3]];
      fixture.detectChanges();
      expect(selectFieldComponent.isSelectMultiple()).toEqual(false);
      expect(selectFieldComponent.isClearable()).toEqual(true);
      selectFieldComponent.clearSelect();
      expect(selectFieldComponent.selectField).toEqual([]);
      expect(selectFieldComponent.isClearable()).toEqual(false);
    });

    it('should let tokens overflow', () => {
      const spyOnGet = spyOnProperty(selectFieldComponent, 'tokenOverflow', 'get').and.callThrough();
      const spyOnSet = spyOnProperty(selectFieldComponent, 'tokenOverflow', 'set').and.callThrough();
      const spy = spyOn(selectFieldComponent, 'clearSelect').and.callThrough();
      selectFieldComponent.selectFieldPickerList = testPickerItems;
      selectFieldComponent.selectField = testPickerItems;
      fixture.detectChanges();
      expect(spyOnSet).toHaveBeenCalledWith([Object({ value: Object({ name: '7 items selected' }) })]);
      expect(spyOnGet).toHaveBeenCalled();
      selectFieldComponent.tokenOverflow = [];
      expect(spy).toHaveBeenCalled();
    });

    it('should allow tokens in multiple mode', () => {
      const spyOnGet = spyOnProperty(selectFieldComponent, 'tokenValues', 'get').and.callThrough();
      const spyOnSet = spyOnProperty(selectFieldComponent, 'tokenValues', 'set').and.callThrough();
      selectFieldComponent.selectFieldPickerList = testPickerItems;
      selectFieldComponent.selectField = [testPickerItems[2]];
      fixture.detectChanges();
      expect(spyOnSet).toHaveBeenCalledWith([Object({ value: Object(testPickerItems[2]) })]);
      expect(spyOnGet).toHaveBeenCalled();
    });
  });

});
