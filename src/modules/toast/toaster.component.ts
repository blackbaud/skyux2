// #region imports
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  Injector,
  ReflectiveInjector,
  QueryList,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';

import {
  Observable
} from 'rxjs/Observable';

import 'rxjs/add/operator/take';

import {
  SkyToast
} from './toast';

import {
  SkyToastService
} from './toast.service';
// #endregion

@Component({
  selector: 'sky-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyToasterComponent implements AfterViewInit {
  public get toastStream(): Observable<SkyToast[]> {
    return this.toastService.toastStream;
  }

  @ViewChildren('toastContent', { read: ViewContainerRef })
  private toastContent: QueryList<ViewContainerRef>;

  constructor(
    private toastService: SkyToastService,
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) { }

  public ngAfterViewInit(): void {
    this.injectToastContent();
    this.toastContent.changes.subscribe(() => {
      this.injectToastContent();
    });
  }

  public onToastClosed(toast: SkyToast): void {
    toast.instance.close();
  }

  private injectToastContent(): void {
    // Dynamically inject each toast's body content when the number of toasts changes.
    this.toastService.toastStream.take(1).subscribe((toasts) => {
      this.toastContent.toArray().forEach((target: ViewContainerRef, i: number) => {
        target.clear();

        const toast = toasts[i];
        const componentFactory = this.resolver.resolveComponentFactory(toast.bodyComponent);
        const injector = ReflectiveInjector.fromResolvedProviders(
          ReflectiveInjector.resolve(toast.bodyComponentProviders),
          this.injector
        );

        const componentRef = target.createComponent(componentFactory, undefined, injector);
        componentRef.changeDetectorRef.detectChanges();
      });
    });
  }
}
