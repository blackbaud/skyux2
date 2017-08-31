import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

import { SkyDemoTitleService } from '../../shared/title.service';

@Component({
  selector: 'sky-demo-page',
  templateUrl: './demo-page.component.html',
  styleUrls: ['./demo-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDemoPageComponent implements OnInit {
  @Input()
  public set pageTitle(value: string) {
    this._pageTitle = value;
  }

  public get pageTitle(): string {
    return this._pageTitle;
  }

  @Input()
  public summary: string;

  private _pageTitle: string;

  constructor(private titleService: SkyDemoTitleService) { }

  public ngOnInit() {
    this.updateTitle();
  }

  private updateTitle() {
    if (this.pageTitle) {
      this.titleService.setTitle(this.pageTitle, 'Components');
    }
  }
}
