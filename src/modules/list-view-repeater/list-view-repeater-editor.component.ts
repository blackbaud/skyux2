import {
  Component, Input, TemplateRef, ContentChildren, QueryList, ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'sky-list-view-repeater-editor',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyListViewRepeaterEditorComponent {
  /* tslint:disable */
  @Input('template') private inputTemplate: TemplateRef<any>;
  /* tslint:enable */
  @ContentChildren(TemplateRef) private templates: QueryList<TemplateRef<any>>;
  get template() { return this.templates.length > 0 ? this.templates.first : this.inputTemplate; }
}
