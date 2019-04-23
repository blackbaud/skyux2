import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import {
  Subject
} from 'rxjs';

import {
  SkyProgressIndicatorChange,
  SkyProgressIndicatorMessageType
} from '@skyux/progress-indicator';

import {
  SkyModalService,
  SkyModalCloseArgs
} from '@skyux/modals';

import {
  SkyProgressIndicatorDemoFormComponent
} from './progress-indicator-demo-form.component';
import {
  SkyProgressIndicatorDemoContext
} from './progress-indicator-demo-context';

@Component({
  selector: 'app-progress-indicator-demo',
  templateUrl: './progress-indicator-demo.component.html',
  styleUrls: ['./progress-indicator-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyProgressIndicatorDemoComponent {

  public activeIndex = 0;
  public progressMessageStream = new Subject<SkyProgressIndicatorMessageType>();

  constructor(
    private modal: SkyModalService,
    private changeDetector: ChangeDetectorRef
  ) { }

  public configureConnection(isProgress: boolean): void {
    this.openModalForm(
      {
        title: 'Configure connection',
        buttonText: 'Submit connection settings'
      },
      isProgress
    );
  }

  public setServer(isProgress: boolean): void {
    this.openModalForm(
      {
        title: 'Select remote server',
        buttonText: 'Submit server choice'
      },
      isProgress
    );
  }

  public testConnection(isProgress: boolean): void {
    this.openModalForm(
      {
        title: 'Connection confirmed.',
        buttonText: 'OK'
      },
      isProgress
    );
  }

  public alertMessage(message: string): void {
    alert(message);
  }

  public updateIndex(changes: SkyProgressIndicatorChange): void {
    this.activeIndex = changes.activeIndex;
    this.changeDetector.detectChanges();
  }

  public resetClicked(): void {
    this.progressMessageStream.next(SkyProgressIndicatorMessageType.Reset);
  }

  private progress(): void {
    this.progressMessageStream.next(SkyProgressIndicatorMessageType.Progress);
  }

  private openModalForm(context: SkyProgressIndicatorDemoContext, isProgress: boolean): void {
    let modalForm = this.modal.open(SkyProgressIndicatorDemoFormComponent, [{
      provide: SkyProgressIndicatorDemoContext,
      useValue: context
    }]);
    modalForm.closed.take(1).subscribe((args: SkyModalCloseArgs) => {
      if (args.reason === 'save' && isProgress) {
        this.progress();
      }
    });
  }
}
