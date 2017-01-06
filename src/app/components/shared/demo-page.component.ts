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
  public set title(value: string) {
    this._title = value;
  }

  public get title(): string {
    return this._title;
  }

  @Input()
  public summary: string;

  private _title: string;

  constructor(private titleService: SkyDemoTitleService) { }

  public ngOnInit() {
    this.updateTitle();
  }

  private updateTitle() {
    if (this.title) {
      this.titleService.setTitle(this.title, 'Components');
    }
  }
}
