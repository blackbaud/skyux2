import {
  ComponentFixture,
  TestComponentBuilder
} from 'angular2/testing';
import {Type} from 'angular2/core';

export class TestUtility {
  public static testComponent(
    tcb: TestComponentBuilder,
    componentType: Type,
    html: string,
    callback: (fixture: ComponentFixture) => any
  ) {
    return tcb.overrideTemplate(componentType, html)
      .createAsync(componentType)
      .then(callback);
  }

  public static testComponentWithProviders(
    tcb: TestComponentBuilder,
    componentType: Type,
    html: string,
    overrideComponentType: Type,
    providers: any[],
    callback: (fixture: ComponentFixture) => any
  ) {
    return tcb.overrideTemplate(componentType, html)
      .overrideProviders(overrideComponentType, providers)
      .createAsync(componentType)
      .then(callback);
  }
}
