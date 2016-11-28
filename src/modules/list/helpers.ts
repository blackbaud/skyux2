export function getData(item: any, selector: string): any {
  let resultFieldParts = selector.split('.');
  if (resultFieldParts.length > 0 && resultFieldParts[0] === '') {
    resultFieldParts.shift();
  }

  let result = item;
  if (resultFieldParts.length > 0) {
    for (let index = 0; index < resultFieldParts.length; index++) {
      let part = resultFieldParts[index];
      if (result[part] === undefined) {
        break;
      }
      /* tslint:disable */
      else if (result[part] === null) {
        result = null;
        break;
      }
      /* tslint:enable */

      result = result[part];
    }
  }

  if (result === item) {
    return undefined;
  };

  return result;
}

export function compare(value1: any, value2: any) {
  /* tslint:disable */
  if (value1 === null) {
    return 1;
  } else if (value2 === null) {
    return -1;
  }
  /* tslint:enable */

  if (value1 && typeof value1 === 'string') {
    value1 = value1.toLowerCase();
  }

  if (value2 && typeof value2 === 'string') {
    value2 = value2.toLowerCase();
  }

  if (value1 === value2) {
    return 0;
  }

  return value1 > value2 ? 1 : -1;
}
