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
} from './file-item';

import {
  SkyFileLink
} from './file-link';

import {
  SkyFileDropChange
} from './file-drop-change';

@Component({
  selector: 'sky-file-drop',
  template: require('./file-drop.component.html'),
  styles: [require('./file-drop.component.scss')]
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

  public dropClicked() {
    if (!this.noClick) {
      this.inputEl.nativeElement.click();
    }
  }

  public fileChangeEvent(fileChangeEvent: any) {
    this.handleFiles(fileChangeEvent.target.files);
  }

  public fileDragEnter(this: SkyFileDropComponent, dragEnterEvent: any) {
    // Save this target to know when the drag event leaves
    this.enterEventTarget = dragEnterEvent.target;
    dragEnterEvent.stopPropagation();
    dragEnterEvent.preventDefault();

  }

  public fileDragOver(this: SkyFileDropComponent, dragOverEvent: any) {
    dragOverEvent.stopPropagation();
    dragOverEvent.preventDefault();

     if (dragOverEvent.dataTransfer && dragOverEvent.dataTransfer.items) {

      let files = dragOverEvent.dataTransfer.items;

      for (let index = 0; index < files.length; index++) {
        let file: any = files[index];
        if (file.type && this.fileTypeRejected(file.type) && !this.rejectedOver) {
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

  public fileDrop(this: SkyFileDropComponent, dropEvent: any) {
    this.enterEventTarget = undefined;
    dropEvent.stopPropagation();
    dropEvent.preventDefault();
    this.rejectedOver = false;
    this.acceptedOver = false;
    if (dropEvent.dataTransfer && dropEvent.dataTransfer.files) {
      if (this.verifyDropFiles(dropEvent.dataTransfer.items)) {
        this.handleFiles(dropEvent.dataTransfer.files);
      }
    }
  }

  public fileDragLeave(this: SkyFileDropComponent, dragLeaveEvent: any) {
    if (this.enterEventTarget === dragLeaveEvent.target) {
      this.rejectedOver = false;
      this.acceptedOver = false;
    }
  }

  public addLinkEnter(event: KeyboardEvent) {
    if (event.which === 13) {
      this.addLink(event);
    }
  }

  public addLink(event: Event) {
    event.preventDefault();
    this.linkChanged.emit({ url: this.linkUrl });
    this.linkUrl = undefined;
  }

  private emitFileChangeEvent(
    this: SkyFileDropComponent,
    totalFiles: number,
    rejectedFileArray: Array<SkyFileItem>,
    validFileArray: Array<SkyFileItem>) {

    if (totalFiles === rejectedFileArray.length + validFileArray.length) {
      this.filesChanged.emit({ files: validFileArray, rejectedFiles: rejectedFileArray });
      this.inputEl.nativeElement.value = '';
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

    reader.addEventListener('load',
      function (this: FileReader, event: any) {
        file.url = event.target.result;
        validFileArray.push(file);
        fileDrop.emitFileChangeEvent(totalFiles, rejectedFileArray, validFileArray);
      }
    );

    reader.addEventListener('error',
      function (this: FileReader, event: any) {
        fileDrop.filesRejected(file, validFileArray, rejectedFileArray, totalFiles);
      }
    );

    reader.addEventListener('abort',
      function (this: FileReader, event: any) {
        fileDrop.filesRejected(file, validFileArray, rejectedFileArray, totalFiles);
      }
    );

    reader.readAsDataURL(file.file);
  }

  private fileTypeRejected(fileType: string) {
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

    for (let index = 0; index < files.length; index++) {
      let fileItem =  <SkyFileItem> { file: files.item(index) };

      if (fileItem.file.size < this.minFileSize) {
        fileItem.errorType = 'minFileSize';
        fileItem.errorParam = this.minFileSize.toString();
        this.filesRejected(fileItem, validFileArray, rejectedFileArray, totalFiles);
      } else if (fileItem.file.size > this.maxFileSize) {
        fileItem.errorType = 'maxFileSize';
        fileItem.errorParam = this.maxFileSize.toString();
        this.filesRejected(fileItem, validFileArray, rejectedFileArray, totalFiles);
      } else if (fileItem.file.type && this.fileTypeRejected(fileItem.file.type)) {
        fileItem.errorType = 'fileType';
        fileItem.errorParam = this.acceptedTypes;
        this.filesRejected(fileItem, validFileArray, rejectedFileArray, totalFiles);
      } else if (this.validateFn) {
        let errorParam = this.validateFn(fileItem);
        if (!!errorParam) {
          fileItem.errorType = 'validate';
          fileItem.errorParam = errorParam;
          this.filesRejected(fileItem, validFileArray, rejectedFileArray, totalFiles);
        } else {
          this.loadFile(fileDrop, fileItem, validFileArray, rejectedFileArray, totalFiles);
        }

      } else {
        this.loadFile(fileDrop, fileItem, validFileArray, rejectedFileArray, totalFiles);
      }
    }
  }

  private verifyDropFiles(this: SkyFileDropComponent, items: any) {
    if (!this.multiple && items.length > 1) {
      return false;
    }

    for (let index = 0; index < items.length; index++) {
      let file = items[index];
      if (file.webkitGetAsEntry && file.webkitGetAsEntry() && file.webkitGetAsEntry().isDirectory) {
        return false;
      }
    }

    return true;
  }

}
