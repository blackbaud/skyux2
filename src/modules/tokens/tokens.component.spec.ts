// import {
//   ComponentFixture,
//   TestBed
// } from '@angular/core/testing';

// import {
//   expect,
//   TestUtility
// } from '../testing';

// import { SkyTokensComponent } from './tokens.component';

// import {
//   SkyTokensMessageType
// } from './types';

// import { SkyTokensFixturesModule } from './fixtures/tokens-fixtures.module';
// import { SkyTokensTestComponent } from './fixtures/tokens.component.fixture';

// describe('Tokens component', () => {
//   let fixture: ComponentFixture<SkyTokensTestComponent>;
//   let component: SkyTokensTestComponent;
//   let tokensComponent: SkyTokensComponent;

//   function getTokenElements(): NodeListOf<HTMLElement> {
//     const tokensElement = component.tokensElementRef.nativeElement;
//     const tokenElements = tokensElement.querySelectorAll('sky-token');
//     return tokenElements as NodeListOf<HTMLElement>;
//   }

//   function verifyArrowKeyNavigation(keyRight: string, keyLeft: string) {
//     fixture.detectChanges();
//     component.publishTokens();
//     fixture.detectChanges();

//     expect(tokensComponent.activeIndex).toEqual(0);

//     const tokenElements = getTokenElements();

//     TestUtility.fireKeyboardEvent(tokenElements.item(0), 'keyup', {
//       key: keyRight
//     });
//     fixture.detectChanges();

//     expect(tokensComponent.activeIndex).toEqual(1);
//     expect(document.activeElement).toEqual(tokenElements.item(1).querySelector('.sky-token'));

//     TestUtility.fireKeyboardEvent(tokenElements.item(1), 'keyup', {
//       key: keyLeft
//     });
//     fixture.detectChanges();

//     expect(tokensComponent.activeIndex).toEqual(0);
//     expect(document.activeElement).toEqual(tokenElements.item(0).querySelector('.sky-token'));
//   }

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         SkyTokensFixturesModule
//       ]
//     });

//     fixture = TestBed.createComponent(SkyTokensTestComponent);
//     component = fixture.componentInstance;
//     tokensComponent = component.tokensComponent;
//   });

//   afterEach(() => {
//     fixture.destroy();
//   });

//   describe('basic setup', () => {
//     it('should set defaults', () => {
//       expect(tokensComponent.tokens).toEqual([]);
//       fixture.detectChanges();
//       expect(tokensComponent.disabled).toEqual(false);
//       expect(tokensComponent.dismissible).toEqual(true);
//       expect(tokensComponent.displayWith).toEqual('name');
//       expect(tokensComponent.messageStream).toBeUndefined();
//       expect(tokensComponent.activeIndex).toEqual(0);
//     });

//     it('should wrap internal content', () => {
//       fixture.detectChanges();
//       expect(component.tokensElementRef.nativeElement).toHaveText('INNER CONTENT');
//     });
//   });

//   describe('events', () => {
//     it('should emit when the focus index is greater than the number of tokens', () => {
//       fixture.detectChanges();
//       component.publishTokens();
//       fixture.detectChanges();

//       tokensComponent.activeIndex = 2;

//       const tokenElements = getTokenElements();
//       const spy = spyOn(component, 'onFocusIndexOverRange').and.callThrough();

//       TestUtility.fireKeyboardEvent(tokenElements.item(2), 'keyup', {
//         key: 'ArrowRight'
//       });
//       fixture.detectChanges();

//       expect(spy).toHaveBeenCalled();
//       expect(tokensComponent.activeIndex).toEqual(2);
//     });

//     it('should emit when the focus index is less than zero', () => {
//       fixture.detectChanges();
//       component.publishTokens();
//       fixture.detectChanges();

//       tokensComponent.activeIndex = 0;

//       const tokenElements = getTokenElements();
//       const spy = spyOn(component, 'onFocusIndexUnderRange').and.callThrough();

//       TestUtility.fireKeyboardEvent(tokenElements.item(0), 'keyup', {
//         key: 'ArrowLeft'
//       });
//       fixture.detectChanges();

//       expect(spy).toHaveBeenCalled();
//       expect(tokensComponent.activeIndex).toEqual(0);
//     });

//     it('should emit when token is selected on click', () => {
//       const spy = spyOn(component, 'onTokenSelected').and.callThrough();

//       fixture.detectChanges();
//       component.publishTokens();
//       fixture.detectChanges();

//       const tokenElements = getTokenElements();
//       tokenElements.item(0).click();
//       fixture.detectChanges();

//       expect(spy).toHaveBeenCalledWith({
//         token: tokensComponent.tokens[0]
//       });
//     });
//   });

//   describe('message stream', () => {
//     it('should focus last item', () => {
//       component.publishMessageStream();
//       fixture.detectChanges();
//       component.publishTokens();
//       fixture.detectChanges();

//       const spy = spyOn((tokensComponent as any), 'focusLastToken').and.callThrough();

//       component.messageStream.next({
//         type: SkyTokensMessageType.FocusLastToken
//       });
//       fixture.detectChanges();

