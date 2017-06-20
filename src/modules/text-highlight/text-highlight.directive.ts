import { Directive, SimpleChanges, Input, AfterViewInit, OnChanges } from '@angular/core';

@Directive({
    selector: '[skyHighlight]'
})
export class SkyTextHighlightDirective implements OnChanges, AfterViewInit {

  @Input()
  public searchText: string = undefined;

  public ngOnChanges(changes: SimpleChanges): void {
    this.highlightText();
  }

  public ngAfterViewInit(): void {
    this.highlightText();
  }

  public highlightText() {
  }
}
