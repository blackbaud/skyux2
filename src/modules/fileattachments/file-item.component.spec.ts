import {
  TestBed
} from '@angular/core/testing';

import {
  SkyFileAttachmentsModule
} from './fileattachments.module';

describe('File item component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyFileAttachmentsModule
      ]
    });
  });

  it('shows the name and size if the item is a file', () => {

  });

  it('shows the url if the item is a link', () => {

  });

  it('emits the delete event when the delete button is clicked', () => {

  });

  it('shows an image if the item is an image', () => {

  });

  it('shows a file icon with the proper extension if it is not an image', () => {

  });

  it('allows custom content', () => {

  });
});
