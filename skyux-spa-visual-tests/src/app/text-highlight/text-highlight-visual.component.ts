import { ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'text-highlight-visual',
  templateUrl: './text-highlight-visual.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextHighlightVisualComponent {
  public normalSearchTerm: string = 'enter';
  public blankSearchTerm: string = '';
  public notMatchedSearchTerm: string = 'xnotmatched';
}
