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
          'Expected element to not be visible' :
          'Expected element to be visible';

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
          'Expected element\'s inner text not to be ' + expectedText :
          'Expected element\'s inner text to be ' + expectedText;

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

        result.pass = el.classList.contains(expectedCls);

        result.message = result.pass ?
          'Expected element not to have CSS class ' + expectedCls :
          'Expected element to have CSS class ' + expectedCls;

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
          'Expected element not to exist' :
          'Expected element to exist';

        return result;
      }
    };
  }
};

_global.beforeEach(() => {
  jasmine.addMatchers(skyMatchers);
});

export const expect: Function = _global.expect;
