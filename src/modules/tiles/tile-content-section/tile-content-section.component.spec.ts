import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';

import { SkyTilesModule } from '../tiles.module';

import { TileContentSectionTestComponent } from './fixtures';

describe('Tile content section component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TileContentSectionTestComponent
      ],
      imports: [
        BrowserModule,
        SkyTilesModule
      ]
    });
  });

  it('should render the section content in the expected element', () => {
    let fixture = TestBed.createComponent(TileContentSectionTestComponent);
    let el = fixture.nativeElement;

    fixture.detectChanges();

    expect(
      el.querySelectorAll('.sky-tile-content-section .test-content').length
    ).toBe(1);
  });
});
