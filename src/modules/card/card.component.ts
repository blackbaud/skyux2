import { Component, EventEmitter, Input, Output, AfterContentInit, ContentChild } from '@angular/core';
import { SkyCardTitleComponent} from './card-title.component.ts';

@Component({
  selector: 'sky-card',
  styles: [require('./card.component.scss')],
  template: require('./card.component.html')
})
export class SkyCardComponent implements AfterContentInit {
  @Input()
  public size: string;

  @Input()
  public selectable: boolean;

  @Input()
  public selected: boolean;

  @Output()
  public selectedChange = new EventEmitter<boolean>();

  @ContentChild(SkyCardTitleComponent)
  public titleComponent: SkyCardTitleComponent;

  private _showTitle: boolean = true;

  ngAfterContentInit() {
    this._showTitle = this.titleComponent !== undefined;
  }


  public contentClick() {
    if (this.selectable) {
      this.selected = !this.selected;
      this.selectedChange.emit(this.selected);
    }
  };
}
