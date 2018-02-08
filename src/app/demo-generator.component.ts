import {
  Component,
  ComponentFactoryResolver,
  Input,
  ReflectiveInjector,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'sky-demo-generator',
  templateUrl: './demo-generator.component.html',
  styleUrls: ['./demo-generator.component.scss']
})
export class SkyDemoGeneratorComponent {
  @Input()
  public set componentData(data: any) {
    if (!data) {
      return;
    }

    this.createComponent(data);
  }

  @ViewChild('dynamicComponentContainer', {
    read: ViewContainerRef
  })
  public dynamicComponentContainer: ViewContainerRef;
  public currentComponent: any;

  constructor(
    private resolver: ComponentFactoryResolver
  ) { }

  public createComponent(data: any): void {
    const injector = ReflectiveInjector.resolveAndCreate([]);
    const factory = this.resolver.resolveComponentFactory(data.component);
    const component = factory.create(injector);

    this.dynamicComponentContainer.insert(component.hostView);

    if (this.currentComponent) {
      this.currentComponent.destroy();
    }

    this.currentComponent = component;
  }
}
