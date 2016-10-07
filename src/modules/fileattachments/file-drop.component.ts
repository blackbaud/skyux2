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

  private fileChangeEvent(fileInput: any) {
    let filesToUpload: FileList = fileInput.target.files;
    let validFileArray: Array<SkyFileItem> = [];
    let rejectedFileArray: Array<SkyFileItem> = [];
    let totalFiles = filesToUpload.length;

    let fileDrop = this;

    for (var index = 0; index < filesToUpload.length; index++) {
      let file = <SkyFileItem>filesToUpload.item(index);

      console.log('actual file size: ', file.size);
      console.log('min file size: ', this.minFileSize);
      console.log('max file size: ', this.maxFileSize);

      if (file.size < this.minFileSize) {
        file.errorType = 'minFileSize';
        file.errorParam = this.minFileSize.toString();
        rejectedFileArray.push(file);
        fileDrop.emitFileChangeEvent(totalFiles, rejectedFileArray, validFileArray)
      } else if (file.size > this.maxFileSize) {
        file.errorType = 'maxFileSize';
        file.errorParam = this.maxFileSize.toString();
        rejectedFileArray.push(file);
        fileDrop.emitFileChangeEvent(totalFiles, rejectedFileArray, validFileArray)
      } else {
        let reader = new FileReader();

        reader.onload = function (this: FileReader, event: any) {

          file.url = event.target.result;
          validFileArray.push(file);
          fileDrop.emitFileChangeEvent(totalFiles, rejectedFileArray, validFileArray);
        }

        reader.onerror = function (this: FileReader, event: any) {
          rejectedFileArray.push(file);
          fileDrop.emitFileChangeEvent(totalFiles, rejectedFileArray, validFileArray);
        }

        reader.readAsDataURL(file);
      }
    }
  }

}
