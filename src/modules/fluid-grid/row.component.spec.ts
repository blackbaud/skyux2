import { ComponentFixture, TestBed } from '@angular/core/testing';

import { expect } from '../testing';

import { SkyRowComponent } from './row.component';

describe('SkyRowComponent', () => {
  let component: SkyRowComponent;
  let fixture: ComponentFixture<SkyRowComponent>;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SkyRowComponent
      ]
    });

    fixture = TestBed.createComponent(SkyRowComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create an element with a specific classname', () => {
    fixture.detectChanges();
    expect(element.querySelector('.sky-row')).toExist();
  });

  it('should add a classname to reverse the column order', () => {
    component.reverseColumnOrder = true;
    fixture.detectChanges();
    expect(element.querySelector('.sky-row-reverse')).toExist();
  });
});
