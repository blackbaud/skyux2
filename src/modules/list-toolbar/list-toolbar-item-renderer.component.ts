import { Component, ViewContainerRef, ViewChild, Input, TemplateRef, OnInit} from '@angular/core';

@Component({
  selector: 'sky-list-toolbar-item-renderer',
  template: '<template #container></template>',
  styles: [require('./list-toolbar-item-renderer.component.scss')]
})
export class SkyListToolbarItemRendererComponent implements OnInit {
  @Input() public template: TemplateRef<any>;
  @ViewChild('container', { read: ViewContainerRef }) private container: ViewContainerRef;

  public ngOnInit() {
    if (this.template !== undefined) {
      this.container.createEmbeddedView(this.template, this);
    }
  }
}
