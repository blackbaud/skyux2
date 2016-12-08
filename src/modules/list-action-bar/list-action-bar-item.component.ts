import {
  Component, Input, ContentChildren, TemplateRef, QueryList,
  ViewChild, ViewContainerRef, AfterContentInit
} from '@angular/core';

@Component({
  selector: 'sky-list-action-bar-item',
  template: '<template #actionBarItem></template>'
})
export class SkyListActionBarItemComponent implements AfterContentInit {
  /* tslint:disable */
  @Input('template') public templateInput: TemplateRef<any>;
  @ContentChildren(TemplateRef) private templates: QueryList<TemplateRef<any>>;
  /* tslint:enable */
  @ViewChild('actionBarItem', { read: ViewContainerRef }) private container: ViewContainerRef;

  public ngAfterContentInit() {
    if (this.template) {
      this.container.createEmbeddedView(this.template, this);
    }
  }

  public get template(): TemplateRef<any> {
    return this.templates && this.templates.length > 0 ? this.templates.first : this.templateInput;
  }
}
