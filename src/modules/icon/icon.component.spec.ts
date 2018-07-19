import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  SkyIconModule
} from './icon.module';

import {
  IconTestComponent
} from './fixtures/icon.component.fixture';

import {
  expect
} from '@blackbaud/skyux-builder/runtime/testing/browser';

describe('Icon component', () => {
  let fixture: ComponentFixture<IconTestComponent>;
  let cmp: IconTestComponent;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        IconTestComponent
      ],
      imports: [
        SkyIconModule
      ]
    });

    fixture = TestBed.createComponent(IconTestComponent);
    cmp = fixture.componentInstance as IconTestComponent;
    element = fixture.nativeElement as HTMLElement;
  });

  it('should display an icon based on the given icon', () => {
    fixture.detectChanges();
    expect(element.querySelector('.sky-icon')).toHaveCssClass('fa-circle');
    expect(element.querySelector('.sky-icon')).toHaveCssClass('fa-3x');
    expect(element.querySelector('.sky-icon')).not.toHaveCssClass('fa-fw');
    expect(element.querySelector('.sky-icon').getAttribute('aria-hidden')).toBe('true');
    expect(element.querySelector('.sky-icon').classList.length).toBe(4);
  });

  it('should display something other than circle', () => {
    cmp.icon = 'broom';
    cmp.size = '';
    cmp.fixedWidth = true;
    fixture.detectChanges();
    expect(cmp.icon).toBe('broom');
    expect(element.querySelector('.sky-icon')).toHaveCssClass('fa-broom');
    expect(element.querySelector('.sky-icon')).toHaveCssClass('fa-fw');
    expect(element.querySelector('.sky-icon').classList.length).toBe(4);
    expect(element.querySelector('.sky-icon').getAttribute('aria-hidden')).toBe('true');
  });
});