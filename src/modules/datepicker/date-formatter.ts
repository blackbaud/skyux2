let moment = require('moment');

export class SkyDateFormatter {
  public format(date:Date, format:string):string {
    return moment(date.getTime()).format(format);
  }
}
