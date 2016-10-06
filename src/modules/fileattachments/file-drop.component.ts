import {
  Component,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  SkyFileItem
} from './file-item.class';

@Component({
  selector: 'sky-file-drop',
  template: require('./file-drop.component.html'),
  styles: [require('./file-drop.component.scss')],
})
export class SkyFileDropComponent {

  @Output()
  public filesChanged = new EventEmitter<Array<SkyFileItem>>();

  @ViewChild('fileInput')
  private inputEl: ElementRef;


  private emitFileChangeEvent(
    this: SkyFileDropComponent,
    totalFiles: number,
    readFiles: number,
    filesToUpload: Array<SkyFileItem>) {

    if (totalFiles === readFiles) {
      this.filesChanged.emit(filesToUpload);
      console.log('input before: ', this.inputEl);

      this.inputEl.nativeElement.value = null;

      console.log('input: ', this.inputEl);
    }
  }

  private fileChangeEvent(fileInput: any) {
    let filesToUpload: FileList = fileInput.target.files;
    let readFileArray: Array<SkyFileItem> = [];
    let totalFiles = filesToUpload.length;

    let fileDrop = this;

    for (var index = 0; index < filesToUpload.length; index++) {
      var reader = new FileReader();
      let file = <SkyFileItem>filesToUpload.item(index);

      reader.onload = function (this: FileReader, event: any) {

        file.url = event.target.result;
        readFileArray.push(file);
        fileDrop.emitFileChangeEvent(totalFiles, readFileArray.length, readFileArray);
      }

      reader.onerror = function (this: FileReader, event: any) {
        readFileArray.push(file);
        fileDrop.emitFileChangeEvent(totalFiles, readFileArray.length, readFileArray);
      }

      reader.readAsDataURL(file);
    }
  }

}
