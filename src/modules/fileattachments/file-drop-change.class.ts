import {
  SkyFileItem
} from './file-item.class';

export class SkyFileDropChange {
  public files: Array<SkyFileItem>;
  public rejectedFiles: Array<SkyFileItem>;

  public constructor(files: Array<SkyFileItem>, rejectedFiles: Array<SkyFileItem>) {
    this.files = files;
    this.rejectedFiles = rejectedFiles;
  }

}
