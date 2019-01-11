# 2.39.0 (2019-01-11)

- Updated flyout component to improve performance. [blackbaud/skyux-flyout#16](https://github.com/blackbaud/skyux-flyout/pull/16)
- Updated flyout demo to include iterator example. [#2239](https://github.com/blackbaud/skyux2/pull/2239)
- Fixed checkbox component to only add `aria-label` to HTML tags when the `label` property is supplied. [blackbaud/skyux-forms#14](https://github.com/blackbaud/skyux-forms/pull/14)
- Fixed styles on flyout component's resize handle in Firefox. [blackbaud/skyux-flyout#15](https://github.com/blackbaud/skyux-flyout/pull/15)

# 2.38.0 (2019-01-09)

- Added style for invalid `textarea` elements. [blackbaud/skyux-theme#46](https://github.com/blackbaud/skyux-theme/pull/46) (Thanks @Blackbaud-JeffDye)
- Updated datepicker and timepicker demos to include reactive forms. [#2204](https://github.com/blackbaud/skyux2/pull/2204)
- Updated primary text and anchor colors to pass accessibility color contrast rule. [blackbaud/skyux-design-tokens#24](https://github.com/blackbaud/skyux-design-tokens/pull/24)
- Fixed card component to prevent infinite loops when users select or deselect cards. [blackbaud/skyux-layout#12](https://github.com/blackbaud/skyux-layout/pull/12)

# 2.37.0 (2019-01-04)

- Added `rowHighlightedId` input to grid component. [blackbaud/skyux-grids#28](https://github.com/blackbaud/skyux-grids/pull/28)

# 2.36.0 (2018-12-21)

- Added iterator buttons to the flyout component. [blackbaud/skyux-flyout#10](https://github.com/blackbaud/skyux-flyout/pull/10) (Thanks @Theaggarwal)
- Updated flyout service to utilize `SkyDynamicComponentService`. [blackbaud/skyux-flyout#9](https://github.com/blackbaud/skyux-flyout/pull/9)
- Updated modal dependencies to ensure proper modal host component removal [blackbaud/skyux-modals#20](https://github.com/blackbaud/skyux-modals/pull/20)
- Updated toast service to utilize `SkyDynamicComponentService` [blackbaud/skyux-toast#6](https://github.com/blackbaud/skyux-toast/pull/6)
- Fixed datepicker and timepicker components to properly transform provided values on initial load in reactive forms. [blackbaud/skyux-datetime#7](https://github.com/blackbaud/skyux-datetime/issues/7)
- Fixed grid component to only listen to `mousemove` and `mouseup` events while resizing columns. [blackbaud/skyux-grids#25](https://github.com/blackbaud/skyux-grids/pull/25)
- Fixed toast service to remove toaster component if all toast component instances have been closed. [blackbaud/skyux-toast#9](https://github.com/blackbaud/skyux-toast/pull/9)

# 2.35.0 (2018-12-19)

- Added multiselect feature to display column of checkboxes on grid component. [blackbaud/skyux-grids#6](https://github.com/blackbaud/skyux-grids/pull/6)
- Fixed `SkyDynamicComponentService` to fully destroy components which are dynamically removed. [blackbaud/skyux-core#55](https://github.com/blackbaud/skyux-core/pull/55)
- Fixed repeater component to properly handle overflow content. [blackbaud/skyux-lists#9](https://github.com/blackbaud/skyux-lists/pull/9)
- Fixed repeater item component to vertically align context menus and checkboxes correctly. [blackbaud/skyux-lists#10](https://github.com/blackbaud/skyux-lists/pull/10)
- Fixed vertical tabset group component to not accept clicks and have proper visual styles when disabled [blackbaud/skyux-tabs#7](https://github.com/blackbaud/skyux-tabs/pull/7)


# 2.34.0 (2018-12-14)

- Added ability to prevent modals from closing. [blackbaud/skyux-modals#7](https://github.com/blackbaud/skyux-modals/pull/7)
- Fixed section forms in modals to set minimum height of 460px. [blackbaud/skyux-modals#18](https://github.com/blackbaud/skyux-modals/pull/18)
- Fixed modal service to prevent errors during initialization. [blackbaud/skyux-modals#13](https://github.com/blackbaud/skyux-modals/pull/13)
- Fixed wait component to prevent tab navigation during blocking waits. [blackbaud/skyux-indicators#4](https://github.com/blackbaud/skyux-indicators/pull/4)
- Fixed tile component's help button to display by default when consumer provides `helpClick` listener. [blackbaud/skyux-tiles#18](https://github.com/blackbaud/skyux-tiles/pull/18)

# 2.33.1 (2018-12-11)

- Fixed progress indicator component's `progressChanges` emitter to only fire after all Angular lifecycle hooks have completed. [blackbaud/skyux-progress-indicator#3](https://github.com/blackbaud/skyux-progress-indicator/pull/3)

# 2.33.0 (2018-12-05)

- Added `isSelected` input to repeater item component. [blackbaud/skyux-lists#8](https://github.com/blackbaud/skyux-lists/pull/8)
- Added UI config service hooks to tile dashboard service. [blackbaud/skyux-tiles#11](https://github.com/blackbaud/skyux-tiles/pull/11)

# 2.32.0 (2018-12-03)

- Added options to overwrite the default title and default description on error components to enable error messages to display standard images with custom text. [blackbaud/skyux-errors#7](https://github.com/blackbaud/skyux-errors/pull/7)
- Added an optional help button to the tile component's header. [blackbaud/skyux-tiles#14](https://github.com/blackbaud/skyux-tiles/pull/14)
- Updated dependency to properly style the hover state for a selected tab that is not disabled. [blackbaud/skyux-theme#41](https://github.com/blackbaud/skyux-theme/pull/41)
- Fixed `SkyListViewGridModule` exports to include required submodules and `SkyGridModule`. [blackbaud/skyux-list-builder-view-grids#9](https://github.com/blackbaud/skyux-list-builder-view-grids/pull/9)
- Fixed modal focus to ignore hidden elements. [blackbaud/skyux-modals#12](https://github.com/blackbaud/skyux-modals/pull/12)
- Fixed the select field component to use the appropriate CSS styles when the control value is invalid. [blackbaud/skyux-select-field#3](https://github.com/blackbaud/skyux-select-field/pull/3)

# 2.31.0 (2018-11-29)

- Added `SkyDynamicComponentService` which provides the ability to inject entry components onto the page dynamically. [blackbaud/skyux-core#44](https://github.com/blackbaud/skyux-core/pull/44)
- Fixed sectioned form component to keep tabs stationary when users scroll through content and keep content stationary when users scroll through tabs. [blackbaud/skyux-tabs#4](https://github.com/blackbaud/skyux-tabs/pull/4)
- Fixed native HTML select fields to use the appropriate CSS style when control value is invalid. [blackbaud/skyux-theme#38](https://github.com/blackbaud/skyux-theme/pull/38)
- Fixed `sky-btn-tab` SCSS mixin to properly style the hover state for a selected, non-disabled tab. [blackbaud/skyux-theme#41](https://github.com/blackbaud/skyux-theme/pull/41)

# 2.30.1 (2018-11-21)

- Fixed flyout component to not close when an overlay above it is clicked. [blackbaud/skyux-flyout#3](https://github.com/blackbaud/skyux-flyout/pull/3)
- Fixed grid cells to properly handle text overflow when column widths are fixed. [blackbaud/skyux-grids#13](https://github.com/blackbaud/skyux-grids/pull/13)
- Fixed grid component's column resize drag handle to not inadvertently trigger column sort. [blackbaud/skyux-grids#17](https://github.com/blackbaud/skyux-grids/pull/17)
- Fixed colorpicker component to emit value changes properly. [blackbaud/skyux-colorpicker#5](https://github.com/blackbaud/skyux-colorpicker/pull/5)
- Fixed checkbox, datepicker and timepicker components to respect disabled states within reactive forms. [blackbaud/skyux-forms#7](https://github.com/blackbaud/skyux-forms/pull/7) [blackbaud/skyux-datetime#4](https://github.com/blackbaud/skyux-datetime/pull/4)

# 2.30.0 (2018-11-14)

- Added `debounceTime` input to autocomplete component. [blackbaud/skyux-lookup#8](https://github.com/blackbaud/skyux-lookup/pull/8)

# 2.29.1 (2018-11-13)

- Fixed checklist component to list all items when pagination is not enabled. [blackbaud/skyux-list-builder-view-checklist#9](https://github.com/blackbaud/skyux-list-builder-view-checklist/pull/9)

# 2.29.0 (2018-11-12)

- Added ability for the grid component to accept async column descriptions. [blackbaud/skyux-grids#6](https://github.com/blackbaud/skyux-grids/pull/6)
- Fixed autocomplete component to properly position results when inside a vertical tab form. [blackbaud/skyux-lookup#2](https://github.com/blackbaud/skyux-lookup/pull/2)
- Fixed grid component to recalculate table width when columns are hidden or shown. [blackbaud/skyux-grids#8](https://github.com/blackbaud/skyux-grids/pull/8)
- Fixed text highlight component performance. [blackbaud/skyux-indicators#15](https://github.com/blackbaud/skyux-indicators/pull/15)

# 2.28.3 (2018-11-09)

- Fixed some internationalization issues with avatar, datetime, and tabs.

# 2.28.2 (2018-11-09)

- Fixed animation imports for modal to allow for compatibility with Angular 7. [blackbaud/skyux-modals#9](https://github.com/blackbaud/skyux-modals/pull/9)
- Fixed initial modal focus state to be more subtle. [blackbaud/skyux-modals#8](https://github.com/blackbaud/skyux-modals/pull/8)
- Fixed "Only show selected" checkbox to return to first page when initially checked. [blackbaud/skyux-list-builder-view-checklist#5](https://github.com/blackbaud/skyux-list-builder-view-checklist/pull/5)
- Fixed text highlight directive to detect changes less frequently. [blackbaud/skyux-indicators#13](https://github.com/blackbaud/skyux-indicators/pull/13)
- Fixed key info to not throw a "changed after checked" error during initialization. [blackbaud/skyux-layout#4](https://github.com/blackbaud/skyux-layout/pull/4)
- Fixed some internationalization issues. [#2163](https://github.com/blackbaud/skyux2/pull/2163)
- Fixed `.sky-form-control` CSS class name to not overwrite inputs with a type of "range". [blackbaud/skyux-theme#35](https://github.com/blackbaud/skyux-theme/pull/35)

# 2.28.1 (2018-11-01)

- Added missing exports for animation and window. [#2162](https://github.com/blackbaud/skyux2/pull/2162)

# 2.28.0 (2018-10-30)

- Added SkyUIConfigService. [blackbaud/skyux-core#37](https://github.com/blackbaud/skyux-core/pull/37)
- Added option for minimum fraction digits to numeric service and pipe. [blackbaud/skyux-core#34](https://github.com/blackbaud/skyux-core/pull/34)
- Fixed tile dashboard to include missing `SkyTileDashboardConfigReorderData` export. [#2139](https://github.com/blackbaud/skyux2/pull/2139)
- Fixed column headers to no longer shift in size when sorting. [blackbaud/skyux-grids#4](https://github.com/blackbaud/skyux-grids/pull/4)
- Fixed modal backdrop opacity to match SKY UX v.1. [blackbaud/skyux-modals#4](https://github.com/blackbaud/skyux-modals/pull/4)
- Fixed long checkbox labels to not display a horizontal scrollbar. [blackbaud/skyux-theme#32](https://github.com/blackbaud/skyux-theme/pull/32)
- Fixed tile drag handle to have a more reliable click target. [blackbaud/skyux-tiles#9](https://github.com/blackbaud/skyux-tiles/pull/9)

# 2.27.2 (2018-10-22)

- Fixed dependencies to not collide with latest version of Builder.

# 2.27.1 (2018-10-19)
- Fixed module barrels that were missing exports for type files which are used as imports or outputs on previously exported files. [#2128](https://github.com/blackbaud/skyux2/pull/2128)
- Fixed missing dependency on "@skyux/i18n". [#2129](https://github.com/blackbaud/skyux2/pull/2129)

# 2.27.0 (2018-10-18)

- Added passive progress indicator mode. [#2013](https://github.com/blackbaud/skyux2/pull/2013)
- Added ARIA labels to wait component. [#8](https://github.com/blackbaud/skyux-indicators/pull/8)
- Added tab index on radio groups and deprecated tab index on radio buttons. [#2](https://github.com/blackbaud/skyux-forms/pull/2)
- Updated accessibility for repeater component. [#1758](https://github.com/blackbaud/skyux2/pull/1758)
- Updated datepicker, timepicker, and dropdown components to use a disable property. [#2005](https://github.com/blackbaud/skyux2/pull/2005)
- Updated keyinfo component to no longer have margins. [#2027](https://github.com/blackbaud/skyux2/pull/2027)
- Updated popover to export message types. [#2030](https://github.com/blackbaud/skyux2/pull/2030)
- Fixed sizing of progress indicator steps. [#2013](https://github.com/blackbaud/skyux2/pull/2013)
- Fixed unit tests to no longer have uncaught errors. [#2037](https://github.com/blackbaud/skyux2/pull/2037)
- Fixed several grid resize column bugs. [#2039](https://github.com/blackbaud/skyux2/pull/2039)
- Fixed colorpicker bug preventing colopicker to not open when clicked in IE11 [#2071](https://github.com/blackbaud/skyux2/pull/2071)
- Fixed visual tests to read i18n resource files. [#2099](https://github.com/blackbaud/skyux2/pull/2099)
- Fixed modal to initially focus `autofocus` attribute if available. [#3](https://github.com/blackbaud/skyux-modals/pull/3)
- Fixed text highlight regular expression to properly escape special characters. [#6](https://github.com/blackbaud/skyux-indicators/pull/6)

# 2.26.0 (2018-09-21)

- Added support for `@skyux/core@3.1.0`. [#2011](https://github.com/blackbaud/skyux2/pull/2011)
- Added resize functionality to grid columns. [#1973](https://github.com/blackbaud/skyux2/pull/1973)
- Added message stream to open popovers programatically. [#1978](https://github.com/blackbaud/skyux2/pull/1978)
- Updated accessibility for paging component, and disabled previous button on first page and next button on last page. [#1799](https://github.com/blackbaud/skyux2/pull/1799) (Thanks @Blackbaud-JackMcElhinney)
- Updated a few more components to utilize icon component instead of `<i>` tag. [#1987](https://github.com/blackbaud/skyux2/pull/1987)
- Updated fullscreen popovers to have a close button. [#1985](https://github.com/blackbaud/skyux2/pull/1985)
- Updated the toolbar custom demo to no longer have an example of a "right" button. Best practice dictates only view actions should be to the right of the search box. [#1992](https://github.com/blackbaud/skyux2/pull/1992)
- Updated the wizard component to utilize the progress indicator component for the horizontal wizard. Also added deprecation warning when using the old `tabStyle="wizard"` method. [#2002](https://github.com/blackbaud/skyux2/pull/2002)
- Fixed list component to work when both a search and filter are applied. [#2007](https://github.com/blackbaud/skyux2/pull/2007)

# 2.25.0 (2018-09-17)

- Added keyboard controls for resizing flyouts. [#1760](https://github.com/blackbaud/skyux2/pull/1760)
- Added keyboard controls for reordering tiles. [#1815](https://github.com/blackbaud/skyux2/pull/1815)
- Updated version of skyux-core. [#1990](https://github.com/blackbaud/skyux2/pull/1990)
- Updated all shadow-piercing combinators to use Angular's proprietary `::ng-deep`. [#1955](https://github.com/blackbaud/skyux2/pull/1955)
- Updated flyouts to close whenever users click outside of flyouts. [#1929](https://github.com/blackbaud/skyux2/pull/1929)
- Updated modal content panes to be focusable for accessible scrolling. [#1809](https://github.com/blackbaud/skyux2/pull/1809)
- Fixed paging component to not reserve space when only one page is available. [#1935](https://github.com/blackbaud/skyux2/pull/1935)

# 2.24.1 (2018-09-12)

- Fixed `sky-radio` buttons becoming permanently checked when not in a `sky-radio-group`. [#1982](https://github.com/blackbaud/skyux2/pull/1982)

# 2.24.0 (2018-09-11)

- Added support for `@skyux/core@3.0.1`. [#1953](https://github.com/blackbaud/skyux2/pull/1953)

# 2.23.0 (2018-09-07)

- Added support for Builder `1.20.2`. [#1968](https://github.com/blackbaud/skyux2/pull/1968)
- Updated all components to use icon component instead of `<i>` tag. [#1949](https://github.com/blackbaud/skyux2/pull/1949) (Thanks @Remulus2006)
- Updated various components to have proper accessibility attributes and IDs. [#1959](https://github.com/blackbaud/skyux2/pull/1959) [#1798](https://github.com/blackbaud/skyux2/pull/1798)
- Fixed accessibility issue with list toolbar component. [#1968](https://github.com/blackbaud/skyux2/pull/1968)
- Fixed radio component to work with reactive forms. [#1714](https://github.com/blackbaud/skyux2/pull/1714)
- Fixed spacing issues with repeater component. [#1925](https://github.com/blackbaud/skyux2/pull/1925)
- Fixed colorpicker to remove extra space for hidden dropdown. [#1948](https://github.com/blackbaud/skyux2/pull/1948)
- Fixed flyout to allow resizing on top of iframes. [#1952](https://github.com/blackbaud/skyux2/pull/1952)
- Fixed wait module to provide SkyWindowRefService. [#1961](https://github.com/blackbaud/skyux2/pull/1961)
- Fixed fluid grid so that changes to `<sky-column>` inputs update relevant classnames. [#1962](https://github.com/blackbaud/skyux2/pull/1962)

# 2.22.0 (2018-08-29)

- Added event to watch for tile dashboard initialization. [#1937](https://github.com/blackbaud/skyux2/pull/1937)
- Added progress indicator component. [#1728](https://github.com/blackbaud/skyux2/pull/1728) (Thanks @Blackbaud-ChristiSchneider and @Blackbaud-MichaelSpires)
- Added highlighting of search text in list view grid search results. [#1944](https://github.com/blackbaud/skyux2/pull/1944)
- Added icon style radio buttons and checkboxes. [#1892](https://github.com/blackbaud/skyux2/pull/1892) (Thanks @Blackbaud-AnandBhat)
- Fixed autocomplete and lookup to trigger their error states correctly. [#1928](https://github.com/blackbaud/skyux2/pull/1928)
- Fixed toast component to wrap long words correctly. [#1947](https://github.com/blackbaud/skyux2/pull/1947)
- Fixed list view checklist component to wrap items with long words correctly. [#1951](https://github.com/blackbaud/skyux2/pull/1951)

# 2.21.0 (2018-08-24)

- Added support for `@skyux/theme@3.0.0`. [#1930](https://github.com/blackbaud/skyux2/pull/1930)
- Added fluid grid container component, which provides a first-class method for handling the row component's negative margins. [#1920](https://github.com/blackbaud/skyux2/pull/1920)
- Added visual tests for timepicker component. [#1895](https://github.com/blackbaud/skyux2/pull/1895) (Thanks @Remulus2006)
- Fixed popover to appear above omnibar. [#1926](https://github.com/blackbaud/skyux2/pull/1926)
- Fixed Plunkers for infinite scroll and sectioned form components. [#1931](https://github.com/blackbaud/skyux2/pull/1931)

# 2.20.0 (2018-08-21)

- Added option to specify URL or Angular route for action button component. [#1896](https://github.com/blackbaud/skyux2/pull/1896) [#1924](https://github.com/blackbaud/skyux2/pull/1924) (Thanks @Remulus2006)
- Added option to only show selected items in list view checklist component. [#1900](https://github.com/blackbaud/skyux2/pull/1900) (Thanks @Theaggarwal)
- Added `selectedColumnIdsChange` event that fires when columns change in list view grid component. [#1897](https://github.com/blackbaud/skyux2/pull/1897)
- Updated definition list to show inner text during change detection. [#1919](https://github.com/blackbaud/skyux2/pull/1919)
- Fixed race condition in popover component's close event. [#1884](https://github.com/blackbaud/skyux2/pull/1884)
- Fixed visual style of HTML `select` field to be consistent in all browsers. [#1913](https://github.com/blackbaud/skyux2/pull/1913)
- Fixed sort button to display correct `title` and `label` values. [#1915](https://github.com/blackbaud/skyux2/pull/1915) (Thanks @Blackbaud-JackMcElhinney)
- Fixed tabset component to assign correct indexes to dynamically added tabs. [#1887](https://github.com/blackbaud/skyux2/pull/1887)

# 2.19.0 (2018-08-13)

- Added icon component. [#1846](https://github.com/blackbaud/skyux2/pull/1846) (Thanks @Remulus2006)
- Added `truncate` and `truncateAfter` options to numeric pipe. [#1856](https://github.com/blackbaud/skyux2/pull/1856)
- Added CSS styles and ARIA attributes for disabled tabs. [#1803](https://github.com/blackbaud/skyux2/pull/1803)
- Added `readonly` attribute to colorpicker component's input field. [#1791](https://github.com/blackbaud/skyux2/pull/1791)
- Added ARIA roles to modal and confirm components. [#1784](https://github.com/blackbaud/skyux2/pull/1784)
- Added ARIA attributes for inline list filters. [#1808](https://github.com/blackbaud/skyux2/pull/1808)
- Changed color of flyout resize handle. [#1881](https://github.com/blackbaud/skyux2/pull/1881)
- Fixed checkbox component to appear square in IE11. [#1879](https://github.com/blackbaud/skyux2/pull/1879)
- Fixed tabset component assigning the correct tab index after a tab was deleted. [#1878](https://github.com/blackbaud/skyux2/pull/1878)
- Various colorpicker adjustments [#1876](https://github.com/blackbaud/skyux2/pull/1876):
  - Added `selectedColorApplied` event that provides the selected color when the apply button is pressed.
  - Fixed colorpicker remaining open after clicking outside of the dropdown.
  - Fixed colorpicker reverting back to the initial color when the close button is pressed.
  - Fixed colorpicker reverting back to the initial color when the reset button is pressed.

# 2.18.0 (2018-07-20)

- Added ability to include `body` content within confirm component. [#1776](https://github.com/blackbaud/skyux2/pull/1776) (Thanks @Blackbaud-JackMcElhinney)
- Added default ARIA label to colorpicker input. [#1788](https://github.com/blackbaud/skyux2/pull/1788)
- Added default ARIA label to timepicker button and input. [#1802](https://github.com/blackbaud/skyux2/pull/1802), [#1795](https://github.com/blackbaud/skyux2/pull/1795)
- Added ARIA sort attribute to grid component columns. [#1796](https://github.com/blackbaud/skyux2/pull/1796) (Thanks @Blackbaud-JackMcElhinney)
- Added support for `rgb` format for colorpicker component. [#1775](https://github.com/blackbaud/skyux2/pull/1775) (Thanks @Blackbaud-JackMcElhinney)
- Added ARIA label input for token component. [#1824](https://github.com/blackbaud/skyux2/pull/1824) [#1807](https://github.com/blackbaud/skyux2/pull/1807)
- Added ARIA required and accessibility attributes to sectioned form component vertical tabs. [#1797](https://github.com/blackbaud/skyux2/pull/1797)
- Changed element in page summary subtitle component. [#1800](https://github.com/blackbaud/skyux2/pull/1800) (Thanks @Blackbaud-JackMcElhinney)
- Fixed toast component to appear above modals. [#1756](https://github.com/blackbaud/skyux2/pull/1756) (Thanks @Blackbaud-JackMcElhinney)
- Fixed asynchronous tabs to initialize appropriately. [#1827](https://github.com/blackbaud/skyux2/pull/1827)
- Fixed tile component to only display title element when heading text is supplied. [#1801](https://github.com/blackbaud/skyux2/pull/1801)
- Fixed timepicker component to clear input value when `ngModel` is set to `undefined`. [#1772](https://github.com/blackbaud/skyux2/pull/1772) (Thanks @Blackbaud-JackMcElhinney)
- Fixed Plunker for colorpicker component demo. [#1752](https://github.com/blackbaud/skyux2/pull/1752)
- Fixed regular expression for email validation to be more specific. [#1813](https://github.com/blackbaud/skyux2/pull/1813) (Thanks @Blackbaud-DylanHouston)
- Fixed accessibility issue in confirm demo. [#1783](https://github.com/blackbaud/skyux2/pull/1783)
- Fixed accessibility issue in email validation demo. [#1806](https://github.com/blackbaud/skyux2/pull/1806)
- Moved Angular animations module to `devDependencies`. [#1746](https://github.com/blackbaud/skyux2/pull/1746)
- Fixed visual tests to fail during Protractor's error code 199. [#1830](https://github.com/blackbaud/skyux2/pull/1830)
- Removed SKY Host status bar during visual tests. [#1825](https://github.com/blackbaud/skyux2/pull/1825)

# 2.17.0 (2018-07-05)

- Added primary action button to flyout component toolbar. [#1766](https://github.com/blackbaud/skyux2/pull/1766) (Thanks @Blackbaud-StewartStephens)
- Updated accessibility for colorpicker component. [#1789](https://github.com/blackbaud/skyux2/pull/1789)
- Updated accessibility for dropdown button component. [#1781](https://github.com/blackbaud/skyux2/pull/1781)
- Updated accessibility for tabset component. [#1786](https://github.com/blackbaud/skyux2/pull/1786)
- Updated accessibility for action button component. [#1778](https://github.com/blackbaud/skyux2/pull/1778)
- Updated accessibility for link records component. [#1782](https://github.com/blackbaud/skyux2/pull/1782)

# 2.16.0 (2018-07-02)

- Restructured list toolbar component to meet design guidelines. [#1645](https://github.com/blackbaud/skyux2/pull/1645) (Thanks @Blackbaud-TrevorBurch)
- Added ARIA labels to datepicker component. [#1753](https://github.com/blackbaud/skyux2/pull/1753)
- Added ARIA roles to dropdown component. [#1749](https://github.com/blackbaud/skyux2/pull/1749)
- Added default value for timepicker component's `timeFormat` input. [#1736](https://github.com/blackbaud/skyux2/pull/1736)
- Fixed paging component's `maxPages` input to correctly display the maximum number of pages. [#1735](https://github.com/blackbaud/skyux2/pull/1735)
- Added hyperlink anchor tags to demos for alert and toast components. [#1723](https://github.com/blackbaud/skyux2/pull/1723)
- Fixed race condition in wait service during teardown of wait component. [#1739](https://github.com/blackbaud/skyux2/pull/1739)
- Fixed incorrect tab indexes for conditionally rendered tabs. [#1738](https://github.com/blackbaud/skyux2/pull/1738)

# 2.15.0 (2018-06-18)

- Added debounce time to search component. [#1726](https://github.com/blackbaud/skyux2/pull/1726) (Thanks @Blackbaud-LoganJahnke)
- Added `startingDay` to datepicker input directive. [#1732](https://github.com/blackbaud/skyux2/pull/1732)
- Fixed datepicker input directive to clear value from underlying input element. [#1730](https://github.com/blackbaud/skyux2/pull/1730)
- Fixed repeater component to correctly initialize when consumed by component with change detection strategy of `OnPush`. [#1724](https://github.com/blackbaud/skyux2/pull/1724)
- Fixed numeric service to use accurate localization symbols. [#1716](https://github.com/blackbaud/skyux2/pull/1716)
- Fixed issue with modal component trying to close itself on route change if it is already closed. [#1741](https://github.com/blackbaud/skyux2/pull/1741)

# 2.14.0 (2018-06-05)

- Added infinite scroll component. [#1696](https://github.com/blackbaud/skyux2/pull/1696) (Thanks @blackbaud-conorwright)
- Added help button to list column chooser modal. [#1686](https://github.com/blackbaud/skyux2/pull/1686) (Thanks @Blackbaud-TrevorBurch)
- Updated styles for checkbox and radio components. [#1694](https://github.com/blackbaud/skyux2/pull/1694) (Thanks @Blackbaud-AnandBhat)
- Fixed incorrect icons for toast component. [#1711](https://github.com/blackbaud/skyux2/pull/1711)
- Fixed modals to automatically close when users navigate away from a page. [#1683](https://github.com/blackbaud/skyux2/pull/1683) (Thanks @blackbaud-conorwright)

# 2.13.0 (2018-05-21)

- Added toast component. [#1676](https://github.com/blackbaud/skyux2/pull/1676) (Thanks @blackbaud-conorwright)
- Added permalink button to flyout header. [#1638](https://github.com/blackbaud/skyux2/pull/1638) (Thanks @Blackbaud-AlexKingman)
- Added template-driven and reactive form examples to colorpicker demo. [#1699](https://github.com/blackbaud/skyux2/pull/1699)
- Fixed slide animation clipping overflow content. [#1698](https://github.com/blackbaud/skyux2/pull/1698)

# 2.12.2 (2018-05-11)

- Fixed missing RxJS imports for all components. Prevented third-party modules from being bundled with SKY UX. [#1491](https://github.com/blackbaud/skyux2/pull/1491)
- Fixed popover position inside flyouts. [#1637](https://github.com/blackbaud/skyux2/pull/1637) (Thanks @Blackbaud-StacyCarlos)
- Fixed help inline button to prevent it from triggering form submissions. [#1661](https://github.com/blackbaud/skyux2/pull/1661)
- Fixed IE11 arrow key navigation for dropdown menus. [#1652](https://github.com/blackbaud/skyux2/pull/1652) (Thanks @blackbaud-conorwright)

# 2.12.1 (2018-04-26)

- Fixed dropdown repositioning slowness. [#1655](https://github.com/blackbaud/skyux2/pull/1655)

# 2.12.0 (2018-04-23)

- Added select field component. [#1629](https://github.com/blackbaud/skyux2/pull/1629) (Thanks @Blackbaud-JaminQuimby)
- Added shadow and border-radius CSS classes. [#1571](https://github.com/blackbaud/skyux2/pull/1571)
- Added support for Builder `1.13.0`. [#1627](https://github.com/blackbaud/skyux2/pull/1627)
- Adjusted button styles. [#1605](https://github.com/blackbaud/skyux2/pull/1605), [#1641](https://github.com/blackbaud/skyux2/pull/1641)
- Updated text expand component to automatically expand when the `maxLength` property is set. [#1615](https://github.com/blackbaud/skyux2/pull/1615) (Thanks @Blackbaud-MikitaYankouski)
- Refactored list secondary actions to use dropdown directly. [#1600](https://github.com/blackbaud/skyux2/pull/1600)
- Removed the internal `TestUtility` helper from components in favor of Builder's `SkyAppTestUtility`. [#1598](https://github.com/blackbaud/skyux2/pull/1598)
- Fixed dropdown not scrolling in IE11. [#1642](https://github.com/blackbaud/skyux2/pull/1642) (Thanks @blackbaud-conorwright)
- Fixed dropdown scroll behavior in a scrollable container. [#1634](https://github.com/blackbaud/skyux2/pull/1634)
- Fixed custom click events to fire on the dropdown tag. [#1640](https://github.com/blackbaud/skyux2/pull/1640)

# 2.11.0 (2018-03-30)

- Added ability to resize width of flyouts. [#1539](https://github.com/blackbaud/skyux2/pull/1539) (Thanks @Blackbaud-StacyCarlos)
- Added ability to interact programmatically with colorpickers. [#1522](https://github.com/blackbaud/skyux2/pull/1522) (Thanks @Blackbaud-JaminQuimby)
- Added option to hide the reset button for colorpickers. [#1522](https://github.com/blackbaud/skyux2/pull/1522) (Thanks @Blackbaud-JaminQuimby)
- Added option to hide the settings button for tiles. [#1540](https://github.com/blackbaud/skyux2/pull/1540) (Thanks @blackbaud-conorwright)
- Updated demos for error, lookup, and autocomplete components. [#1557](https://github.com/blackbaud/skyux2/pull/1557), [#1576](https://github.com/blackbaud/skyux2/pull/1576), [#1525](https://github.com/blackbaud/skyux2/pull/1525)
- Renamed unsubscribe streams for consistency. [#1527](https://github.com/blackbaud/skyux2/pull/1527)
- Fixed highlight component to work with backslashes. [#1513](https://github.com/blackbaud/skyux2/pull/1513) (Thanks @joelamora)
- Fixed race condition in link records component. [#1589](https://github.com/blackbaud/skyux2/pull/1589) (Thanks @Blackbaud-KristinaDurivage)
- Fixed hyperlink styles in alerts. [#1595](https://github.com/blackbaud/skyux2/pull/1595)

# 2.10.0 (2018-03-14)

- Added lookup component. [#1495](https://github.com/blackbaud/skyux2/pull/1495) (Thanks @Blackbaud-TomRamsey)
- Added tokens component. [#1485](https://github.com/blackbaud/skyux2/pull/1485)
- Added support for Moment 2.21.0. [#1531](https://github.com/blackbaud/skyux2/pull/1531)
- Added support for microedge-rxstate 2.0.2, Builder 1.10.1, and source-map-inline-loader 1.0.0. [#1532](https://github.com/blackbaud/skyux2/pull/1532)
- Updated styles for labels, alerts, and status text. [#1509](https://github.com/blackbaud/skyux2/pull/1509)
- Updated list provider demo component. [#1468](https://github.com/blackbaud/skyux2/pull/1468) (Thanks @Blackbaud-BrandonHare)
- Fixed card issue where action bar was still visible when hidden with `*ngIf`. [#1533](https://github.com/blackbaud/skyux2/pull/1533) (Thanks @blackbaud-conorwright)
- Fixed HTML entities in demo service source files. Fixed component templates being injected into demo service files. [#1529](https://github.com/blackbaud/skyux2/pull/1529)

# 2.9.0 (2018-02-15)

- Added autocomplete component. [#1438](https://github.com/blackbaud/skyux2/pull/1438) (Thanks @Blackbaud-TomRamsey)
- Fixed action button keyup also triggering click event. [#1448](https://github.com/blackbaud/skyux2/pull/1448)
- Fixed error when dropdown does not include menu. [#1470](https://github.com/blackbaud/skyux2/pull/1470)
- Fixed error when popover directive references undefined popover component. [#1475](https://github.com/blackbaud/skyux2/pull/1475)

# 2.8.0 (2018-02-08)

- Added flyout component. [#1460](https://github.com/blackbaud/skyux2/pull/1460) (Thanks @Blackbaud-TrevorBurch and @Blackbaud-AlexKingman)
- Added support for FontAwesome 4.7.0. [#1451](https://github.com/blackbaud/skyux2/pull/1451) (Thanks @Blackbaud-BrandonHare)
- Fixed position issues with components using dropdown. [#1450](https://github.com/blackbaud/skyux2/pull/1450)
- Fixed list view grid column headings not working with impure pipes. [#1436](https://github.com/blackbaud/skyux2/pull/1436)
- Fixed modal receiving focus on an invalid element. [#1392](https://github.com/blackbaud/skyux2/pull/1392) (Thanks @saranshkataria)

# 2.7.0 (2018-01-26)

- Added option for horizontal alignment on the popover component. [#1386](https://github.com/blackbaud/skyux2/pull/1386)
- Popover now attempts to find the most suitable placement during window scroll events. [#1386](https://github.com/blackbaud/skyux2/pull/1386)
- Added dropdown message stream to allow other components to remotely control its functions (open, close, etc.). [#1386](https://github.com/blackbaud/skyux2/pull/1386)
- Added ability for dropdown items to be navigated with arrow keys. [#1386](https://github.com/blackbaud/skyux2/pull/1386)
- Refactored dropdown component to use popover's placement functionality. [#1386](https://github.com/blackbaud/skyux2/pull/1386)
- Modal instance closed event is now automatically completed internally. [#1326](https://github.com/blackbaud/skyux2/pull/1326) (Thanks @Blackbaud-ScottFreeman)
- Fixed visual issues with collapsed tabs in IE11 [#1406](https://github.com/blackbaud/skyux2/pull/1406)
- Fixed TestUtility `toHaveText` matcher not working for certain scenarios. [#1422](https://github.com/blackbaud/skyux2/pull/1422) (Thanks @Blackbaud-StacyCarlos)
- Fixed definition list component printing "None found" before change detection. [#1424](https://github.com/blackbaud/skyux2/pull/1424)

# 2.6.0 (2018-01-04)

- Added demo components module to enable demo components to be consumed outside this project. This is to enable future refactoring of documentation into a separate repo. [#1350](https://github.com/blackbaud/skyux2/pull/1350)

# 2.5.0 (2017-12-15)

- Added URL validation directive. [#1334](https://github.com/blackbaud/skyux2/pull/1334) (Thanks @Blackbaud-JeffDye)
- Updated confirmation component API and event arguments. [#1333](https://github.com/blackbaud/skyux2/pull/1333)
- Accessibility is now checked by default during visual tests. [#1313](https://github.com/blackbaud/skyux2/pull/1313)

# 2.4.1 (2017-11-28)

- Fixed missing files in published package. [#1315](https://github.com/blackbaud/skyux2/pull/1315)

# 2.4.0 (2017-11-27)

- Added confirmation component. [#1209](https://github.com/blackbaud/skyux2/pull/1209) (Thanks @Blackbaud-AnthonyLopez)
- Added support for Builder 1.7.1. [#1294](https://github.com/blackbaud/skyux2/pull/1294)
- Fixed file attachments button submitting forms. [#1311](https://github.com/blackbaud/skyux2/pull/1311)
- Fixed position of hidden input in checkbox component. [#1256](https://github.com/blackbaud/skyux2/pull/1256)
- Fixed async grid column headings. [#1259](https://github.com/blackbaud/skyux2/pull/1259)

# 2.3.2 (2017-10-31)

- Fixed error component visual tests being clipped. [#1241](https://github.com/blackbaud/skyux2/pull/1241)
- Fixed colorpicker repeating background. [#1245](https://github.com/blackbaud/skyux2/pull/1245)

# 2.3.1 (2017-10-26)

- Removed bottom margin of fluid-grid row component. [#1212](https://github.com/blackbaud/skyux2/pull/1212) (Thanks @Blackbaud-ScottFreeman)
- Altered popover animation states to use best practices. [#1218](https://github.com/blackbaud/skyux2/pull/1218)
- Fixed visual inconsistencies with search component in IE11. [#1234](https://github.com/blackbaud/skyux2/pull/1234)
- Fixed various colorpicker bugs. [#1227](https://github.com/blackbaud/skyux2/pull/1227)
- Fixed line-breaks for long text in link records component. [#1226](https://github.com/blackbaud/skyux2/pull/1226) (Thanks @Blackbaud-KristinaDurivage)
- Fixed warning thrown by modal host during builds. [#1216](https://github.com/blackbaud/skyux2/pull/1216)

# 2.3.0 (2017-10-16)

- Added CSS class name to body when modal is displayed full-page. [#1180](https://github.com/blackbaud/skyux2/pull/1180) (Thanks @Blackbaud-BrandonJones)
- Added ability to show popover on mouse hover. [#1172](https://github.com/blackbaud/skyux2/pull/1172)
- Added padding to tabset component. [#1167](https://github.com/blackbaud/skyux2/pull/1167)
- Updated link records label color. [#1176](https://github.com/blackbaud/skyux2/pull/1176)
- Fixed file drop component in IE11. [#1179](https://github.com/blackbaud/skyux2/pull/1179)
- Fixed incorrect border color for search component button. [#1197](https://github.com/blackbaud/skyux2/pull/1197)
- Fixed definition list component wrapping to a new row. [#1194](https://github.com/blackbaud/skyux2/pull/1194)
- Fixed SVG error images not showing in IE11. [#1190](https://github.com/blackbaud/skyux2/pull/1190)

# 2.2.0 (2017-10-04)

- Added support for Builder 1.1.0. [#1157](https://github.com/blackbaud/skyux2/pull/1157)
- Added sectioned form component. [#1068](https://github.com/blackbaud/skyux2/pull/1068) (Thanks @Blackbaud-AdamHickey)
- Added help button to modal header. [#1144](https://github.com/blackbaud/skyux2/pull/1144) (Thanks @Blackbaud-BrandonJones)
- Added vertical separator to vertical tabs component. [#1140](https://github.com/blackbaud/skyux2/pull/1140)
- Fixed flex elements not displaying properly within alert component (IE11). [#1151](https://github.com/blackbaud/skyux2/pull/1151)
- Fixed drag/collapse not working properly for tile component (IE11, Edge). [#1153](https://github.com/blackbaud/skyux2/pull/1153)
- Fixed newlines with text expand component. [#1138](https://github.com/blackbaud/skyux2/pull/1138)
- Fixed padding of tile dashboard component (IE11). [#1127](https://github.com/blackbaud/skyux2/pull/1127)
- Fixed file drop component not displaying properly during a serve. [#1073](https://github.com/blackbaud/skyux2/pull/1073)

# 2.1.0 (2017-09-26)

- Added support for Angular 4.3.6. [#1117](https://github.com/blackbaud/skyux2/pull/1117)
- Adjusted link records component styles. [#1104](https://github.com/blackbaud/skyux2/pull/1104)
- Fixed some buttons not having correct `type`. [#1111](https://github.com/blackbaud/skyux2/pull/1111)
- Fixed visual tests not running for certain components. [#1109](https://github.com/blackbaud/skyux2/pull/1109)
- Fixed 'x' button not firing modal 'closed' event. [#1085](https://github.com/blackbaud/skyux2/pull/1085)
- Fixed click events on radio component firing twice. [#1091](https://github.com/blackbaud/skyux2/pull/1091)

# 2.0.3 (2017-09-21)

- Added link records component. [#1036](https://github.com/blackbaud/skyux2/pull/1036) (Thanks @blackbaud-joshgerdes)
- Fixed wrapping columns for extra-small fluid grid component. [#1096](https://github.com/blackbaud/skyux2/pull/1096)

# 2.0.2 (2017-09-21)

- Added extra-small breakpoint to fluid grid component. [#1088](https://github.com/blackbaud/skyux2/pull/1088)

# 2.0.1 (2017-09-18)

- Added support for tile components within modals. [#1039](https://github.com/blackbaud/skyux2/pull/1039) (Thanks @Blackbaud-TomRamsey)
- Added support for SKY UX Builder `1.0.0-rc.19`. [#1066](https://github.com/blackbaud/skyux2/pull/1066)
- Fixed bug with vertical tabset component when not using tab groups. [#1076](https://github.com/blackbaud/skyux2/pull/1076)
- Fixed bug with tile component styles on smaller screens. [#1067](https://github.com/blackbaud/skyux2/pull/1067)

# 2.0.0 (2017-09-14)

- Added vertical tabs component. [#1004](https://github.com/blackbaud/skyux2/pull/1004) (Thanks @Blackbaud-AdamHickey)
- Added popover component. [#1020](https://github.com/blackbaud/skyux2/pull/1020)
- Updated colors and fonts. [#1053](https://github.com/blackbaud/skyux2/pull/1053), [#1059](https://github.com/blackbaud/skyux2/pull/1059)
- Added `errorType="security"` option to error component [#1011](https://github.com/blackbaud/skyux2/pull/1011) (Thanks @Blackbaud-JeffDye)
- Implemented `cursor: default` for a disabled checkbox component [#1025](https://github.com/blackbaud/skyux2/pull/1025) (Thanks @Blackbaud-TrevorBurch)
- Added styles for text overflow on `SkyListViewChecklist`. [#1043](https://github.com/blackbaud/skyux2/pull/1043)
- Fixed typo in `SkyModalConfigurationInterface`. [#1034](https://github.com/blackbaud/skyux2/pull/1034)
- Fixed bug with `SkyListViewChecklist` search. [#1046](https://github.com/blackbaud/skyux2/pull/1046)

# 2.0.0-rc.12 (2017-08-29)

 - Added `searchClear` emitter to search component. [#1013](https://github.com/blackbaud/skyux2/pull/1013) (Thanks @Blackbaud-TrevorBurch)
 - Adjusted form group spacing. [#1022](https://github.com/blackbaud/skyux2/pull/1022)
 - Standardized the color of borderless icon buttons. Darkened button and input borders, and lightened applied filter bubbles to improve usability. [#999](https://github.com/blackbaud/skyux2/pull/999)
 - Fixed bug with multiple requests during list component column change. [#982](https://github.com/blackbaud/skyux2/pull/982) (Thanks @Blackbaud-LuisBello)

# 2.0.0-rc.11 (2017-08-17)

  - Added support for NPM 5. [#997](https://github.com/blackbaud/skyux2/pull/997)
  - Added support for `@blackbaud/skyux-builder@1.0.0-rc.15`. [#975](https://github.com/blackbaud/skyux2/pull/975)
  - Added action button container component. [#968](https://github.com/blackbaud/skyux2/pull/968)
  - Ported inline help component from SKY UX v.1. [#874](https://github.com/blackbaud/skyux2/pull/874) (Thanks @Blackbaud-SandhyaRajasabeson)
  - Added new fluid grid component, which allows for responsive rows and columns. [#957](https://github.com/blackbaud/skyux2/pull/957) (Thanks @Blackbaud-JeffDye)
  - Exposed multiple properties and events for tile component. [#966](https://github.com/blackbaud/skyux2/pull/966)
  - Fixed linting errors. [#961](https://github.com/blackbaud/skyux2/pull/961)
  - Fixed bug with search component event handlers. [#960](https://github.com/blackbaud/skyux2/pull/960)


# 2.0.0-rc.10 (2017-07-27)

  - Ensure that modal doesn't lose background scroll position on open. [#940](https://github.com/blackbaud/skyux2/issues/940)
# 2.0.0-rc.9 (2017-07-25)

  - Adjusted z-index of colorpicker button to prevent it from appearing over the colorpicker menu.
  - Added colorpicker directives/classes to core exports.
  - Fixed documentation around design colors. [#931](https://github.com/blackbaud/skyux2/issues/931)
  - Adjusted padding of alerts so that size does not change when adding close button. [#929](https://github.com/blackbaud/skyux2/issues/929)
  - Fixed the condensed fonts so they appear properly in Safari. [#927](https://github.com/blackbaud/skyux2/issues/927)
  - Added the `sky-control-label` and `sky-control-label-required` classes and documentation. [#872](https://github.com/blackbaud/skyux2/issues/872)

# 2.0.0-rc.8 (2017-07-21)

  - Updated rxjs library to 5.4.2. [#885](https://github.com/blackbaud/skyux2/issues/885) (Thanks @Blackbaud-TrevorBurch)
  - Updated small card width to 225px and large card with to 350px to account for increased font sizes.
  - Updated modal to automatically put focus in dialog when opening. [#860](https://github.com/blackbaud/skyux2/issues/860), [#771](https://github.com/blackbaud/skyux2/issues/771), [#478](https://github.com/blackbaud/skyux2/issues/478)
  - Updated modal to keep focus in dialog until it is closed. [#860](https://github.com/blackbaud/skyux2/issues/860), [#771](https://github.com/blackbaud/skyux2/issues/771), [#635](https://github.com/blackbaud/skyux2/issues/635)
  - Updated modal to close when the escape key is pressed. [#772](https://github.com/blackbaud/skyux2/issues/772)
  - Updated modal to return focus to the element that opened the modal [#771](https://github.com/blackbaud/skyux2/issues/771)
  - Fixed typo in modal testing documentation. [#829](https://github.com/blackbaud/skyux2/issues/829)

# 2.0.0-rc.7 (2017-07-20)

### Breaking visual changes

  - We have released changes to the SKY UX color scheme and fonts. These changes allow SKY UX to meet accessibility standards as well as increasing our brand alignment with marketing. [#247](https://github.com/blackbaud/skyux2/issues/247), [#250](https://github.com/blackbaud/skyux2/issues/250), [#739](https://github.com/blackbaud/skyux2/issues/739), [#913](https://github.com/blackbaud/skyux2/issues/913).

# 2.0.0-rc.6 (2017-07-18)

  - Added single-select mode for checklist. [#387](https://github.com/blackbaud/skyux2/issues/387)
  - Updated node version to 6.11.1 in response to security vulnerability (https://nodejs.org/en/blog/vulnerability/july-2017-security-releases/)
  - Handled IE11 grid sort bug. [#891](https://github.com/blackbaud/skyux2/issues/891)
  - Added the color picker component. [#725](https://github.com/blackbaud/skyux2/issues/725) (Thanks @Blackbaud-JaminQuimby)

# 2.0.0-rc.5 (2017-07-11)

  - Added default aria-label for dropdown. [#854](https://github.com/blackbaud/skyux2/issues/854), [#855](https://github.com/blackbaud/skyux2/issues/855). (Thanks @Blackbaud-AdamHickey)
  - Fixed padding around file attachment. [#823](https://github.com/blackbaud/skyux2/issues/823) (Thanks @Blackbaud-SandhyaRajasabeson)
  - Fixed error modal when using long description in IE11. [#784](https://github.com/blackbaud/skyux2/issues/784) (Thanks @Blackbaud-AdamHickey)
  - Fixed navbar alignment in IE11. [#853](https://github.com/blackbaud/skyux2/issues/853) (Thanks @Blackbaud-AdamHickey)

# 2.0.0-rc.4 (2017-06-24)

  - Fix npm release error.

# 2.0.0-rc.3 (2017-06-24)

  - Added keyboard support for tab component. [#188](https://github.com/blackbaud/skyux2/issues/188) (Thanks @Blackbaud-SandhyaRajasabeson)
  - Added animation polyfill for increased browser support. [#803](https://github.com/blackbaud/skyux2/issues/803) (Thanks @Blackbaud-SandhyaRajasabeson)
  - Added text highlight directive. [#775](https://github.com/blackbaud/skyux2/issues/775)

  ### Library updates

  - Added support for Angular 4.2.5 to fix some angular animation issues, see https://github.com/angular/angular/blob/master/CHANGELOG.md for more information.

# 2.0.0-rc.2 (2017-06-23)

- All the updates for 2.0.0-beta.33.
- Added support for SKY UX Builder 1.0.0-rc.3.

# 2.0.0-beta.33 (2017-06-23)

  - Added the SkyNumeric Pipe. [#764](https://github.com/blackbaud/skyux2/issues/764) (Thanks @Blackbaud-AdamSc)
  - Added the email validation directive. [#379](https://github.com/blackbaud/skyux2/issues/379) (Thanks @Blackbaud-SandhyaRajasabeson)

# 2.0.0-rc.1 (2017-06-20)

  - All the updates for 2.0.0-beta.32.

  ### Breaking changes

  - Fixed typo to change SkyTimepickerTimeOutput `ios8601` property to be `iso8601`.

# 2.0.0-beta.32 (2017-06-20)

  - Tweaked animation for text-expand in firefox. [#695](https://github.com/blackbaud/skyux2/issues/695)
  - Handle search when paging does not exist. [#813](https://github.com/blackbaud/skyux2/issues/813)

# 2.0.0-rc.0 (2017-06-16)

  - Updated dependencies to support Angular 4.1.3. [#549](https://github.com/blackbaud/skyux2/issues/549) See http://angularjs.blogspot.com/2017/03/angular-400-now-available.html and https://github.com/angular/angular/blob/master/CHANGELOG.md for more information.
  - Updated visual test process for SKY UX 2.

# 2.0.0-beta.31 (2017-06-14)

  - Added ability to specify sizes for modals. [#489](https://github.com/blackbaud/skyux2/issues/489) (Thanks @Blackbaud-AdamHickey)
  - Added timepicker module to core exports. [#754](https://github.com/blackbaud/skyux2/issues/754)
  - Fixed responsiveness for large modal size. [#778](https://github.com/blackbaud/skyux2/issues/778)
  - Made the dropdown adjust alignment based on space available. [#777](https://github.com/blackbaud/skyux2/issues/777)
  - Fixed the AOT compilation for datepicker. [#794](https://github.com/blackbaud/skyux2/issues/794) (Thanks @Blackbaud-JoshGerdes)
  - Added `isPrimary` flag for dropdowns. [#606](https://github.com/blackbaud/skyux2/issues/606) (Thanks @Blackbaud-SandhyaRajasabeson)

# 2.0.0-beta.30 (2017-06-07)

  - Fixed bug when modal service injected into ngIf block. [#744](https://github.com/blackbaud/skyux2/issues/744)
  - Added locale date format as default to datepicker. [#732](https://github.com/blackbaud/skyux2/issues/732) (Thanks @Blackbaud-JoshGerdes)
  - Added error modal to avatar when image upload fails [#204](https://github.com/blackbaud/skyux2/issues/204) (Thanks @Blackbaud-AdamHickey)
  - Ensure list moves to first page after search is executed. [#706](https://github.com/blackbaud/skyux2/issues/706)
  - Added checkbox to repeater component. [#278](https://github.com/blackbaud/skyux2/issues/278) (Thanks @Blackbaud-AdamHickey)
  - Ensure fixed columns not appear in the column chooser for list. [#660](https://github.com/blackbaud/skyux2/issues/660)


# 2.0.0-beta.29 (2017-05-24)

  - Added the error modal service. (Thanks @Blackbaud-AdamHickey)

# 2.0.0-beta.28 (2017-05-17)

  - Added the timepicker component. (Thanks @Blackbaud-JaminQuimby)

# 2.0.0-beta.27 (2017-05-16)

  - Added proper nesting for `getData` in grids. (Thanks @Blackbaud-TrevorBurch)
  - Added documentation around editing skyuxconfig. [#700](https://github.com/blackbaud/skyux2/issues/700)
  - Added space between modal footer buttons and added cancel button to wizard demo. [#541](https://github.com/blackbaud/skyux2/issues/541)
  - Ensured component wait mask appears behind modal. [#637](https://github.com/blackbaud/skyux2/issues/637)
  - Updated styles for full page modal header. [#548](https://github.com/blackbaud/skyux2/issues/548)
  - Updated styles for placeholder text for inputs. [#538](https://github.com/blackbaud/skyux2/issues/538)
  - Updated disabled and hover styles for paging. [#539](https://github.com/blackbaud/skyux2/issues/539)
  - Updated border and striped background for grids. [#536](https://github.com/blackbaud/skyux2/issues/536)
  - Updated text color for body. [#533](https://github.com/blackbaud/skyux2/issues/533)
  - Fixed bug around search and paging for lists. [#696](https://github.com/blackbaud/skyux2/issues/696)
  - Fixed styles for file drop when links are not allowed. [#645](https://github.com/blackbaud/skyux2/issues/645)
  - Fixed padding for tab close button. [#542](https://github.com/blackbaud/skyux2/issues/542)

# 2.0.0-beta.26 (2017-05-11)

  - Added appropriate loaders to work with new version of builder.

# 2.0.0-beta.25 (2017-05-10)

  - Updated broken npm packages.

# 2.0.0-beta.24 (2017-05-09)

  - Ensured mobile tabs respect disabled state. [#599](https://github.com/blackbaud/skyux2/issues/599)
  - Added file drop capabilities to avatar. [#525](https://github.com/blackbaud/skyux2/issues/525)
  - Ensured dropdowns close when any parent is scrolled. [#667](https://github.com/blackbaud/skyux2/issues/667)
  - Fixed documentation plunker examples on IE11. [#565](https://github.com/blackbaud/skyux2/issues/565)
  - Prevented unneeded scrollbars from appearing in grids. [#600](https://github.com/blackbaud/skyux2/issues/600)

# 2.0.0-beta.23 (2017-05-05)

  - Added accepted attribute for file input in file drop component. [#594](https://github.com/blackbaud/skyux2/issues/594)
  - Added the datepicker module. [#141](https://github.com/blackbaud/skyux2/issues/141)
  - Updated file drop component to reject empty file types when `acceptedTypes` attribute is specified. [#592](https://github.com/blackbaud/skyux2/issues/592)
  - Updated font size variables to match font sizes in SKY UX 1. [#537](https://github.com/blackbaud/skyux2/issues/537)

# 2.0.0-beta.22 (2017-04-29)

  - Added sanity checks for unsubscribes. (Thanks @Blackbaud-TrevorBurch)
  - Fixed bug around text-expand maxLength property. [#617](https://github.com/blackbaud/skyux2/issues/617) (Thanks @Blackbaud-TrevorBurch)
  - Added intelligent positioning and close on scroll to dropdown component. [#531](https://github.com/blackbaud/skyux2/issues/531)

# 2.0.0-beta.21 (2017-04-25)

  - Added documentation around entry components and modals.
  - Fixed problem around exporting SKY UX classes for AOT. [#607](https://github.com/blackbaud/skyux2/issues/607)

# 2.0.0-beta.20 (2017-04-24)

  - Fixed text expand AOT compilation. [#613](https://github.com/blackbaud/skyux2/issues/613) (Thanks @Blackbaud-JoshGerdes)
  - Fixed bug where lists did not display all entries when pagination was undefined. [#583](https://github.com/blackbaud/skyux2/issues/583)
  - Fixed bug where initial sort state for lists only accepted array. [#586](https://github.com/blackbaud/skyux2/issues/586)
  - Made card hide header when title existence changes. [#611](https://github.com/blackbaud/skyux2/issues/611)

# 2.0.0-beta.19 (2017-04-20)

  - Added documentation around unit testing modals. [#507](https://github.com/blackbaud/skyux2/issues/507)
  - Corrected spelling of `SkyModalConfiguration` class.
  - Updated file drop documentation to have correct input type. (Thanks @Blackbaud-JeffDye)

# 2.0.0-beta.18 (2017-04-13)

  - Made background for wait semi-transparent. [#545](https://github.com/blackbaud/skyux2/issues/545)
  - Handled modal overflow properly with IE11. [#564](https://github.com/blackbaud/skyux2/issues/564)
  - Made tabset dropdown handle overflow gracefully. [#505](https://github.com/blackbaud/skyux2/issues/505)
  - Made wait component hide absolutely positioned elements. [#546](https://github.com/blackbaud/skyux2/issues/546)
  - Made wait service work in ngOnInit. [#529](https://github.com/blackbaud/skyux2/issues/529)

# 2.0.0-beta.17 (2017-04-07)

  - Added the ability to use filters within lists. [#170](https://github.com/blackbaud/skyux2/issues/170)
  - Added documentation for styling components in builder. [#558](https://github.com/blackbaud/skyux2/issues/558)

# 2.0.0-beta.16 (2017-03-31)

  - Added correct cursor pointer styles for checkbox and radio inputs. [#502](https://github.com/blackbaud/skyux2/issues/502)
  - Updated dropdown styles to be consistent with sky-btn-default on hover. [#534](https://github.com/blackbaud/skyux2/issues/534)
  - Updated modal header padding to account for padding of close button. [#512](https://github.com/blackbaud/skyux2/issues/512)
  - Updated margin-left of sky-btn-link when it is the first child in the modal footer. [#512](https://github.com/blackbaud/skyux2/issues/512)
  - Updated the padding and border of modal header and footer to not display when those components are not included. [#512](https://github.com/blackbaud/skyux2/issues/512)

# 2.0.0-beta.15 (2017-03-29)

  - Fixed issues around blank and undefined text in text expand. (Thanks @Blackbaud-Trevor-Burch) [#524](https://github.com/blackbaud/skyux2/issues/524)
  - Added standalone components for filter button, filter summary, and inline filters. [#170](https://github.com/blackbaud/skyux2/issues/170)

# 2.0.0-beta.14 (2017-03-22)

  - Changed tabs to have `active` state on tabset level instead of individual tab. [#433](https://github.com/blackbaud/skyux2/issues/433)
  - Added the text expand component. (Thanks @Blackbaud-TrevorBurch) [#162](https://github.com/blackbaud/skyux2/issues/162)
  - Added additional documentation to README.
  - Added additional documentation around configuration options.
  - Added additional documentation around items in the template.
  - Added white background-color to dropdown buttons. (Thanks @Blackbaud-TrevorBurch) [#486](https://github.com/blackbaud/skyux2/issues/486)
  - Updated the default padding for modals. [#483](https://github.com/blackbaud/skyux2/issues/483)
  - Fixed documentation examples to use `indexOf` instead of a loop. (Thanks @Blackbaud-ScottFreeman)
  - Removed border for hover state of `btn-link-inline` class. [#488](https://github.com/blackbaud/skyux2/issues/488)

# 2.0.0-beta.13 (2017-03-13)

  - Added documentation for help configuration.
  - Updated action button for small screens. [#425](https://github.com/blackbaud/skyux2/issues/425)
  - Addressed bug in list-view-grid around loading columns. [#475](https://github.com/blackbaud/skyux2/issues/475)
  - Added zero margin to fullpage modal to fix visual issue on small screens. (Thanks @Blackbaud-JaminQuimby)

# 2.0.0-beta.12 (2017-03-09)

  - Added initial documentation around testing, serving, and host.
  - Added sorting support to sky-list and sky-list-toolbar. [#169](https://github.com/blackbaud/skyux2/issues/169)
  - Added sort integration to list headers. [#315](https://github.com/blackbaud/skyux2/issues/315)
  - Fixed typo in Learn documentation. (thanks @don-noonan)
  - Ensured that select change event for card is emitted properly. [#396](https://github.com/blackbaud/skyux2/issues/396)
  - Added a property to tab for header counts. (thanks @Blackbaud-AlexKingman) [#388](https://github.com/blackbaud/skyux2/issues/388)

# 2.0.0-beta.11 (2017-03-03)

  - Add a max-height to modal so that content overflows properly. [#361](https://github.com/blackbaud/skyux2/issues/361)
  - Documentation updates for getting started guide.
  - Added the error component. (thanks @Blackbaud-AdamHickey) [#156](https://github.com/blackbaud/skyux2/issues/156)
  - Added the standalone sort component. [#169](https://github.com/blackbaud/skyux2/issues/169)
  - Added the full screen modal option. [#160](https://github.com/blackbaud/skyux2/issues/160)

# 2.0.0-beta.10 (2017-02-28)

  - Added support for secondary action dropdown in list. [#313](https://github.com/blackbaud/skyux2/issues/313)
  - Added column chooser service and component that works with sky-list-view-grid. [#314](https://github.com/blackbaud/skyux2/issues/314)
  - Set action button icon default properties. [#382](https://github.com/blackbaud/skyux2/issues/382)
  - Add appropriate font-weight to modal header. (thanks @Blackbaud-TrevorBurch) [#389](https://github.com/blackbaud/skyux2/issues/389)
  - Update angular version to 2.4.8. [#386](https://github.com/blackbaud/skyux2/issues/386)

# 2.0.0-beta.9 (2017-02-22)

  - Add appropriate z-index for dropdown menu. [#355](https://github.com/blackbaud/skyux2/issues/355)
  - Remove unnecessary demo folder. [#364](https://github.com/blackbaud/skyux2/issues/364)
  - Add documentation around grid column template. [#349](https://github.com/blackbaud/skyux2/issues/349)
  - Fix plunkers for sky-list and add example of using Observables to change data in view. [#370](https://github.com/blackbaud/skyux2/issues/370)

# 2.0.0-beta.8 (2017-02-18)

  - Added appropriate styles for `sky-btn-default`, `sky-btn-link`, and `sky-btn-link-inline` classes. [#302](https://github.com/blackbaud/skyux2/issues/302)
  - Added getting started documentation to docs site.
  - Fixed stylesheets for plunker examples. [#352](https://github.com/blackbaud/skyux2/issues/352)
  - Added checklist view for `sky-list`. [#112](https://github.com/blackbaud/skyux2/issues/112)
  - Added documentation and example around data providers for `sky-list` [#340](https://github.com/blackbaud/skyux2/issues/340)
  - Added correct line height for card title. [#358](https://github.com/blackbaud/skyux2/issues/358)
  - Fixed z-index of search input in relation to page wait. [#353](https://github.com/blackbaud/skyux2/issues/353)
  - Allowed the use of dynamic columns in grids. [#339](https://github.com/blackbaud/skyux2/issues/339)
  - Fixed bug in `sky-list` in-memory data provider when search results return nothing and paging is activated.

# 2.0.0-beta.7 (2017-02-07)

  - Added styles for tile content section border. [#321](https://github.com/blackbaud/skyux2/issues/321)
  - Added correct overflow styles to card header area. [#323](https://github.com/blackbaud/skyux2/issues/323)
  - Added the list toolbar with search functionality. [#312](https://github.com/blackbaud/skyux2/issues/312)
  - Added the `isCollapsible` option to search component. [#337](https://github.com/blackbaud/skyux2/issues/337)
  - Updated the padding for tab buttons to use an even amount of padding. [#336](https://github.com/blackbaud/skyux2/issues/336)
  - Fixed bug around navbar item hit target. [#329](https://github.com/blackbaud/skyux2/issues/329)

# 2.0.0-beta.6 (2017-02-03)

  - Fixed bug in tile dashboard where SkyMediaQueryService was being destroyed. [#330](https://github.com/blackbaud/skyux2/issues/330)

# 2.0.0-beta.5 (2017-02-02)

  - Added list grid view for displaying a grid in a SKY list. [#171](https://github.com/blackbaud/skyux2/issues/171)
  - Added action button component to allow users to pick an action during a branching point in the system. [#319](https://github.com/blackbaud/skyux2/issues/319)
  - Added standalone toolbar component. [#326](https://github.com/blackbaud/skyux2/issues/326)
  - Updated Angular to 2.4.5 and updated various other NPM dependencies [#327](https://github.com/blackbaud/skyux2/issues/327)
  - Fixed bug where tiles were not properly rendered if hosted on a tile dashboard whose parent's change detection strategy was `OnPush`. [#324](https://github.com/blackbaud/skyux2/issues/324)


# 2.0.0-beta.4 (2017-01-27)

  - Added standalone grid component (thanks @blackbaud-brandonstirnaman and @blackbaud-joshgerdes). [#171](https://github.com/blackbaud/skyux2/issues/171)
  - Expose and document SkyMediaQueryService. [#288](https://github.com/blackbaud/skyux2/issues/288)
  - Updated skyux paths in component documentation. [#310](https://github.com/blackbaud/skyux2/issues/310)
  - Updated tile documentation to include entryComponent information. [#309](https://github.com/blackbaud/skyux2/issues/309)
  - Fixed modal margin issues in IE11. [#301](https://github.com/blackbaud/skyux2/issues/301)
  - Fixed plunkers for modal and tile documentation. [#307](https://github.com/blackbaud/skyux2/issues/307)

# 2.0.0-beta.3 (2017-01-17)

  - Added the alert role to the alert component. (Thanks @realistschuckle)
  - Added the aria-selected attribute to tab. (Thanks @realistschuckle)
  - Added the search component. [#168](https://github.com/blackbaud/skyux2/issues/168)
  - Added badges for npm and travis.

# 2.0.0-beta.2 (2017-01-11)

- Added ability to specify providers to tiles used in a tile dashboard [#285](https://github.com/blackbaud/skyux2/issues/285)
- Update Angular to 2.4.2 [#286](https://github.com/blackbaud/skyux2/issues/286)

# 2.0.0-beta.1 (2017-01-06)

- Added the `sky-` prefix for the button variant mixin.
- Added a dependency on [moment](https://github.com/moment/moment).
- Added a dependency on [microedge-rxstate](https://github.com/blackbaud/microedge-rxstate).
- Created the paging component for pagingation. [#140](https://github.com/blackbaud/skyux2/issues/140)
- Created the list-paging component for pagination in the context of a list (more list functionality coming soon, thanks @blackbaud-brandonstirnaman and @blackbaud-joshgerdes).
- Created the definition list component. [#274](https://github.com/blackbaud/skyux2/issues/274)
- Updated the media query service to work more like SKY UX 1 while using Observables. [#268](https://github.com/blackbaud/skyux2/issues/268)
- Use skyux-builder for documentation instead of sky-pages-out-skyux2.

# 2.0.0-beta.0 (2017-01-03)

- Adjusted npm package name to `@blackbaud/skyux`.  Please note this will require you to update your references.

# 2.0.0-alpha.14 (2016-12-19)

- Added wizard functionality to tabs module. [#165](https://github.com/blackbaud/skyux2/issues/165)
- Added wait component and wait service. [#164](https://github.com/blackbaud/skyux2/issues/164)
- Made modal instance injectable and added the save, cancel, and close methods.
- Fixed modal issue where background was scrollable when modals were open, and modals automatically scrolled to the top of the page when first opened. [#142](https://github.com/blackbaud/skyux2/issues/142)
- Fixed tabset issue where responsive behavior did not occur on initial load. [#183](https://github.com/blackbaud/skyux2/issues/183)
- Added the dispose method to modal service for testing purposes.

# 2.0.0-alpha.13 (2016-11-14)

- Added metadata files to dist to support AoT compilation. [#219](https://github.com/blackbaud/skyux2/issues/219)

# 2.0.0-alpha.12 (2016-11-04)

- Bundle SKY UX files using rollup and release in dist folder.

# 2.0.0-alpha.11 (2016-11-04)

- Import Font Awesome from SKY UX CSS so it doesn't need to be added by the host page
- Added ability to upload a file from the avatar component [#202](https://github.com/blackbaud/skyux2/issues/202)
- Upgraded to Angular 2.1.2

# 2.0.0-alpha.10 (2016-10-24)

- Updates to visual tests
- Fixed issue where page summary and tile dashboard on same page causes tile dashboard to not be responsive [#152](https://github.com/blackbaud/skyux2/issues/152)
- Added the radio component [#111](https://github.com/blackbaud/skyux2/issues/111)

# 2.0.0-alpha.9 (2016-10-18)

- Fixed issue where two tabsets on one page interfered with each other
- Escaped scss characters properly [#139](https://github.com/blackbaud/skyux2/issues/139), [#136](https://github.com/blackbaud/skyux2/issues/136)
- Upgraded to Angular 2.1.0
- Added the file attachments module [#109](https://github.com/blackbaud/skyux2/issues/109)

# 2.0.0-alpha.8 (2016-10-11)

- Fixed missing file reference [#132](https://github.com/blackbaud/skyux2/issues/132)

# 2.0.0-alpha.7 (2016-10-06)

- Fixed issue where the checked state of a checkbox was not properly reflected in the UI [#129](https://github.com/blackbaud/skyux2/issues/129)
- Added page summary component [#130](https://github.com/blackbaud/skyux2/issues/130)
- Upgraded to Angular 2.0.2 [#131](https://github.com/blackbaud/skyux2/issues/131)

# 2.0.0-alpha.6 (2016-09-28)

- Added basic navbar component
- Upgraded to Angular 2.0.1

# 2.0.0-alpha.5 (2016-09-21)

- Updated Angular 2 Dragula and other NPM packages [#123](https://github.com/blackbaud/skyux2/issues/123)
- Fixed an issue where code editors could not resolve type references after upgrading to TypeScript 2.0 [#121](https://github.com/blackbaud/skyux2/issues/121)

# 2.0.0-alpha.4 (2016-09-15)

- Updated to Angular 2 final release [#119](https://github.com/blackbaud/skyux2/issues/119)
- Fixed critical issue where alpha 3 did not contain the JavaScript files when installed via NPM [#118](https://github.com/blackbaud/skyux2/issues/118)

# 2.0.0-alpha.3 (2016-09-14)

- Updated to Angular 2 RC 7 [#115](https://github.com/blackbaud/skyux2/issues/115)
- Updated various other NPM packages [#108](https://github.com/blackbaud/skyux2/issues/108)

# 2.0.0-alpha.2 (2016-09-06)

- Added avatar component (sans upload capabilities)
- Updated to Angular 2 RC 6
- Fixed tile width issue when contents expanded past the width of the tile [#93](https://github.com/blackbaud/skyux2/issues/93)

# 2.0.0-alpha.1 (2016-08-19)

- Added type definition files to dist
- Updated to Angular 2 RC 5

# 2.0.0-alpha.0 (2016-08-01)

First alpha release.

# 2.0.0-pre-alpha.1 (2016-05-19)

No code changes.  Testing release process.

# 2.0.0-pre-alpha.0 (2016-05-18)

Initial release.
