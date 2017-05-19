export class SkyResources {
  public static resources: any = require('json-loader!../../locales/resources_en_US.json');

  public static getString(name: string): string {
    let stringObj: {_description: string, message: string} = this.resources[name];

    if (stringObj) {
      return stringObj.message;
    }

    return name;
  }

  /*istanbul ignore next */
  constructor() {
  }
}
