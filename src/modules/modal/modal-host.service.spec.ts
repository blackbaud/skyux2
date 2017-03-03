import { expect } from '../testing';

import { SkyModalComponent } from './modal.component';
import { SkyModalHostService } from './modal-host.service';
import { SkyModalComponentAdapterService } from './modal-component-adapter.service';

describe('Modal host service', () => {
  it('should return a modal z-index that is 1 greater than the backdrop z-index', () => {
    let service = new SkyModalHostService();

    expect(service.getModalZIndex()).toBe(SkyModalHostService.backdropZIndex + 1);
    service.destroy();
  });

  it('should increment the modal z-index values when a new instance is created', () => {
    let service1 = new SkyModalHostService();
    let service2 = new SkyModalHostService();

    expect(service2.getModalZIndex()).toBe(service1.getModalZIndex() + 10);

    service1.destroy();
    service2.destroy();
  });

  it('should decrement the backdrop z-index when an instance is destroyed', () => {
    let service1 = new SkyModalHostService();
    let service2 = new SkyModalHostService();

    let twoModalBackdropZIndex = SkyModalHostService.backdropZIndex;

    service2.destroy();

    expect(SkyModalHostService.backdropZIndex).toBe(twoModalBackdropZIndex - 10);

    service1.destroy();
  });

  it('should provide a count of open modals', () => {
    expect(SkyModalHostService.openModalCount).toBe(0);

    let service1 = new SkyModalHostService();
    let service2 = new SkyModalHostService();

    expect(SkyModalHostService.openModalCount).toBe(2);

    service2.destroy();

    expect(SkyModalHostService.openModalCount).toBe(1);

    service1.destroy();
  });

  it('should notify subscribers when a modal is closed', () => {
    let service = new SkyModalHostService();
    let componentService = new SkyModalComponentAdapterService();
    let component = new SkyModalComponent(service, { nativeElement: {} }, componentService);
    let closeEmitted = false;

    service.close.subscribe((closedComponent: SkyModalComponent) => {
      expect(closedComponent).toBe(component);
      closeEmitted = true;
    });

    service.onClose(component);

    expect(closeEmitted).toBe(true);
    service.destroy();
  });
});
