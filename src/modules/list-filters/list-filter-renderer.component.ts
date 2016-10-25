import { Component, ViewContainerRef, ViewChild, Input, TemplateRef, OnInit } from '@angular/core';

@Component({
  selector: 'sky-list-filter-renderer',
  template: '<template #container></template>'
})
export class SkyListFilterRendererComponent implements OnInit {
  @Input() public template: TemplateRef<any>;
  @Input() public filter: any;
  @ViewChild('container', { read: ViewContainerRef }) private container: ViewContainerRef;

  public ngOnInit() {
    if (this.template !== undefined) {
      this.container.createEmbeddedView(this.template, this);
    }
  }
}
