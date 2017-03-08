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
  @Input()
  public id: string;
  @Input()
  public heading: string;
  @Input()
  public width: number;
  @Input()
  public hidden: boolean;
  @Input()
  public locked: boolean;
  @Input()
  public field: string;
  @Input()
  public type: string;
  @Input()
  public description: string;
  @Input()
  public isSortable: boolean = true;

  /* tslint:disable */
  @Input('search')
  private searchFunction: (value: any, searchText: string) => boolean = this.search;

  @Input('template')
  private templateInput: TemplateRef<any>;
  /* tslint:enable */

  @ContentChildren(TemplateRef)
  private templates: QueryList<TemplateRef<any>>;

  public get template(): TemplateRef<any> {
    return (this.templates.length > 0 ? this.templates.first : undefined) || this.templateInput;
  }

  private search(value: any, searchText: string): boolean {
    /* tslint:disable */
    if (value !== undefined && value !== null) {
      return value.toString().toLowerCase().indexOf(searchText) !== -1;
    }
    /* tslint:enable */

    return false;
  }
}
