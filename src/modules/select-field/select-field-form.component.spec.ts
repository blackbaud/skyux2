import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '../testing';

import { SkySelectFieldFixturesModule } from './fixtures/select-field-fixtures.module';
import { SkySelectFieldFormTestComponent } from './fixtures/select-field-form.component.fixture';
import { SkySelectFieldContext } from './select-field-context';
import { SkySelectFieldFormComponent } from './select-field-form.component';
import { SkyModalInstance, SkyModalService, SkyModalHostService, SkyModalConfiguration } from '../modal';
describe('selectField component', () => {
  let fixture: ComponentFixture<SkySelectFieldFormTestComponent>;
  let component: SkySelectFieldFormTestComponent;
  let selectFieldFormComponent: SkySelectFieldFormComponent;
  const testPickerItems = [
    { id: '1', category: 'Pome', label: 'Apple', description: 'Anne eats apples' },
    { id: '2', category: 'Berry', label: 'Banana', description: 'Ben eats bananas' },
    { id: '3', category: 'Pome', label: 'Pear', description: 'Patty eats pears' }
  ];
  class MockModalService {
    constructor() { }
    public save() { return true; }
    public close() { return true; }
    public open() {
      return {
        closed: {
          subscribe: (callback: Function) => {
          }
        }
      };
    }
  }
  class MockModalHostService {
    constructor() { }
    public getModalZIndex() { }
    public onClose() { }
  }
  class MockModalConfiguration {
    public fullPage: boolean = false;
    constructor() { }
  }

  function getSelectFieldFormElements(): NodeListOf<HTMLElement> {
    fixture.detectChanges();
    const selectFieldFormElement = component.selectFieldFormElementRef.nativeElement;
    const selectFieldFormElements = selectFieldFormElement.querySelectorAll('sky-modal');
    return selectFieldFormElements as NodeListOf<HTMLElement>;
  }

  afterEach(() => { fixture.destroy(); });

  describe('Select field form component', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          SkySelectFieldFixturesModule
        ]
      });
      const context = new SkySelectFieldContext();
      context.pickerList = testPickerItems;
      context.pickerHeader = 'Test select field form';
      context.selectField = [testPickerItems[1]];
      context.selectFieldStyle = 'single';
      TestBed.overrideComponent(SkySelectFieldFormTestComponent,
        {
          set: {
            providers:
              [
                { provide: SkySelectFieldContext, useValue: context },
                { provide: SkyModalService, useValue: new MockModalService() },
                { provide: SkyModalInstance, useValue: new MockModalService() },
                { provide: SkyModalHostService, useValue: new MockModalHostService() },
                { provide: SkyModalConfiguration, useValue: new MockModalConfiguration() }
              ]
          }
        }
      );
      fixture = TestBed.createComponent(SkySelectFieldFormTestComponent);
      component = fixture.componentInstance;
      selectFieldFormComponent = component.selectFieldFormComponent;
    });

    it('should clear selection', () => {
      const spyOnClearSelection = spyOn(selectFieldFormComponent, 'clearSelection').and.callThrough();
      let selectFieldFormElements = getSelectFieldFormElements();
      (selectFieldFormElements.item(0).querySelector('.sky-select-field-picker-btn-clear') as HTMLElement).click();
      expect(spyOnClearSelection).toHaveBeenCalled();
    });

    it('should set selected item', () => {
      const spyOnSelectedItems = spyOnProperty(selectFieldFormComponent, 'selectedItems', 'set').and.callThrough();
      selectFieldFormComponent.selectedItems = [testPickerItems[2]];
      fixture.detectChanges();
      expect(spyOnSelectedItems).toHaveBeenCalledWith([Object(testPickerItems[2])]);
    });

    it('should get filter by category', () => {
      const spyOnPickerItemsCategories = spyOnProperty(selectFieldFormComponent, 'pickerItemsCategories', 'get').and.callThrough();
      let selectFieldFormElements = getSelectFieldFormElements();
      (selectFieldFormElements.item(0).querySelector('.sky-dropdown') as HTMLElement).click();
      expect(spyOnPickerItemsCategories).toHaveBeenCalled();
      expect(component.selectFieldFormComponent.pickerItemsCategories).toEqual(['Pome', 'Berry']);
    });

  });

  describe('Select field component select multiple', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          SkySelectFieldFixturesModule
        ]
      });
      const context = new SkySelectFieldContext();
      context.pickerList = testPickerItems;
      context.pickerHeader = 'Test select field form';
      context.selectField = [];
      context.selectFieldStyle = 'multiple';
      TestBed.overrideComponent(SkySelectFieldFormTestComponent,
        {
          set: {
            providers:
              [
                { provide: SkySelectFieldContext, useValue: context },
                { provide: SkyModalService, useValue: new MockModalService() },
                { provide: SkyModalInstance, useValue: new MockModalService() },
                { provide: SkyModalHostService, useValue: new MockModalHostService() },
                { provide: SkyModalConfiguration, useValue: new MockModalConfiguration() }
              ]
          }
        }
      );
      fixture = TestBed.createComponent(SkySelectFieldFormTestComponent);
      component = fixture.componentInstance;
      selectFieldFormComponent = component.selectFieldFormComponent;
    });
    it('should have close button in multiple select mode', () => {
      const spyOnClose = spyOn(selectFieldFormComponent, 'close').and.callThrough();
      const spyOnSelectedItemsChange = spyOn(selectFieldFormComponent, 'selectedItemsChange').and.callThrough();
      let selectFieldFormElements = getSelectFieldFormElements();
      (selectFieldFormElements.item(0).querySelector('.sky-select-field-picker-btn-close') as HTMLElement).click();
      expect(spyOnClose).toHaveBeenCalled();
      expect(spyOnSelectedItemsChange).not.toHaveBeenCalled();
    });

    it('should filter by string', () => {
      let selectFieldFormElements = getSelectFieldFormElements();
      let items = (selectFieldFormElements.item(0).querySelectorAll('.sky-list-view-checklist-item') as NodeListOf<HTMLElement>);
      expect(items.length).toEqual(3);
      component.selectFieldFormComponent.selectedItemsCategory('Pome');
      fixture.detectChanges();
      items = (selectFieldFormElements.item(0).querySelectorAll('.sky-list-view-checklist-item') as NodeListOf<HTMLElement>);
      expect(items.length).toEqual(2);
    });

    it('should select multiple items and save', () => {
      const spyOnSave = spyOn(selectFieldFormComponent, 'save').and.callThrough();
      const spyOnSelectedItemsChange = spyOn(selectFieldFormComponent, 'selectedItemsChange').and.callThrough();
      const spyOnSelectedItems = spyOnProperty(selectFieldFormComponent, 'selectedItems', 'set').and.callThrough();
      let selectFieldFormElements = getSelectFieldFormElements();
      let checkbox = (selectFieldFormElements.item(0).querySelectorAll('.sky-list-view-checklist-item input') as NodeListOf<HTMLElement>);
      checkbox[0].click();
      checkbox[2].click();
      fixture.detectChanges();
      (selectFieldFormElements.item(0).querySelector('.sky-select-field-picker-btn-save') as HTMLElement).click();
      expect(spyOnSave).toHaveBeenCalled();
      expect(spyOnSelectedItemsChange).toHaveBeenCalled();
      expect(spyOnSelectedItems).toHaveBeenCalledWith([Object(testPickerItems[0]), Object(testPickerItems[2])]);
    });
  });
});
