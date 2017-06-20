import {
  Directive,
  SimpleChanges,
  Input,
  AfterViewInit,
  OnChanges,
  ElementRef
} from '@angular/core';

@Directive({
    selector: '[skyHighlight]'
})
export class SkyTextHighlightDirective implements OnChanges, AfterViewInit {

  @Input()
  public skyHighlight: string = undefined;

  private existingHighlight = false;

  private static getHighlightedNodeText(node: HTMLElement, searchText: string): string {
    const html = node.innerHTML;
    const searchRegex = new RegExp(searchText, 'gm');
    const newHtml = html.replace(searchRegex, `<mark>${searchText}</mark>`);
    return newHtml;
  }

  private static getRemoveHighlightedHtml(node: HTMLElement): string {
    const html = node.innerHTML;
    const searchRegex = new RegExp(`<mark>|<\/mark>`, 'gm');
    const highlightRemoved = html.replace(searchRegex, '');

    return highlightRemoved;
  }

  constructor(private el: ElementRef) { }

  public ngOnChanges(changes: SimpleChanges): void {
    this.highlight();
  }

  public ngAfterViewInit(): void {
    this.highlight();
  }

  private readyForHighlight(searchText: string): boolean {
    return searchText && this.el.nativeElement;
  }

  private highlight(): void {
    if (this.existingHighlight) {
      // remove existing highlight
      const node: HTMLElement = this.el.nativeElement;
      const newHtml = SkyTextHighlightDirective.getRemoveHighlightedHtml(this.el.nativeElement);
      node.innerHTML = newHtml;
    }

    const searchText = this.skyHighlight;

    if (this.readyForHighlight(searchText)) {
      const node: HTMLElement = this.el.nativeElement;
      const newHtml = SkyTextHighlightDirective.getHighlightedNodeText(node, searchText);
      node.innerHTML = newHtml;
      this.existingHighlight = true;
    }
  }
}
