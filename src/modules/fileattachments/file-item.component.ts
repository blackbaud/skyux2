import {
  Component,
  Input,
  Output,
  DoCheck,
  KeyValueDiffers,
  KeyValueDiffer,
  EventEmitter
} from '@angular/core';

import {
  SkyFileItem
} from './file-item.class';

import {
  SkyFileLink
} from './file-link.class';

@Component({
  selector: 'sky-file-item',
  template: require('./file-item.component.html'),
  styles: [require('./file-item.component.scss')],

})
export class SkyFileItemComponent implements DoCheck {

  @Input()
  public fileItem: SkyFileItem | SkyFileLink;

  @Output()
  public deleteFile = new EventEmitter<SkyFileLink | SkyFileItem>();

  private otherCls: string;

  private differ: KeyValueDiffer;

	public constructor(private differs: KeyValueDiffers) {
		this.differ = differs.find({}).create(null);
	}

  private itemDelete() {
    this.deleteFile.emit(this.fileItem);
  }

  private isFile() {
    return this.fileItem && (<SkyFileItem>this.fileItem).size !== undefined && (<SkyFileItem>this.fileItem).size !== null;
  }

  public ngDoCheck() {
		let changes = this.differ.diff(this.fileItem);

		if(changes) {
			console.log('changes detected: ', changes);

      let cls: string,
          extensionUpper = this.getFileExtensionUpper(),
          fileTypeUpper: string;

      switch (extensionUpper) {
          case '.PDF':
              cls = 'pdf';
              break;
          case '.GZ':
          case '.RAR':
          case '.TGZ':
          case '.ZIP':
              cls = 'archive';
              break;
          case '.PPT':
          case '.PPTX':
              cls = 'powerpoint';
              break;
          case '.DOC':
          case '.DOCX':
              cls = 'word';
              break;
          case '.XLS':
          case '.XLSX':
              cls  = 'excel';
              break;
          case '.TXT':
              cls = 'text';
              break;
          case '.HTM':
          case '.HTML':
              cls = 'code';
              break;
      }

      if (!cls) {
          fileTypeUpper = this.getFileTypeUpper();

          switch (fileTypeUpper.substr(0, fileTypeUpper.indexOf('/'))) {
              case 'AUDIO':
                  cls = 'audio';
                  break;
              case 'IMAGE':
                  // Normally images are displayed as thumbnails, but if an image type is not recognized
                  // as being widely supported by modern browsers (e.g. TIFF files) then an icon should
                  // be displayed instead.
                  cls = 'image';
                  break;
              case 'TEXT':
                  cls = 'text';
                  break;
              case 'VIDEO':
                  cls = 'video';
                  break;
          }
      }

      this.otherCls = 'fa-file-' + (cls ? cls + '-' : '') + 'o';
		}
	}

  private getFileExtensionUpper() {
    var extension = '',
        name: string;

    if (this.fileItem) {
        name = (<SkyFileItem>this.fileItem).name || '';

        extension = name.substr(name.lastIndexOf('.')) || '';
    }

    return extension.toUpperCase();
  }

  private getFileTypeUpper() {
    var fileType = '';

    if (this.fileItem) {
        fileType = (<SkyFileItem>this.fileItem).type || '';
    }

    return fileType.toUpperCase();
  }

  private isImg() {
    let fileTypeUpper = this.getFileTypeUpper(),
                        slashIndex: number;

    slashIndex = fileTypeUpper.indexOf('/');

    if (slashIndex >= 0) {
        switch (fileTypeUpper.substr(fileTypeUpper.indexOf('/') + 1)) {
        case 'BMP':
        case 'GIF':
        case 'JPEG':
        case 'PNG':
            return true;
        }
    }

    return false;
  }

}
