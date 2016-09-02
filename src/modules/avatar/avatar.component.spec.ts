// import { TestBed } from '@angular/core/testing';

// import { expect } from '../testing';

// import { AvatarTestComponent } from './fixtures/avatar.component.fixture';
// import { SkyAvatarFixturesModule } from './fixtures/avatar-fixtures.module';

// describe('Avatar component', () => {
   /* tslint:disable-next-line max-line-length */
//   let imgBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAAFElEQVR42gEJAPb/AP//////////I+UH+Rtap+gAAAAASUVORK5CYII=';
//   let imgUrl = 'data:image/png;base64,' + imgBase64;

//   function getPhotoEl(el: Element): Element {
//     return el.querySelector('.sky-avatar-image');
//   }

//   function getPlaceholderEl(el: Element): Element {
//     return el.querySelector('.sky-avatar-initials');
//   }

//   function getImgBlob() {
//     let n = imgBase64.length;
//     let u8arr = new Uint8Array(n);

//     while (n--) {
//       u8arr[n] = imgBase64.charCodeAt(n);
//     }

//     let testBlob = new Blob([u8arr]);

//     return testBlob;
//   }

//   function getBackgroundImageUrl(el: Element): string {
//     let regex = /url\((.*?)\)/gi;
//     let backgroundImage = getComputedStyle(getPhotoEl(el)).backgroundImage;

//     let match = regex.exec(backgroundImage);

//     let url: string;

//     if (match && match.length > 0) {
//       url = match[1];

//       // Some browsers return quotes around the URL and some don't; account for both.
//       if (url.indexOf('"') === 0) {
//         url = url.substr(1, url.length - 2);
//       }
//     } else {
//       url = '';
//     }

//     return url;
//   }

//   function validateImageUrl(el: Element, url: string, startsWith: boolean = false) {
//       let backgroundImageUrl = getBackgroundImageUrl(el);

//       if (startsWith) {
//         expect(backgroundImageUrl.indexOf(url)).toBe(0);
//       } else {
//         expect(backgroundImageUrl).toBe(url);
//       }
//   }

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [SkyAvatarFixturesModule]
//     });
//   });

//   it('should display an image when an image URL is specified', () => {
//     let fixture = TestBed.createComponent(AvatarTestComponent);

//     fixture.componentInstance.name = 'Robert Hernandez';
//     fixture.componentInstance.src = imgUrl;

//     fixture.detectChanges();

//     let el = fixture.nativeElement;

//     expect(getPhotoEl(el)).toBeVisible();
//     expect(getPlaceholderEl(el)).not.toBeVisible();

//     validateImageUrl(el, imgUrl);
//   });

//   it('should display the record name\'s initials when no image is specified', () => {
//     let fixture = TestBed.createComponent(AvatarTestComponent);

//     fixture.componentInstance.name = 'Robert Hernandez';

//     fixture.detectChanges();

//     let el = fixture.nativeElement;

//     expect(getPhotoEl(el)).not.toBeVisible();
//     expect(getPlaceholderEl(el)).toBeVisible();

//     expect(el.querySelector('.sky-avatar-initials-inner')).toHaveText('RH');
//   });

//   it('should display nothing when no image or name is specified', () => {
//     let fixture = TestBed.createComponent(AvatarTestComponent);

//     fixture.detectChanges();

//     let el = fixture.nativeElement;

//     expect(getPhotoEl(el)).not.toBeVisible();
//     expect(getPlaceholderEl(el)).not.toBeVisible();
//   });

//   it('should show the avatar when the specified source is a Blob object', function () {
//       let fixture = TestBed.createComponent(AvatarTestComponent);

//       fixture.componentInstance.src = getImgBlob();

//       fixture.detectChanges();

//       let el = fixture.nativeElement;

//       validateImageUrl(el, 'blob:', true);
//   });

//   it(
//     `should clean up the current object URL created when the specified source is a Blbo object
//     and the scope is destroyed`,
//     () => {
//       let fixture = TestBed.createComponent(AvatarTestComponent);

//       fixture.componentInstance.src = getImgBlob();

//       fixture.detectChanges();

//       let objectUrl = getBackgroundImageUrl(fixture.nativeElement);

//       let revokeSpy = spyOn(URL, 'revokeObjectURL');

//       fixture.destroy();

//       expect(revokeSpy).toHaveBeenCalledWith(objectUrl);
//     }
//   );
// });
