import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';

import { SkyAvatarImageService } from './avatar-image.service';

@Component({
  selector: 'sky-avatar',
  template: require('./avatar.component.html'),
  styles: [require('./avatar.component.scss')],
  providers: [SkyAvatarImageService]
})
export class SkyAvatarComponent implements AfterViewInit {
  @Input()
  public set src(value: string) {
    this._src = value;
    this.updateImage();
  }

  public get src(): string {
    return this._src;
  }

  public get name(): string {
    return this._name;
  }

  @Input()
  public set name(value: string) {
    this._name = value;
  }

  private viewInitialized: boolean;

  private _src: string;

  private _name: string;

  constructor(private elementRef: ElementRef, private imageService: SkyAvatarImageService) { }

  public get initials(): string {
    let initials: string;

    if (this.name) {
      let nameSplit = this.name.split(' ');
      initials = getInitial(nameSplit[0]);

      /* istanbul ignore else */
      /* this is tested through a visual regression test */
      if (nameSplit.length > 1) {
        initials += getInitial(nameSplit[nameSplit.length - 1]);
      }
    }

    return initials;
  }

  public get colorIndex(): number {
    let name = this.name;
    let colorIndex: number;

    if (name) {
        // Generate a unique-ish color based on the record name.  This is deterministic
        // so that a given name will always generate the same color.
        let seed = name.charCodeAt(0) + name.charCodeAt(name.length - 1) + name.length;
        colorIndex = Math.abs(seed % 6);
    } else {
        colorIndex = 0;
    }

    return colorIndex;
  }

  public ngAfterViewInit() {
    this.viewInitialized = true;
    this.updateImage();
  }

  private updateImage() {
    if (this.viewInitialized) {
      this.imageService.updateImage(this.elementRef, this.src);
    }
  }
}

function getInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}
