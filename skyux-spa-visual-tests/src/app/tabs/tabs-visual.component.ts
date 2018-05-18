import { ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'tabs-visual',
  templateUrl: './tabs-visual.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsVisualComponent {

  public showWizard = false;

  public requiredValue1: string;

  public requiredValue2: boolean;

  public newTabClick(): void { }

  public openTabClick(): void { }

  public closeTab(): void { }

  public get step2Disabled(): boolean {
    return !this.requiredValue1;
  }

  public get step3Disabled(): boolean {
    return this.step2Disabled || !this.requiredValue2;
  }

  public validateStep1(): void {
    return true;
  }
}
