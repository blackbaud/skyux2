import {
  Directive,
  SimpleChanges,
  Input,
  AfterViewInit,
  OnChanges,
  ElementRef
} from '@angular/core';

const className = 'sky-highlight-mark';

@Directive({
    selector: '[skyHighlight]'
})
export class SkyTextHighlightDirective implements OnChanges, AfterViewInit {

  @Input()
  public skyHighlight: string = undefined;

  private existingHighlight = false;

  private static getRemoveHighlightedHtml(node: HTMLElement): string {
    const html = node.innerHTML;
    const searchRegex = new RegExp(`<mark>|<\/mark>`, 'gi');
    const highlightRemoved = html.replace(searchRegex, '');

    return highlightRemoved;
  }

  private static getRegexMatch(node: HTMLElement, searchText: string): RegExpExecArray {
    const text = node.nodeValue;
    const searchRegex = new RegExp(searchText, 'gi');

    const result = searchRegex.exec(text);

    return result;
  }

  private static markTextNodes(node: any, searchText: string) {
    if (node.nodeType === 3) {
      const regexMatch = SkyTextHighlightDirective.getRegexMatch(node, searchText);

      if (regexMatch && regexMatch.length > 0) {

        // split apart text node with mark tags in the middle on the search term
        const matchIndex = regexMatch.index;

        const middle = node.splitText(matchIndex);
        middle.splitText(searchText.length);
        const middleClone = middle.cloneNode(true);

        const markNode = document.createElement('mark');
        markNode.className = className;
        markNode.appendChild(middleClone);
        middle.parentNode.replaceChild(markNode, middle);

        return 1;
      }
    } else if (node.nodeType === 1 && node.childNodes) {
      for (let i = 0; i < node.childNodes.length; i++) {
        let childNode = node.childNodes[i] as HTMLElement;
        i += SkyTextHighlightDirective.markTextNodes(childNode, searchText);
      }
    }

    return 0;
  }

  private static removeHighlight(el: ElementRef) {
    const matchedElements =
      el.nativeElement.querySelectorAll(`mark.${className}`) as NodeList;

    if (matchedElements) {
      for (let i = 0; i < matchedElements.length; i++) {
        const node = matchedElements[i];
        const parentNode = node.parentNode;

        parentNode.replaceChild(node.firstChild, node);
        parentNode.normalize();
      }
    }
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
    const searchText = this.skyHighlight;

    if (this.existingHighlight) {
      SkyTextHighlightDirective.removeHighlight(this.el);
    }

    if (this.readyForHighlight(searchText)) {
      const node: HTMLElement = this.el.nativeElement;

      // mark all matched text in the DOM
      SkyTextHighlightDirective.markTextNodes(node, searchText);
      this.existingHighlight = true;
    }
  }
}
