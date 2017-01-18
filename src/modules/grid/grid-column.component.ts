import {
  Component,
  Input,
  ContentChildren,
  TemplateRef,
  QueryList,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'sky-grid-column',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyGridColumnComponent {
  @Input() public id: string;
  @Input() public heading: string;
  @Input() public description: string;
  @Input() public width: number;
  @Input() public hidden: boolean;
  @Input() public locked: boolean;
  @Input() public field: string;
  @Input() public type: string = 'string';

  /* tslint:disable */
  @Input('template')
  private templateInput: TemplateRef<any>;
  /* tslint:enable */

  @ContentChildren(TemplateRef)
  private templates: QueryList<TemplateRef<any>>;

  public get template(): TemplateRef<any> {
    return (this.templates.length > 0 ? this.templates.first : undefined) || this.templateInput;
  };
}
