import {
  Component
} from '@angular/core';

@Component({
  selector: 'sky-text-expand-demo',
  templateUrl: './text-expand-demo.component.html'
})
export class SkyTextExpandDemoComponent {
  // tslint:disable-next-line
  public longText = 'The text expand component truncates long blocks of text with an ellipsis and a link to expand the full text. When users click the link, the component expands to display the full text inline unless it exceeds limits on text characters or newline characters. If the text exceeds those limits, then the link expands the full text in a modal view instead. The component does not truncate text that is shorter than a specified threshold, but it always truncates text that includes newline characters and removes those newline characters from the truncated text.';

  // tslint:disable-next-line
  public newlinesText = 'The text expand component truncates long blocks of text with an ellipsis and a link to expand the full text.\nWhen users click the link, the component expands to display the full text inline unless it exceeds limits on text characters or newline characters.\nIf the text exceeds those limits, then the link expands the full text in a modal view instead.\nThe component does not truncate text that is shorter than a specified threshold, but it always truncates text that includes newline characters and removes those newline characters from the truncated text.';
}
