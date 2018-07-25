import { TestBed } from '@angular/core/testing';
import { SkyNumericModule } from './numeric.module';
import { SkyNumericService } from './numeric.service';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { SkyNumericPipe } from './numeric.pipe';

describe('Numeric pipe', () => {
  let skyNumericPipe: SkyNumericPipe;
  let skyNumeric = new SkyNumericService(
    new CurrencyPipe('en-US'),
    new DecimalPipe('en-US')
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyNumericModule
      ],
      providers: [
        SkyNumericPipe,
        {
          provide: SkyNumericService,
          useValue: skyNumeric
        }
      ]
    });
  });

  beforeEach(() => {
    skyNumericPipe = TestBed.get(SkyNumericPipe);
  });

  it('should pass all options to the sky numeric service', () => {

    let options: any = {
      digits: 2,
      format: 'currency',
      iso: 'USD',
      truncate: true,
      truncateAfter: 10000
    };
    expect(skyNumericPipe.transform(10001.00, options)).toBe('$10K');
  });

  it(`doesn''t require options to be set`, () => {
    expect(skyNumericPipe.transform(42.87, undefined)).toBe('42.9');
  });

  it(`doesn''t require option properties to be set`, () => {
    let options: any = {
      random: false
    };
    expect(skyNumericPipe.transform(42.87, options)).toBe('42.9');
  });
});
