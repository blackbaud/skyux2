import { Component } from '@angular/core';

import { SkyModalInstance } from '../modal';

import { SkyAvatarCropModalContext } from './avatar-crop-modal-context';
import { SkyFileDropChange, SkyFileItem } from '../fileattachments';

/**
 * Avatar Crop TODO:
 *  - IMPORTANT: Remove tests no longer necessary in avatar.component.spec.ts --> this is currently failing
 *  - Handle error with large images
 *  - Add cancel button
 *  - Add drag to reposition indicator
 *  - Finish unit tests
 */

@Component({
  selector: 'sky-avatar-crop-modal',
  templateUrl: './avatar-crop-modal.component.html',
  styleUrls: ['./avatar-crop-modal.component.scss']
})
export class SkyAvatarCropModalComponent {
  public title = 'Edit picture';
  public maxFileSize = 500000;
  public cropping: boolean = false;
  public file: SkyFileItem;
  public imageScale: number = 1;

  // Ranges for the zoom slider input
  public minRange: number = 0.2083;
  public maxRange: number = 1.5;

  // Represents the amound that the image has moved as a result of scaling
  public totalYZoomOffset: number = 0;
  public totalXZoomOffset: number = 0;

  // Represents the amount that image has been dragged
  public totalYTranslate: number = 0;
  public totalXTranslate: number = 0;

  constructor(
    public context: SkyAvatarCropModalContext,
    public instance: SkyModalInstance
  ) {
    console.log(context);
  }

  public photoDrop(result: SkyFileDropChange) {
    /* sanity check */
    /* istanbul ignore else */
    if (result.files && result.files.length > 0) {
      this.cropping = true;
      this.file = result.files[0];

      // Wait until the image has been rendered on the page
      setTimeout(() => {
        let image = document.getElementById('imgItem');
        let view = document.getElementById('circleDiv');
        this.imageScale = 1;

        // Calculate the minimum range for the slider so that zooming is only allowed until parallel sides are touching
        if (image.offsetHeight < image.offsetWidth) {
          this.minRange = view.offsetHeight / image.offsetHeight;
        } else {
          this.minRange = view.offsetWidth / image.offsetWidth;
        }

        // Move the image if the initial position does not fully cover the circle
        if (image.offsetWidth < view.offsetLeft + view.offsetWidth) {
          image.style.left = (view.offsetLeft + view.offsetWidth) - image.offsetWidth + 'px';
        }
        if (image.offsetHeight < view.offsetTop + view.offsetHeight) {
          image.style.top = (view.offsetTop + view.offsetHeight) - image.offsetHeight + 'px';
        }

        // If the image is too small the fill the circle, scale the image to fit
        // Possible alternative -- scale down the circle size to fit
        if (image.offsetHeight < view.offsetHeight) {
          this.changeZoom(view.offsetHeight / image.offsetHeight);
        }
        if (image.offsetWidth < view.offsetWidth) {
          this.changeZoom(view.offsetWidth / image.offsetWidth);
        }

        // Initialize dragging of the image
        this.dragElement(image, view);
      }, 0);
    }
    // HANDLE ERROR for large images
  }

  public dragElement(img: HTMLElement, view: HTMLElement) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    img.onmousedown = dragMouseDown;
    view.onmousedown = dragMouseDown;

    function dragMouseDown(e: MouseEvent) {
      e = e || window.event as MouseEvent;
      e.preventDefault();
      // Get the initial cursor position
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // Call elementDrag whenever the cursor moves
      document.onmousemove = elementDrag;
    }

