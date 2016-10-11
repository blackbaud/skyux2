export class SkyFormat {

  public static formatText(format: string, ...args: any[]): string {

    if (this.isEmpty(format)) {
        return '';
    }

    return String(format).replace(/\{(\d+)\}/g, function (match, capture) {
        return args[parseInt(capture, 10)];
    });
  }

  /*istanbul ignore next */
  constructor() {

  }

  private static isEmpty(str: string) {
    /* tslint:disable */
    return str === null || str === undefined;
    /* tslint:enable */
  }
}
