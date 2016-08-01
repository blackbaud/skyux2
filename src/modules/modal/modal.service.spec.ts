// import {
//   ApplicationRef,
//   provide
// } from '@angular/core';

// import {
//   addProviders,
//   fakeAsync,
//   inject,
//   tick
// } from '@angular/core/testing';

// import {
//   expect,
//   MockApplicationRef
// } from '../testing';

// import { SkyModalService } from './modal.service';

// import { ModalTestComponent } from './fixtures/modal.component.fixture';

// describe('Modal service', () => {
//   let modalService: SkyModalService;

//   beforeEach(() => {
//     addProviders([
//       SkyModalService,
//       provide(ApplicationRef, {useClass: MockApplicationRef})
//     ]);
//   });

//   beforeEach(inject([SkyModalService], (_modalService: SkyModalService) => {
//     modalService = _modalService;
//   }));

//   it('should show a modal', fakeAsync(() => {
//     modalService.open(ModalTestComponent);

//     tick();

//     expect(document.body.querySelector('.sky-modal')).not.toBe(null);
//   }));
// });
