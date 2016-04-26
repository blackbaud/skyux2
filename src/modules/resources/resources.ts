export class SkyResources {
  static resources = require('../../locales/resources_en_US.json');

  static getString(name: string): string {
    var stringObj: {_description: string, message: string} = this.resources[name];

    if (stringObj) {
      return stringObj.message;
    }

    return name;
  }

  /*istanbul ignore next */
  constructor() {

  }
}
