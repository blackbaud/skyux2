let _global: any = (typeof window === 'undefined' ? global : window);

interface SkyMatchResult {
  pass: boolean;
  message: string;
}

let skyMatchers: jasmine.CustomMatcherFactories = {
  toBeVisible: () => {
    return {
      compare: (el: Element): SkyMatchResult => {
        let result = {
          pass: false,
          message: ''
        };

        result.pass = getComputedStyle(el).display !== 'none';

        result.message = result.pass ?
          'Expected element to not be visible.' :
          'Expected element to be visible.';

        return result;
      }
    };
  },

  toHaveText: () => {
    return {
      compare: (el: any, expectedText: string, trimWhitespace = true): SkyMatchResult => {
        let result = {
          pass: false,
          message: ''
        };

        let actualText = el.innerText;

        if (trimWhitespace) {
          actualText = actualText.trim();
        }

        result.pass = actualText === expectedText;

        result.message = result.pass ?
          `Expected element's inner text not to be '${expectedText}'.` :
          `Expected element's inner text '${actualText}' to be '${expectedText}'.`;

        return result;
      }
    };
  },

  toHaveCssClass: () => {
    return {
      compare: (el: any, expectedCls: string): SkyMatchResult => {
        let result = {
          pass: false,
          message: ''
        };

        if (expectedCls.indexOf('.') === 0) {
          throw new Error('Please remove the leading dot from your class name.');
        }

        result.pass = el.classList.contains(expectedCls);

        result.message = result.pass ?
          `Expected element not to have CSS class ${expectedCls}.` :
          `Expected element to have CSS class ${expectedCls}.`;

        return result;
      }
    };
  },

  toHaveStyle: () => {
    return {
      compare: (el: any, expectedStyle: any): SkyMatchResult => {
        let result = {
          pass: false,
          message: ''
        };

        for (let p in expectedStyle) {
          if (expectedStyle.hasOwnProperty(p)) {
            let actualStyle = (getComputedStyle(el) as any)[p];

            if (actualStyle !== expectedStyle[p]) {
              if (result.message) {
                result.message += '\n';
              }

              result.message += result.pass ?
                `Expected element not to have CSS style '${p}: ${expectedStyle}'.` :
                `Expected element to have CSS style '${p}: ${expectedStyle}'.`;
            }
          }
        }

        return result;
      }
    };
  },

  toExist: () => {
    return {
      compare: (el: any): SkyMatchResult => {
        let result = {
          pass: false,
          message: ''
        };

        result.pass = !!el;

        result.message = result.pass ?
          'Expected element not to exist.' :
          'Expected element to exist.';

        return result;
      }
    };
  }
};

_global.beforeEach(() => {
  jasmine.addMatchers(skyMatchers);
});

export const expect: Function = _global.expect;
