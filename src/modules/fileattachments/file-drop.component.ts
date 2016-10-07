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

  @Input()
  public minFileSize: number = 0;

  @Input()
  public maxFileSize: number = 500000;

  @Input()
  public multiple: boolean = true;

  @Input()
  public validateFn: Function;


  @ViewChild('fileInput')
  private inputEl: ElementRef;


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

  private fileChangeEvent(fileInput: any) {
    let filesToUpload: FileList = fileInput.target.files;
    let validFileArray: Array<SkyFileItem> = [];
    let rejectedFileArray: Array<SkyFileItem> = [];
    let totalFiles = filesToUpload.length;

    let fileDrop = this;

    for (var index = 0; index < filesToUpload.length; index++) {
      let file = <SkyFileItem>filesToUpload.item(index);

      if (file.size < this.minFileSize) {
        file.errorType = 'minFileSize';
        file.errorParam = this.minFileSize.toString();
        this.filesRejected(file, validFileArray, rejectedFileArray, totalFiles);
      } else if (file.size > this.maxFileSize) {
        file.errorType = 'maxFileSize';
        file.errorParam = this.maxFileSize.toString();
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

}
