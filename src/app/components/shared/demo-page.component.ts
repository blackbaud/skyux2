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

  constructor(
    private titleService: SkyDemoTitleService) { }

  public ngOnInit() {
    this.updateTitle();
  }

  public ngAfterContentInit(): void {
    this.propertiesComponents.map((component: SkyDemoPagePropertiesComponent) => {
      this.tableOfContentsRoutes.push({
        name: component.sectionHeading,
        fragment: component.sectionHeading
          .toLowerCase()
          .replace(/ /g, '-')
          .replace(/[^\w-]+/g, '')
      });
    });
  }

  private updateTitle() {
    if (this.pageTitle) {
      this.titleService.setTitle(this.pageTitle, 'Components');
    }
  }
}
