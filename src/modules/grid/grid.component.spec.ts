import {
  TestBed,
  async,
  ComponentFixture
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


import { ListItemModel } from '../list/state/items/item.model';
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
        fixture: any,
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
    }));

    function getColumnHeader(id: string) {
      return element.query(
        By.css('th[sky-cmp-id="' + id + '"]')
      );
    }

    it('should show 5 columns', () => {
      expect(element.queryAll(By.css('th.heading')).length).toBe(6);
      expect(getColumnHeader('column1').nativeElement.textContent.trim()).toBe('Column1');
      expect(getColumnHeader('column2').nativeElement.textContent.trim()).toBe('Column2');
      expect(getColumnHeader('column3').nativeElement.textContent.trim()).toBe('Column3');
      expect(getColumnHeader('column4').nativeElement.textContent.trim()).toBe('Column4');
      expect(getColumnHeader('column5').nativeElement.textContent.trim()).toBe('Column5');
    });

    it('should show the table cells', () => {

    });

    it('should transform data properly', () => {

    });

    it('should change displayed headers and data when selected columnids change', () => {

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
