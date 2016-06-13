import { Component, Input } from '@angular/core';

@Component({
  selector: 'sky-avatar',
  template: require('./avatar.component.html'),
  styles: [require('./avatar.component.scss')]
})
export class SkyAvatarComponent {
  @Input()
  public src: string;

  public get name(): string {
    return this._name;
  }

  @Input()
  public set name(value: string) {
    this._name = value;
  }

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

  private _name: string;
}

function getInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}
