import { DebugElement } from '@angular/core';
import {
  TestBed,
  async
} from '@angular/core/testing';
import { SkyLinkRecordsModule } from './';
import {
  SkyLinkRecordsItemContentInputTemplateTestComponent
} from './fixtures/link-records-item-content.component.input-template.fixture';
import {
  SkyLinkRecordsItemContentContentChildrenTestComponent
} from './fixtures/link-records-item-content.component.content-children.fixture';

describe('Component: SkyLinkRecordsItemContentComponent', () => {
  let fixture: any,
    element: DebugElement;

  describe('Fixture: inputTemplate', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          SkyLinkRecordsItemContentInputTemplateTestComponent
        ],
        imports: [
          SkyLinkRecordsModule
        ]
      });

      fixture = TestBed.createComponent(SkyLinkRecordsItemContentInputTemplateTestComponent);
      element = fixture.debugElement as DebugElement;
    }));

    it('template setter defines inputTemplate for content', () => {
      fixture.detectChanges();

      let elementItems = element.children[0].children.filter(
        (item) => { return item.name === 'sky-link-records-item-content'; });
      let component = elementItems[0].componentInstance;

      expect(component.template).toBeDefined();
    });
  });

  describe('Fixture: contentChildren', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          SkyLinkRecordsItemContentContentChildrenTestComponent
        ],
        imports: [
          SkyLinkRecordsModule
        ]
      });

      fixture = TestBed.createComponent(SkyLinkRecordsItemContentContentChildrenTestComponent);
      element = fixture.debugElement as DebugElement;
    }));

    it('content children defines template for content', () => {
      fixture.detectChanges();

      let elementItems = element.children[0].children.filter(
        (item) => { return item.name === 'sky-link-records-item-content'; });
      let component = elementItems[0].componentInstance;

      expect(component.template).toBeDefined();
    });
  });

});