    let elementDrag = function(e: MouseEvent) {
        e = e || window.event as MouseEvent;
        e.preventDefault();
        // Calculate new position
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        // Calculate how to move to the new position
        let image = document.getElementById('imgItem');
        let viewport = document.getElementById('circleDiv');

        if ((image.offsetTop - pos2) + this.totalYZoomOffset <= viewport.offsetTop) {
          /* tslint:disable-next-line max-line-length */
          if (image.offsetTop - pos2 + (image.offsetHeight * this.imageScale) + this.totalYZoomOffset >= viewport.offsetTop + viewport.offsetHeight) {
              // Not touching top or bottom, free to move normally
              image.style.top = (image.offsetTop - pos2) + 'px';
              this.totalYTranslate -= pos2;
            } else {
              /* tslint:disable-next-line max-line-length */
              this.totalYTranslate -= parseInt((image.offsetTop + (image.offsetHeight * this.imageScale)) - (viewport.offsetTop + viewport.offsetHeight) + this.totalYZoomOffset, 10);
              /* tslint:disable-next-line max-line-length */
              image.style.top = viewport.offsetTop - this.totalYZoomOffset - ((image.offsetHeight * this.imageScale) - viewport.offsetHeight) + 'px';
            }
        } else {
          this.totalYTranslate -= parseInt(image.offsetTop - viewport.offsetTop + this.totalYZoomOffset, 10);
          image.style.top = viewport.offsetTop - this.totalYZoomOffset + 'px';
        }
        if ((image.offsetLeft - pos1) + this.totalXZoomOffset <= viewport.offsetLeft) {
          /* tslint:disable-next-line max-line-length */
          if (image.offsetLeft - pos1 + (image.offsetWidth * this.imageScale) + this.totalXZoomOffset >= viewport.offsetLeft + viewport.offsetWidth) {
              // Not touching left or right, free to move normally
              image.style.left = (image.offsetLeft - pos1) + 'px';
              this.totalXTranslate -= pos1;
            } else {
              /* tslint:disable-next-line max-line-length */
              this.totalXTranslate -= parseInt((image.offsetLeft + (image.offsetWidth * this.imageScale)) - (viewport.offsetLeft + viewport.offsetWidth) + this.totalXZoomOffset, 10);
              /* tslint:disable-next-line max-line-length */
              image.style.left = viewport.offsetLeft - this.totalXZoomOffset - ((image.offsetWidth * this.imageScale) - viewport.offsetWidth) + 'px';
            }
        } else {
          this.totalXTranslate -= parseInt(image.offsetLeft - viewport.offsetLeft + this.totalXZoomOffset , 10);
          image.style.left = viewport.offsetLeft - this.totalXZoomOffset + 'px';
        }
      }.bind(this);

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = undefined;
      document.onmousemove = undefined;
    }
  }

  public changeZoom(value: number) {
    let image = document.getElementById('imgItem');
    let viewport = document.getElementById('circleDiv');

    // Get the center of the circle to transform around
    let centerX = viewport.offsetLeft + (viewport.offsetWidth / 2);
    let centerY = viewport.offsetTop + (viewport.offsetHeight / 2);
    image.style.transformOrigin = centerX + 'px ' + centerY + 'px';
    image.style.transformStyle = 'preserve-3D';

    if (!image.style.top) {
      image.style.top = '0';
    }
    if (!image.style.left) {
      image.style.left = '0';
    }

    // Calculate the amount to add to zoom offsets
    let offsetYChange = ((-(centerY * (value - this.imageScale))));
    let offsetXChange = ((-(centerX * (value - this.imageScale))));

    let currentHeight = image.offsetHeight * value;
    let currentWidth = image.offsetWidth * value;

    // Figure out if any sides are touching
    let topTouching = this.totalYZoomOffset + offsetYChange + this.totalYTranslate > viewport.offsetTop;
    let bottomTouching = this.totalYZoomOffset + offsetYChange + currentHeight + this.totalYTranslate <
     viewport.offsetTop + viewport.offsetHeight;
    let leftTouching = this.totalXZoomOffset + offsetXChange + this.totalXTranslate > viewport.offsetLeft;
    let rightTouching = this.totalXZoomOffset + offsetXChange + currentWidth + this.totalXTranslate <
     viewport.offsetLeft + viewport.offsetWidth;

    if ((topTouching && bottomTouching) || (leftTouching && rightTouching)) {
      // Either top and bottom or left and right are touching, and no more scaling is allowed.
    } else {
      this.imageScale = value;
      image.style.transform = 'scale(' + value + ')';
      image.style.webkitTransform = 'scale(' + value + ')';

      this.totalYZoomOffset += offsetYChange;
      if (topTouching) {
        image.style.top = viewport.offsetTop - this.totalYZoomOffset + 'px';
      } else if (bottomTouching) {
        image.style.top = viewport.offsetTop - this.totalYZoomOffset - (currentHeight - viewport.offsetHeight) + 'px';
      }

      this.totalXZoomOffset += offsetXChange;
      if (leftTouching) {
        image.style.left = viewport.offsetLeft - this.totalXZoomOffset + 'px';
      } else if (rightTouching) {
        image.style.left = viewport.offsetLeft - this.totalXZoomOffset - (currentWidth - viewport.offsetWidth) + 'px';
      }
    }
  }

  public getCropResult() {
    let image = document.getElementById('imgItem') as HTMLImageElement;
    let viewport = document.getElementById('circleDiv');
    let canvas = document.getElementById('myCanvas') as HTMLCanvasElement;

    // Set the dimensions to the number of pixels comprising the selector circle
    const finalWidth = viewport.offsetWidth * (1 / this.imageScale);
    const finalHeight = viewport.offsetHeight * (1 / this.imageScale);

    canvas.width = finalWidth;
    canvas.height = finalHeight;

    let context = canvas.getContext('2d');

    // Source coordinates are equal to the position relative to the image that the viewport begins
    let sourceX = ((viewport.offsetLeft - (image.offsetLeft + this.totalXZoomOffset)) * (1 / this.imageScale)) ;
    let sourceY = ((viewport.offsetTop - (image.offsetTop + this.totalYZoomOffset)) * (1 / this.imageScale));
    let sourceWidth = finalWidth;
    let sourceHeight = finalHeight;

    let destWidth = sourceWidth;
    let destHeight = sourceHeight;
    let destX = 0;
    let destY = 0;

    // Draw the final image on the canvas
    context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);

    // Get blob from the canvas, create file, and save
    fetch(canvas.toDataURL()).then(res => res.blob()).then(blob => {
      const resultFile: SkyFileItem = {
        file: new File([blob], 'newAvatar'),
        url: URL.createObjectURL(blob),
        errorParam: '',
        errorType: ''
      };
      this.instance.save(resultFile);
    });
  }

  public removeImage() {
    this.cropping = false;
    this.file = undefined;
    this.totalXZoomOffset = 0;
    this.totalYZoomOffset = 0;
    this.totalXTranslate = 0;
    this.totalYTranslate = 0;
  }
}
