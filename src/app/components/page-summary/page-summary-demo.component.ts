import { Component } from '@angular/core';

@Component({
  selector: 'sky-page-summary-demo',
  templateUrl: './page-summary-demo.component.html'
})
export class SkyPageSummaryDemoComponent {
  public name = 'Robert C. Hernandez';

  public showAlert = true;

  public showImage = true;

  public showTitle = true;

  public showSubtitle = true;

  public showStatus = true;

  public showContent = true;

  public showKeyInfo = true;
}
