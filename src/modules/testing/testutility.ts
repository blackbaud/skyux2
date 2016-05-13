import {
  ComponentFixture,
  TestComponentBuilder
} from '@angular/compiler/testing';
import { Type } from '@angular/core';

export class TestUtility {
  public static testComponent(
    tcb: TestComponentBuilder,
    componentType: Type,
    html: string,
    callback: (fixture: ComponentFixture<any>) => any
  ) {
    if (html) {
      tcb = tcb.overrideTemplate(componentType, html);
    }

    return tcb.createAsync(componentType)
      .then(callback);
  }

  public static testComponentWithProviders(
    tcb: TestComponentBuilder,
    componentType: Type,
    html: string,
    overrideComponentType: Type,
    providers: any[],
    callback: (fixture: ComponentFixture<any>) => any
  ) {
    return tcb.overrideTemplate(componentType, html)
      .overrideProviders(overrideComponentType, providers)
      .createAsync(componentType)
      .then(callback);
  }
}
