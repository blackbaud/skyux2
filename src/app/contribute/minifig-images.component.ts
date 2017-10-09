import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

import {
  SkyAppAssetsService
} from '@blackbaud/skyux-builder/runtime/assets.service';

import {
  MinifigImage
} from './minifig-image';

@Component({
  selector: 'sky-minifig-images',
  templateUrl: './minifig-images.component.html',
  styleUrls: ['./minifig-images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinifigImagesComponent {

  @Input()
  public set images(value: MinifigImage[]) {
    this._images = value;

    if (value) {
      for (const image of value) {
        const name = image.fileName || image.name
          .toLowerCase()
          .replace(/ /g, '-')
          .replace(/\./g, '');

        image.url = this.assets.getUrl('minifigs/' + name + '.jpg');
        image.urlFull = this.assets.getUrl('minifigs/' + name + '-full.jpg');
      }
    }
  }

  public get images(): MinifigImage[] {
    return this._images;
  }

  @Input()
  public small: boolean;

  private _images: MinifigImage[];

  constructor(private assets: SkyAppAssetsService) { }
}