//       const tokenElements = fixture.nativeElement.querySelectorAll('.sky-token');
//       const lastToken = tokenElements[tokenElements.length - 1] as HTMLElement;

//       expect(spy).toHaveBeenCalled();
//       expect(tokensComponent.activeIndex).toEqual(tokenElements.length - 1);
//       expect(document.activeElement).toEqual(lastToken);
//     });

//     it('should handle async message stream init', () => {
//       fixture.detectChanges();
//       component.publishTokens();
//       fixture.detectChanges();

//       component.publishMessageStream();
//       fixture.detectChanges();

//       const spy = spyOn((tokensComponent as any), 'focusLastToken').and.callThrough();

//       component.messageStream.next({
//         type: SkyTokensMessageType.FocusLastToken
//       });
//       fixture.detectChanges();

//       component.publishMessageStream();
//       fixture.detectChanges();

//       component.messageStream.next({
//         type: SkyTokensMessageType.FocusLastToken
//       });
//       fixture.detectChanges();

//       const tokenElements = fixture.nativeElement.querySelectorAll('.sky-token');
//       const lastToken = tokenElements[tokenElements.length - 1] as HTMLElement;

//       expect(spy.calls.count()).toEqual(2);
//       expect(tokensComponent.activeIndex).toEqual(tokenElements.length - 1);
//       expect(document.activeElement).toEqual(lastToken);
//     });

//     it('should handle empty tokens', () => {
//       component.publishMessageStream();
//       fixture.detectChanges();
//       component.disabled = true;
//       fixture.detectChanges();

//       expect(tokensComponent.activeIndex).toEqual(0);

//       component.messageStream.next({
//         type: SkyTokensMessageType.FocusLastToken
//       });
//       fixture.detectChanges();

//       expect(tokensComponent.activeIndex).toEqual(0);
//     });
//   });

//   describe('keyboard interactions', () => {
//     it('should navigate token focus with arrow keys', () => {
//       verifyArrowKeyNavigation('ArrowRight', 'ArrowLeft');
//     });

//     it('should navigate token focus with arrow keys (Edge/IE)', () => {
//       verifyArrowKeyNavigation('Right', 'Left');
//     });

//     it('should select token with enter keyup', () => {
//       const spy = spyOn(component, 'onTokenSelected').and.callThrough();

//       fixture.detectChanges();
//       component.publishTokens();
//       fixture.detectChanges();

//       const tokenElements = getTokenElements();

//       TestUtility.fireKeyboardEvent(tokenElements.item(0), 'keyup', {
//         key: 'Enter'
//       });
//       fixture.detectChanges();

//       expect(spy).toHaveBeenCalledWith({
//         token: tokensComponent.tokens[0]
//       });
//     });

//     it('should ignore keyboard events if tokens are disabled', () => {
//       component.disabled = true;
//       const spy = spyOn(component, 'onTokenSelected').and.callThrough();

//       fixture.detectChanges();
//       component.publishTokens();
//       fixture.detectChanges();

//       const tokenElements = getTokenElements();

//       TestUtility.fireKeyboardEvent(tokenElements.item(0), 'keyup', {
//         key: 'Enter'
//       });
//       fixture.detectChanges();

//       expect(spy).not.toHaveBeenCalled();
//     });

//     it('should ignore keyboard events if tokens not selectable', () => {
//       component.disabled = true;
//       const spy = spyOn(component, 'onTokenSelected').and.callThrough();

//       fixture.detectChanges();
//       component.publishTokens();
//       fixture.detectChanges();

//       const tokenElements = getTokenElements();
//       tokenElements.item(0).click();
//       fixture.detectChanges();

//       expect(spy).not.toHaveBeenCalled();
//     });
//   });

//   describe('token component', () => {
//     it('should dismiss a token when close button clicked', () => {
//       fixture.detectChanges();
//       component.publishTokens();
//       fixture.detectChanges();

//       expect(tokensComponent.tokens.length).toEqual(3);

//       const removedToken = tokensComponent.tokens[0];

//       const spy = spyOn(tokensComponent, 'removeToken').and.callThrough();

//       let tokenElements = getTokenElements();
//       (tokenElements.item(0).querySelector('.sky-token-btn-close') as HTMLElement).click();
//       fixture.detectChanges();

//       tokenElements = getTokenElements();
//       expect(tokensComponent.tokens.length).toEqual(2);
//       expect(spy).toHaveBeenCalledWith(removedToken);
//     });

//     it('should add a sky-btn-disabled class if disabled', () => {
//       component.disabled = true;
//       fixture.detectChanges();
//       component.publishTokens();
//       fixture.detectChanges();

//       expect(tokensComponent.tokens.length).toEqual(3);

//       const spy = spyOn(tokensComponent, 'removeToken').and.callThrough();

//       let tokenElements = getTokenElements();
//       (tokenElements.item(0).querySelector('.sky-token-btn-close') as HTMLElement).click();
//       fixture.detectChanges();

//       tokenElements = getTokenElements();
//       expect(tokenElements.item(0).querySelector('.sky-btn-disabled')).not.toBeNull();
//       expect(tokensComponent.tokens.length).toEqual(3);
//       expect(spy).not.toHaveBeenCalled();
//     });
//   });
// });
