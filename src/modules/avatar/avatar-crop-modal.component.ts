import { Component } from '@angular/core';

import { SkyModalInstance } from '../modal';

import { SkyAvatarCropModalContext } from './avatar-crop-modal-context';
import { SkyFileDropChange, SkyFileItem } from '../fileattachments';

@Component({
  selector: 'sky-avatar-crop-modal',
  templateUrl: './avatar-crop-modal.component.html',
  styleUrls: ['./avatar-crop-modal.component.scss']
})
export class SkyAvatarCropModalComponent {
  public title = 'Hello world';
  public maxFileSize = 500000;
  public cropping: boolean = false;
  public file: SkyFileItem;
  public imageScale: number = 1;
  public previousImageScale: number = 1;
  public minRange: number = 0.2083;
  public totalYZoomOffset: number = 0;
  public totalXZoomOffset: number = 0;
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
      setTimeout(() => {
        // Compute scale range
        let image = document.getElementById('imgItem');
        let view = document.getElementById('circleDiv');
        this.imageScale = 1;
        this.previousImageScale = 1;
        if (image.offsetHeight < image.offsetWidth) {
          this.minRange = view.offsetHeight / image.offsetHeight;
        } else {
          this.minRange = view.offsetWidth / image.offsetWidth;
        }
        this.dragElement(image);
        // for (let i = 0; i < 51; i++) {
        // console.log('adding to queue');
        // let i = 0;
        //   // setTimeout(() => {
        // console.log(1 - (0.01 * i));
        // let f = function() {
        //   this.changeZoom(1 - (0.01 * i));
        //   i++;
        //   console.log(i);
        //   if ( i < 51 ) {
        //     setTimeout( f, 100 );
        //   }
        // }.bind(this);
        // f();
          // }, 1000);
        // }
        // this.changeZoom(0.5);
      }, 0);
    }
    // HANDLE ERR
  }

  public getCropResult() {
    let image = document.getElementById('imgItem') as HTMLImageElement;
    let viewport = document.getElementById('circleDiv');
    let canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    console.log(viewport.offsetHeight * (1 / this.imageScale) + 'px');
    console.log(viewport.offsetWidth * (1 / this.imageScale) + 'px');
    canvas.height = viewport.offsetHeight * (1 / this.imageScale);
    canvas.width = viewport.offsetWidth * (1 / this.imageScale);
    let context = canvas.getContext('2d');
    // let imageObj = new Image();

    // imageObj.onload = function() {
      // draw cropped image
      let sourceX = viewport.offsetLeft - this.totalXTranslate - this.totalXZoomOffset;
      let sourceY = viewport.offsetTop - this.totalYTranslate - this.totalYZoomOffset;
      let sourceWidth = viewport.offsetWidth * (1 / this.imageScale);
      let sourceHeight = viewport.offsetHeight * (1 / this.imageScale);
      let destWidth = sourceWidth;
      let destHeight = sourceHeight;
      console.log(sourceWidth === destWidth);
      console.log(sourceHeight === destHeight);
      let destX = 0; // canvas.width / 2 - destWidth / 2;
      let destY = 0; // canvas.height / 2 - destHeight / 2;
      // tslint:disable-next-line:max-line-length
      console.log(sourceWidth, sourceHeight, destWidth, destHeight);
      console.log(sourceX, sourceY, destX, destY);
      context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
      return canvas.toDataURL();
    // }.bind(this);
    // imageObj.src = this.file.url;
  }

  public removeImage() {
    this.cropping = false;
    this.file = undefined;
    this.totalXZoomOffset = 0;
    this.totalYZoomOffset = 0;
  }

  public dragElement(elmnt: HTMLElement) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e: MouseEvent) {
      e = e || window.event as MouseEvent;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    let elementDrag = function(e: MouseEvent) {
        e = e || window.event as MouseEvent;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        let viewport = document.getElementById('circleDiv');

        if ((elmnt.offsetTop - pos2) + this.totalYZoomOffset <= viewport.offsetTop) {
          if (elmnt.offsetTop - pos2 + (elmnt.offsetHeight * this.imageScale) + this.totalYZoomOffset >=
            viewport.offsetTop + viewport.offsetHeight) {
              elmnt.style.top = (elmnt.offsetTop - pos2) + 'px';
              this.totalYTranslate -= pos2;
            }
        }
        if ((elmnt.offsetLeft - pos1) + this.totalXZoomOffset <= viewport.offsetLeft) {
          if (elmnt.offsetLeft - pos1 + (elmnt.offsetWidth * this.imageScale) + this.totalXZoomOffset >=
            viewport.offsetLeft + viewport.offsetWidth) {
              elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px';
              this.totalXTranslate -= pos1;
            }
        }
        document.getElementById('markerDivLeft').style.left = viewport.offsetLeft - this.totalXTranslate - this.totalXZoomOffset + 'px';
        document.getElementById('markerDivTop').style.top = viewport.offsetTop - this.totalYTranslate - this.totalYZoomOffset + 'px';
        console.log('totalYTranslate - ', this.totalYTranslate);
        console.log('totalXTranslate - ', this.totalXTranslate);
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
    let centerX = viewport.offsetLeft + (viewport.offsetWidth / 2);
    let centerY = viewport.offsetTop + (viewport.offsetHeight / 2);
    let cent = document.getElementById('centerDiv');
    cent.style.top = centerY + 'px';
    cent.style.left = centerX + 'px';
    image.style.transformOrigin = centerX + 'px ' + centerY + 'px';
    image.style.transformStyle = 'preserve-3D';

    if (!image.style.top) {
      image.style.top = '0';
    }
    if (!image.style.left) {
      image.style.left = '0';
    }
    let offsetYChange = (-(centerY * (value - this.previousImageScale)));
    let offsetXChange = (-(centerX * (value - this.previousImageScale)));

    let currentHeight = image.offsetHeight * value;
    let currentWidth = image.offsetWidth * value;

    let topTouching = this.totalYZoomOffset + offsetYChange + this.totalYTranslate > viewport.offsetTop;
    let bottomTouching = this.totalYZoomOffset + offsetYChange + currentHeight + this.totalYTranslate <
     viewport.offsetTop + viewport.offsetHeight;
    let leftTouching = this.totalXZoomOffset + offsetXChange + this.totalXTranslate > viewport.offsetLeft;
    let rightTouching = this.totalXZoomOffset + offsetXChange + currentWidth + this.totalXTranslate <
     viewport.offsetLeft + viewport.offsetWidth;

    console.log('topTouching - ', topTouching);
    console.log('bottomTouching - ', bottomTouching);
    console.log('leftTouching - ', leftTouching);
    console.log('rightTouching - ', rightTouching);

    if ((topTouching && bottomTouching) || (leftTouching && rightTouching)) {
      // not scale
    } else {
      this.imageScale = value;
      image.style.transform = 'scale(' + value + ')';
      image.style.webkitTransform = 'scale(' + value + ')';

      this.totalYZoomOffset += offsetYChange;
      console.log('VOT - ', viewport.offsetTop);
      console.log('height diff - ', image.offsetHeight - viewport.offsetHeight);
      if (topTouching) {
        image.style.top = viewport.offsetTop - this.totalYZoomOffset + 'px';
      } else if (bottomTouching) {
        image.style.top = viewport.offsetTop - this.totalYZoomOffset - (currentHeight - viewport.offsetHeight) + 'px';
        // image.style.top = viewport.offsetTop - this.totalYZoomOffset - (image.offsetHeight - viewport.offsetHeight) +
        //   this.totalYTranslate + 'px';
      }

      this.totalXZoomOffset += offsetXChange;
      if (leftTouching) {
        image.style.left = viewport.offsetLeft - this.totalXZoomOffset + 'px';
      } else if (rightTouching) {
        image.style.left = viewport.offsetLeft - this.totalXZoomOffset - (currentWidth - viewport.offsetWidth) + 'px';
      }
      this.previousImageScale = value;
    }
    console.log('totalYZoomOffset - ', this.totalYZoomOffset);
    console.log('totalXZoomOffset - ', this.totalXZoomOffset);

    document.getElementById('markerDivLeft').style.left = viewport.offsetLeft - this.totalXTranslate - this.totalXZoomOffset + 'px';
    document.getElementById('markerDivTop').style.top = viewport.offsetTop - this.totalYTranslate - this.totalYZoomOffset + 'px';
  }
}
