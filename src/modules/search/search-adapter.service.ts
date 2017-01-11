import {
  ElementRef,
  EventEmitter,
  Injectable,
  Renderer
} from '@angular/core';

@Injectable()
export class SkySearchAdapterService {

  constructor(private renderer: Renderer) { }

  public startInputAnimation(searchEl: ElementRef) {
    let buttonWidth = this.getSearchOpenButtonEl(searchEl).clientWidth;
    let offsetWidth = this.getSearchContainerEl(searchEl).offsetLeft;
    let minWidth = buttonWidth + offsetWidth;

    this.getInputEl(searchEl).style.minWidth = minWidth.toString() + 'px';

    this.renderer.setElementStyle(this.getInputEl(searchEl),
      'min-width', minWidth.toString() + 'px');
  }

  public endInputAnimation(searchEl: ElementRef) {
    this.renderer.setElementStyle(this.getInputEl(searchEl),
      'min-width', undefined);
  }

  private getInputEl(searchEl: ElementRef) {
    return searchEl.nativeElement.querySelector('.sky-search-input-container')
  }

  private getSearchOpenButtonEl(searchEl: ElementRef) {
    return searchEl.nativeElement.querySelector('.sky-search-btn-open');
  }

  private getSearchContainerEl(searchEl: ElementRef) {
    return searchEl.nativeElement.querySelector('.sky-search-container');
  }
}
