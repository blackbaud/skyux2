import { DebugElement } from '@angular/core';
import {
  TestBed,
  async
} from '@angular/core/testing';
import { SkyLinkRecordsModule } from './';
import {
  SkyLinkRecordsItemTitleInputTemplateTestComponent
} from './fixtures/link-records-item-title.component.input-template.fixture';
import {
  SkyLinkRecordsItemTitleContentChildrenTestComponent
} from './fixtures/link-records-item-title.component.content-children.fixture';

describe('Component: SkyLinkRecordsItemTitleComponent', () => {
  let fixture: any,
    element: DebugElement;

  describe('Fixture: inputTemplate', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          SkyLinkRecordsItemTitleInputTemplateTestComponent
        ],
        imports: [
          SkyLinkRecordsModule
        ]
      });

      fixture = TestBed.createComponent(SkyLinkRecordsItemTitleInputTemplateTestComponent);
      element = fixture.debugElement as DebugElement;
    }));

    it('template setter defines inputTemplate for title', () => {
      fixture.detectChanges();
      let elementItems = element.children[0].children.filter(
        (item) => { return item.name === 'sky-link-records-item-title'; });
      let component = elementItems[0].componentInstance;

      expect(component.template).toBeDefined();
    });
  });

  describe('Fixture: contentChildren', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          SkyLinkRecordsItemTitleContentChildrenTestComponent
        ],
        imports: [
          SkyLinkRecordsModule
        ]
      });

      fixture = TestBed.createComponent(SkyLinkRecordsItemTitleContentChildrenTestComponent);
      element = fixture.debugElement as DebugElement;
    }));

    it('content children defines template for title', () => {
      fixture.detectChanges();
      let elementItems = element.children[0].children.filter(
        (item) => { return item.name === 'sky-link-records-item-title'; });
      let component = elementItems[0].componentInstance;

      expect(component.template).toBeDefined();
    });
  });
});
