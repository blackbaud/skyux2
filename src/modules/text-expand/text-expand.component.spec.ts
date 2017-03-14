import {
  TestBed,
  inject
} from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';

import { TextExpandTestComponent } from './fixtures/text-expand.component.fixture';
import { SkyTextExpandModule } from './text-expand.module';
import { SkyResources } from '../resources/resources';

import {
  SkyModalService,
  SkyModalModule
} from '../modal';

describe('Text expand component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TextExpandTestComponent
      ],
      imports: [
        BrowserModule,
        SkyTextExpandModule,
        SkyModalModule
      ]
    });
  });

  beforeEach(
    inject(
      [
        SkyModalService
      ],
      (
        _modalService: SkyModalService
      ) => {
        _modalService.dispose();
      }
    )
  );

  describe('basic behaviors', () => {
    it('should not have see more button or ellipsis if text is short', () => {
      let fixture = TestBed.createComponent(TextExpandTestComponent);
      let cmp = fixture.componentInstance as TextExpandTestComponent;
      let el = fixture.nativeElement as HTMLElement;

      // tslint:disable-next-line
      cmp.text = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu';

      fixture.detectChanges();

      let ellipsis: any = el.querySelector('.sky-text-expand-ellipsis');
      let seeMoreButton: any = el.querySelector('.sky-text-expand-see-more');
      expect(ellipsis).toBeNull();
      expect(seeMoreButton).toBeNull();
    });

    it('should have the see more button and ellipsis if text is longer', () => {
      let fixture = TestBed.createComponent(TextExpandTestComponent);
      let cmp = fixture.componentInstance as TextExpandTestComponent;
      let el = fixture.nativeElement as HTMLElement;

      // tslint:disable-next-line
      cmp.text = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec.';

      fixture.detectChanges();
      let ellipsis: any = el.querySelector('.sky-text-expand-ellipsis');
      let seeMoreButton: any = el.querySelector('.sky-text-expand-see-more');
      expect(ellipsis).not.toBeNull();
      expect(seeMoreButton).not.toBeNull();
      expect(seeMoreButton.innerText.trim()).toBe(SkyResources.getString('text_expand_see_more'));
    });

    it('should not display anything if no value is given for the text', () => {
      let fixture = TestBed.createComponent(TextExpandTestComponent);
      let cmp = fixture.componentInstance as TextExpandTestComponent;
      let el = fixture.nativeElement as HTMLElement;

      // tslint:disable-next-line
      cmp.text = undefined;

      fixture.detectChanges();

      let ellipsis: any = el.querySelector('.sky-text-expand-ellipsis');
      let seeMoreButton: any = el.querySelector('.sky-text-expand-see-more');
      let textArea: HTMLElement = <HTMLElement>el.querySelector('.sky-text-expand-text');
      expect(ellipsis).toBeNull();
      expect(seeMoreButton).toBeNull();
      expect(textArea.innerText.trim()).toBe('');
    });

    it('should have the see more button or ellipsis if text is short but has newlines', () => {
      let fixture = TestBed.createComponent(TextExpandTestComponent);
      let cmp = fixture.componentInstance as TextExpandTestComponent;
      let el = fixture.nativeElement as HTMLElement;

      // tslint:disable-next-line
      cmp.text = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\nAenean commodo ligula eget dolor. Aenean massa.\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu';

      fixture.detectChanges();

      let ellipsis: any = el.querySelector('.sky-text-expand-ellipsis');
      let seeMoreButton: any = el.querySelector('.sky-text-expand-see-more');
      expect(ellipsis).not.toBeNull();
      expect(seeMoreButton).not.toBeNull();
      expect(seeMoreButton.innerText.trim()).toBe(SkyResources.getString('text_expand_see_more'));
    });

    it('should expand on click of the see more button', () => {
      let fixture = TestBed.createComponent(TextExpandTestComponent);
      let cmp = fixture.componentInstance as TextExpandTestComponent;
      let el = fixture.nativeElement as HTMLElement;
      // tslint:disable-next-line
      let expandedText = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec.';
      cmp.text = expandedText;
      // tslint:disable-next-line
      let collapsedText = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec';

      fixture.detectChanges();

      let ellipsis: any = el.querySelector('.sky-text-expand-ellipsis');
      let seeMoreButton: any = el.querySelector('.sky-text-expand-see-more');
      let textArea: HTMLElement = <HTMLElement>el.querySelector('.sky-text-expand-text');
      let container: HTMLElement = <HTMLElement>el.querySelector('.sky-text-expand-container');
      expect(ellipsis).not.toBeNull();
      expect(seeMoreButton.innerText.trim()).toBe(SkyResources.getString('text_expand_see_more'));
      expect(textArea.innerText.trim()).toBe(collapsedText);

      seeMoreButton.click();
      document.querySelector('.sky-text-expand-container')
        .dispatchEvent(new Event('transitionend'));
      fixture.detectChanges();
      ellipsis = el.querySelector('.sky-text-expand-ellipsis');
      textArea = <HTMLElement>el.querySelector('.sky-text-expand-text');

      expect(container.style.height).toBe('auto');
      expect(seeMoreButton.innerText.trim()).toBe(SkyResources.getString('text_expand_see_less'));
      expect(ellipsis).toBeNull();
      expect(textArea.innerText.trim()).toBe(expandedText);

      seeMoreButton.click();
      document.querySelector('.sky-text-expand-container')
        .dispatchEvent(new Event('transitionend'));
      fixture.detectChanges();

      ellipsis = el.querySelector('.sky-text-expand-ellipsis');
      textArea = <HTMLElement>el.querySelector('.sky-text-expand-text');

      expect(container.style.height).toBe('auto');
      expect(seeMoreButton.innerText.trim()).toBe(SkyResources.getString('text_expand_see_more'));
      expect(ellipsis).not.toBeNull();
      expect(textArea.innerText.trim()).toBe(collapsedText);
    });
  });

  describe('modal behaviors', () => {
    it('should open a modal when looking at very long text', () => {
      let fixture = TestBed.createComponent(TextExpandTestComponent);
      let cmp = fixture.componentInstance as TextExpandTestComponent;
      let el = fixture.nativeElement as HTMLElement;

      // tslint:disable-next-line
      let expandedText = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies';
      cmp.text = expandedText;
      // tslint:disable-next-line
      let collapsedText = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec';

      fixture.detectChanges();

      let ellipsis: any = el.querySelector('.sky-text-expand-ellipsis');
      let seeMoreButton: any = el.querySelector('.sky-text-expand-see-more');
      let textArea: HTMLElement = <HTMLElement>el.querySelector('.sky-text-expand-text');
      let modal = document.querySelector('.sky-modal');

      expect(ellipsis).not.toBeNull();
      expect(modal).toBeNull();
      expect(seeMoreButton.innerText.trim()).toBe(SkyResources.getString('text_expand_see_more'));
      expect(textArea.innerText.trim()).toBe(collapsedText);

      seeMoreButton.click();
      fixture.detectChanges();

      modal = document.querySelector('.sky-modal');
      let modalHeader: HTMLElement = <HTMLElement>document.querySelector('sky-modal-header');
      let modalContent: HTMLElement = <HTMLElement>document.querySelector('sky-modal-content');
      let closeButton: HTMLElement =
        <HTMLElement>document.querySelector('sky-modal-footer button');

      expect(modal).not.toBeNull();
      expect(modalHeader.innerText.trim())
        .toBe(SkyResources.getString('text_expand_modal_title'));
      expect(modalContent.innerText.trim())
        .toBe(expandedText);
      expect(closeButton.innerText.trim()).toBe(SkyResources.getString('text_expand_close_text'));

      closeButton.click();
      fixture.detectChanges();

      modal = document.querySelector('.sky-modal');

      expect(modal).toBeNull();
    });
  });
});
