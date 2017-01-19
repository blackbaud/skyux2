import {
  TestBed,
  async,
  ComponentFixture
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { GridFixturesModule } from './fixtures/grid-fixtures.module';
import { GridTestComponent } from './fixtures/grid.component.fixture';

import {
  GridEmptyTestComponent
} from './fixtures/grid-empty.component.fixture';
import { SkyGridModule } from './';
import { SkyGridColumnModel } from './';

let moment = require('moment');

describe('Grid Component', () => {
  describe('Basic Fixture', () => {
    let component: GridTestComponent,
        fixture: ComponentFixture<GridTestComponent>,
        nativeElement: HTMLElement,
        element: DebugElement;

    beforeEach(async(() => {

      TestBed.configureTestingModule({
        imports: [
          GridFixturesModule,
          SkyGridModule
        ]
      });

      fixture = TestBed.createComponent(GridTestComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      element = fixture.debugElement as DebugElement;
      component = fixture.componentInstance;

      fixture.detectChanges();
      fixture.detectChanges();
    }));

    function getColumnHeader(id: string) {
      return element.query(
        By.css('th[sky-cmp-id="' + id + '"]')
      );
    }

    function getCell(rowId: string, columnId: string) {
      return element.query(
        By.css('tr[sky-cmp-id="' + rowId + '"] sky-grid-cell[sky-cmp-id="' + columnId + '"]')
      );
    }

    function verifyHeaders(useAllHeaders: boolean = false) {
      let headerCount = useAllHeaders ? 7 : 5;
      expect(element.queryAll(By.css('th.sky-grid-heading')).length).toBe(headerCount);
      expect(getColumnHeader('column1').nativeElement.textContent.trim()).toBe('Column1');
      expect(getColumnHeader('column2').nativeElement.textContent.trim()).toBe('Column2');
      expect(getColumnHeader('column3').nativeElement.textContent.trim()).toBe('Column3');
      expect(getColumnHeader('column4').nativeElement.textContent.trim()).toBe('Column4');
      expect(getColumnHeader('column5').nativeElement.textContent.trim()).toBe('Column5');
      if (useAllHeaders) {
        expect(getColumnHeader('hiddenCol1').nativeElement.textContent.trim()).toBe('Column6');
        expect(getColumnHeader('hiddenCol2').nativeElement.textContent.trim()).toBe('Column7');
      }
    }

    it('should show 5 columns', () => {
      verifyHeaders();
    });

    function verifyData(flatData: boolean = false, useAllHeaders: boolean = false) {

      for (let i = 0; i < component.data.length; i ++) {
        let row = component.data[i];
        let rowData: any;
        if (flatData) {
          rowData = row;
        } else {
          rowData = row.data;
        }
        expect(getCell(row.id, 'column1').nativeElement.textContent.trim())
          .toBe(rowData.column1);
        expect(getCell(row.id, 'column2').nativeElement.textContent.trim())
          .toBe(rowData.column2);
        expect(getCell(row.id, 'column3').nativeElement.textContent.trim())
          .toBe(rowData.column3.toString());
        expect(getCell(row.id, 'column3')
          .query(By.css('div.sky-test-custom-template'))).not.toBeNull();
        expect(getCell(row.id, 'column4').nativeElement.textContent.trim())
          .toBe(rowData.column4.toString());
        expect(getCell(row.id, 'column5').nativeElement.textContent.trim())
          .toBe(rowData.column5 || '');

        if (useAllHeaders) {
          expect(getCell(row.id, 'hiddenCol1').nativeElement.textContent).toBe(rowData.column1);
          expect(getCell(row.id, 'hiddenCol2').nativeElement.textContent).toBe(rowData.column1);
        }
      }
    }

    it('should show the table cells', () => {
      verifyData();
    });

    it('should transform data properly into a usable formate for the grid', () => {
      component.data = [
        {
          id: '1',
          column1: '1',
          column2: 'Apple',
          column3: 1,
          column4: moment().add(1, 'minute')
        },
        {
          id: '2',
          column1: '01',
          column2: 'Banana',
          column3: 1,
          column4: moment().add(6, 'minute'), column5: 'test'
        },
        {
          id: '3',
          column1: '11',
          column2: 'Carrot',
          column3: 11,
          column4: moment().add(4, 'minute')
        },
        {
          id: '4',
          column1: '12',
          column2: 'Daikon',
          column3: 12,
          column4: moment().add(2, 'minute')
        },
        {
          id: '5',
          column1: '13',
          column2: 'Edamame',
          column3: 13,
          column4: moment().add(5, 'minute')
        },
        {
          id: '6',
          column1: '20',
          column2: 'Fig',
          column3: 20,
          column4: moment().add(3, 'minute')
        },
        {
          id: '7',
          column1: '21',
          column2: 'Grape',
          column3: 21,
          column4: moment().add(7, 'minute')
        }
      ];

      fixture.detectChanges();
      fixture.detectChanges();

      verifyData(true);

    });

    it('should change displayed headers and data when selected columnids change', () => {
      component.selectedColumnIds = [
        'column1',
        'column2',
        'column3',
        'column4',
        'column5',
        'hiddenCol1',
        'hiddenCol2'
      ];
      fixture.detectChanges();

      verifyHeaders(true);
      verifyData(false, true);
    });

    it('should show all columns when selectedColumnIds is undefined', () => {

    });

    it(
    'should hide columns based on the hidden property on initialization when no selectedColumnIds',
    () => {

    });

    it('should the dragging class to the header on dragula drag', () => {

    });

    it('should remove the dragging class to the header of dragula draggend', () => {

    });

    it('should set selectedColumnIds to the new column order on drop and update headers and data',
      () => {

    });

    it('should set dragula options for locked columns', () => {

    });

    describe('Models and State', () => {

      it('should construct ListViewGridColumnModel without data', () => {
        let model = new SkyGridColumnModel(component.viewtemplates.first);
        expect(model.template).not.toBeUndefined();
        expect(model.description).toBeUndefined();
        expect(model.field).toBeUndefined();
        expect(model.heading).toBeUndefined();
        expect(model.id).toBeUndefined();
        expect(model.locked).toBeUndefined();
        expect(model.hidden).toBeUndefined();
        expect(model.type).toBeUndefined();
        expect(model.width).toBeUndefined();
      });
    });

  });

  describe('Empty Fixture', () => {
    let fixture: ComponentFixture<GridEmptyTestComponent>,
        nativeElement: HTMLElement,
        element: DebugElement,
        component: GridEmptyTestComponent;

    beforeEach(async(() => {

      TestBed.configureTestingModule({
        imports: [
          GridFixturesModule,
          SkyGridModule
        ]
      });

      fixture = TestBed.createComponent(GridEmptyTestComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      element = fixture.debugElement as DebugElement;
      component = fixture.componentInstance;
    }));

    it('should be able to set columns without using sky-grid-column component', () => {

    });
  });

});
