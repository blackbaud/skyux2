import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList
} from '@angular/core';

import { SkyDemoTitleService } from '../../shared/title.service';
import { SkyDemoPagePropertiesComponent } from './demo-page-properties.component';
import { SkyDemoPageExampleComponent } from './demo-page-example.component';
import { SkyDemoPageContentComponent } from './demo-page-content.component';

@Component({
  selector: 'sky-demo-page',
  templateUrl: './demo-page.component.html',
  styleUrls: ['./demo-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDemoPageComponent implements OnInit, AfterContentInit {
  @Input()
  public pageTitle: string;

  @Input()
  public summary: string;

  public tableOfContentsRoutes: any[] = [];

  @ContentChildren(SkyDemoPagePropertiesComponent)
  private propertiesComponents: QueryList<SkyDemoPagePropertiesComponent>;

  @ContentChildren(SkyDemoPageExampleComponent)
  private exampleComponents: QueryList<SkyDemoPageExampleComponent>;

  @ContentChildren(SkyDemoPageContentComponent)
  private contentComponents: QueryList<SkyDemoPageContentComponent>;

  constructor(
    private titleService: SkyDemoTitleService) { }

  public ngOnInit() {
    this.updateTitle();
  }

  public ngAfterContentInit(): void {
    this.propertiesComponents.map((component: any) => {
      this.tableOfContentsRoutes.push({
        name: component.sectionHeading,
        fragment: this.getFragment(component.sectionHeading),
        path: ''
      });
    });

    this.exampleComponents.map((component: any) => {
      this.tableOfContentsRoutes.push({
        name: 'Demo',
        fragment: 'demo',
        path: ''
      });
    });

    this.tableOfContentsRoutes.push({
      name: 'Code',
      fragment: 'code',
      path: ''
    });

    this.contentComponents.map((component: any) => {
      this.tableOfContentsRoutes.push({
        name: component.sectionHeading,
        fragment: this.getFragment(component.sectionHeading),
        path: ''
      });
    });
  }

  private getFragment(name: string): string {
    return name
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

  private updateTitle() {
    if (this.pageTitle) {
      this.titleService.setTitle(this.pageTitle, 'Components');
    }
  }
}
