import { ComponentFixture, TestBed } from '@angular/core/testing';

import { expect } from '@blackbaud/skyux-builder/runtime/testing/browser';

import { SkyColumnComponent } from './column.component';

describe('SkyColumnComponent', () => {
  let component: SkyColumnComponent;
  let fixture: ComponentFixture<SkyColumnComponent>;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SkyColumnComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkyColumnComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should add a class to the host element', () => {
    fixture.detectChanges();
    expect(element.className).toContain('sky-column');
  });

  it('should add a class for small, medium, and large breakpoints', () => {
    component.screenXSmall = 1;
    component.screenSmall = 1;
    component.screenMedium = 2;
    component.screenLarge = 5;
    fixture.detectChanges();
    expect(element.className).toContain('sky-column-xs-1');
    expect(element.className).toContain('sky-column-sm-1');
    expect(element.className).toContain('sky-column-md-2');
    expect(element.className).toContain('sky-column-lg-5');
  });
});
