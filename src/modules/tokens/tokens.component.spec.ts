import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import {
  expect,
  TestUtility
} from '../testing';

import { SkyTokensComponent } from './tokens.component';

import {
  SkyTokensMessageType
} from './types';

import { SkyTokensFixturesModule } from './fixtures/tokens-fixtures.module';
import { SkyTokensTestComponent } from './fixtures/tokens.component.fixture';

fdescribe('Tokens component', () => {
  let fixture: ComponentFixture<SkyTokensTestComponent>;
  let component: SkyTokensTestComponent;
  let tokensComponent: SkyTokensComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyTokensFixturesModule
      ]
    });

    fixture = TestBed.createComponent(SkyTokensTestComponent);
    component = fixture.componentInstance;
    tokensComponent = component.tokensComponent;
  });

  describe('basic setup', () => {
    it('should set defaults', () => {
      expect(tokensComponent['tokens']).toEqual([]);
      fixture.detectChanges();
      expect(tokensComponent.disabled).toEqual(false);
      expect(tokensComponent.dismissible).toEqual(true);
      expect(tokensComponent.displayWith).toEqual('name');
      expect(tokensComponent.focusable).toEqual(true);
      expect(tokensComponent.tokenStream).toBeUndefined();
      expect(tokensComponent.messageStream).toBeUndefined();
      expect(tokensComponent.activeIndex).toEqual(0);
    });

    it('should wrap internal content', () => {
      fixture.detectChanges();
      expect(component.tokensElementRef.nativeElement).toHaveText('INNER CONTENT');
    });
  });

  describe('events', () => {
    it('should emit when tokens change', () => {
      fixture.detectChanges();
      component.publishTokenStream();
      fixture.detectChanges();

      let tokens = tokensComponent['tokens'];
      expect(tokens.length).toEqual(3);
      expect(tokens[0].value.name).toEqual('Red');
      expect(tokens[1].value.name).toEqual('White');
      expect(tokens[2].value.name).toEqual('Blue');

      const spy = spyOn(component, 'onChanges').and.callThrough();
      component.tokensComponent.removeToken(tokens[0]);
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
      tokens = tokensComponent['tokens'];
      expect(tokens.length).toEqual(2);
      expect(tokens[0].value.name).toEqual('White');
      expect(tokens[1].value.name).toEqual('Blue');
    });

    it('should emit when the focus index has reached maximum', () => {});

    it('should emit when token is selected on click', () => {});
  });

  describe('message stream', () => {
    it('should focus last item', () => {
      component.publishMessageStream();
      fixture.detectChanges();

      component.publishTokenStream();
      fixture.detectChanges();

      const spy = spyOn((component.tokensComponent as any), 'focusLastToken').and.callThrough();

      component.messageStream.next({
        type: SkyTokensMessageType.FocusLastToken
      });
      fixture.detectChanges();

      const tokenElements = fixture.nativeElement.querySelectorAll('.sky-token');
      const lastToken = tokenElements[tokenElements.length - 1] as HTMLElement;

      expect(spy).toHaveBeenCalled();
      expect(component.tokensComponent.activeIndex).toEqual(tokenElements.length - 1);
      expect(document.activeElement).toEqual(lastToken);
    });
  });

  describe('keyboard interactions', () => {
    it('should navigate token focus with arrow keys', () => {});

    it('should select token with enter keyup', () => {});

    it('should remove a token with backspace keyup', () => {});

    it('should remove a token with delete keyup', () => {});
  });
});
