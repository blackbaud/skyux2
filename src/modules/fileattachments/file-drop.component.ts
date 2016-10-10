import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  SkyFileItem
} from './file-item.class';

import {
  SkyFileLink
} from './file-link.class';

import {
  SkyFileDropChange
} from './file-drop-change.class';

@Component({
  selector: 'sky-file-drop',
  template: require('./file-drop.component.html'),
  styles: [require('./file-drop.component.scss')],
})
export class SkyFileDropComponent {

  @Output()
  public filesChanged = new EventEmitter<SkyFileDropChange>();

  @Output()
  public linkChanged = new EventEmitter<SkyFileLink>();

  @Input()
  public minFileSize: number = 0;

  @Input()
  public maxFileSize: number = 500000;

  @Input()
  public multiple: boolean = true;

  @Input()
  public validateFn: Function;

  @Input()
  public acceptedTypes: string;

  @Input()
  public noClick: boolean = false;

  @Input()
  public allowLinks: boolean = false;

  @ViewChild('fileInput')
  private inputEl: ElementRef;

  private rejectedOver: boolean = false;
  private acceptedOver: boolean = false;
  private linkUrl: string;

  private enterEventTarget: any;

  private dropClicked() {
    if (!this.noClick) {
      this.inputEl.nativeElement.click();
    }
  }

  private emitFileChangeEvent(
    this: SkyFileDropComponent,
    totalFiles: number,
    rejectedFileArray: Array<SkyFileItem>,
    validFileArray: Array<SkyFileItem>) {

    if (totalFiles === rejectedFileArray.length + validFileArray.length) {
      this.filesChanged.emit(new SkyFileDropChange(validFileArray, rejectedFileArray));
      this.inputEl.nativeElement.value = null;
    }
  }

  private filesRejected(
    this: SkyFileDropComponent,
    file: SkyFileItem,
    validFileArray: Array<SkyFileItem>,
    rejectedFileArray: Array<SkyFileItem>,
    totalFiles: number
  ) {
    rejectedFileArray.push(file);
    this.emitFileChangeEvent(totalFiles, rejectedFileArray, validFileArray);
  }

  private loadFile(
    fileDrop: SkyFileDropComponent,
    file: SkyFileItem,
    validFileArray: Array<SkyFileItem>,
    rejectedFileArray: Array<SkyFileItem>,
    totalFiles: number) {

    let reader = new FileReader();

    reader.onload = function (this: FileReader, event: any) {
      file.url = event.target.result;
      validFileArray.push(file);
      fileDrop.emitFileChangeEvent(totalFiles, rejectedFileArray, validFileArray);
    }

    reader.onerror = function (this: FileReader, event: any) {
      fileDrop.filesRejected(file, validFileArray, rejectedFileArray, totalFiles);
    }

    reader.onabort = function (this: FileReader, event: any) {
      fileDrop.filesRejected(file, validFileArray, rejectedFileArray, totalFiles);
    }

    reader.readAsDataURL(file);
  }

  private fileRejected(fileType: string) {
    if (!this.acceptedTypes) {
      return false;
    }
    let typeArray = this.acceptedTypes.split(',');
    return typeArray.indexOf(fileType) === -1;
  }

  private handleFiles(files: FileList) {
    let validFileArray: Array<SkyFileItem> = [];
    let rejectedFileArray: Array<SkyFileItem> = [];
    let totalFiles = files.length;

    let fileDrop = this;

    for (var index = 0; index < files.length; index++) {
      let file = <SkyFileItem>files.item(index);

      if (file.size < this.minFileSize) {
        file.errorType = 'minFileSize';
        file.errorParam = this.minFileSize.toString();
        this.filesRejected(file, validFileArray, rejectedFileArray, totalFiles);
      } else if (file.size > this.maxFileSize) {
        file.errorType = 'maxFileSize';
        file.errorParam = this.maxFileSize.toString();
        this.filesRejected(file, validFileArray, rejectedFileArray, totalFiles);
      } else if (file.type && this.fileRejected(file.type)) {
        file.errorType = 'fileType';
        file.errorParam = this.acceptedTypes;
        this.filesRejected(file, validFileArray, rejectedFileArray, totalFiles);
      } else if (this.validateFn) {
        let errorParam = this.validateFn(file);
        if (!!errorParam) {
          file.errorType = 'validate';
          file.errorParam = errorParam;
          this.filesRejected(file, validFileArray, rejectedFileArray, totalFiles);
        } else {
          this.loadFile(fileDrop, file, validFileArray, rejectedFileArray, totalFiles);
        }

      } else {
        this.loadFile(fileDrop, file, validFileArray, rejectedFileArray, totalFiles);
      }
    }
  }

  private fileChangeEvent(fileChangeEvent: any) {
    this.handleFiles(fileChangeEvent.target.files);
  }

  private fileDragEnter(this: SkyFileDropComponent, dragEnterEvent: any) {
    // Save this target to know when the drag event leaves
    this.enterEventTarget = dragEnterEvent.target;
    dragEnterEvent.stopPropagation();
    dragEnterEvent.preventDefault();

  }

  private fileDragOver(this: SkyFileDropComponent, dragOverEvent: any) {
    dragOverEvent.stopPropagation();
    dragOverEvent.preventDefault();

     if (dragOverEvent.dataTransfer && dragOverEvent.dataTransfer.items) {

      let files = dragOverEvent.dataTransfer.items;

      for (var index = 0; index < files.length; index++) {
        let file: any = files[index];
        if (file.type && this.fileRejected(file.type) && !this.rejectedOver) {
          this.rejectedOver = true;
          this.acceptedOver = false;
          return;
        }
      }
      if (files.length > 0 && !this.acceptedOver) {
        this.rejectedOver = false;
        this.acceptedOver = true;
      }
    }

  }

  private verifyDropFiles(this: SkyFileDropComponent, items: any) {
    if (!this.multiple && items.length > 1) {
      return false;
    }

    for (var index = 0; index < items.length; index++) {
      let file = items[index];
      if (file.webkitGetAsEntry && file.webkitGetAsEntry() && file.webkitGetAsEntry().isDirectory) {
        return false;
      }
    }

    return true;
  }

  private fileDrop(this: SkyFileDropComponent, dropEvent: any) {
    this.enterEventTarget = null;
    dropEvent.stopPropagation();
    dropEvent.preventDefault();
    this.rejectedOver = false;
    this.acceptedOver = false;
    if (dropEvent.dataTransfer && dropEvent.dataTransfer.files) {
      if(this.verifyDropFiles(dropEvent.dataTransfer.items)) {
        this.handleFiles(dropEvent.dataTransfer.files);
      }
    }
  }

  private fileDragLeave(this: SkyFileDropComponent, dragLeaveEvent: any) {
    if(this.enterEventTarget === dragLeaveEvent.target) {
      this.rejectedOver = false;
      this.acceptedOver = false;
    }
  }

  private addLink(event: Event) {
    event.preventDefault();
    this.linkChanged.emit(new SkyFileLink(this.linkUrl));

    this.linkUrl = null;
  }

}
