# 2.0.0-beta.10 (2017-02-28)

  - Added support for secondary action dropdown in list. (#313)
  - Added column chooser service and component that works with sky-list-view-grid. (#314)
  - Set action button icon default properties. (#382)
  - Add appropriate font-weight to modal header. (#389)
  - Update angular version to 2.4.8. (#386)

# 2.0.0-beta.9 (2017-02-22)

  - Add appropriate z-index for dropdown menu. (#355)
  - Remove unnecessary demo folder. (#364)
  - Add documentation around grid column template. (#349)
  - Fix plunkers for sky-list and add example of using Observables to change data in view. (#370)

# 2.0.0-beta.8 (2017-02-18)

  - Added appropriate styles for `sky-btn-default`, `sky-btn-link`, and `sky-btn-link-inline` classes. (#302)
  - Added getting started documentation to docs site. 
  - Fixed stylesheets for plunker examples. (#352)
  - Added checklist view for `sky-list`. (#112)
  - Added documentation and example around data providers for `sky-list` (#340)
  - Added correct line height for card title. (#358)
  - Fixed z-index of search input in relation to page wait. (#353)
  - Allowed the use of dynamic columns in grids. (#339)
  - Fixed bug in `sky-list` in-memory data provider when search results return nothing and paging is activated.

# 2.0.0-beta.7 (2017-02-07)

  - Fixed bug around navbar item hit target. (#329)
  - Added styles for tile content section border. (#321)
  - Added correct overflow styles to card header area. (#323)
  - Updated the padding for tab buttons to use an even amount of padding. (#336)
  - Added the list toolbar with search functionality. (#312)
  - Added the `isCollapsible` option to search component. (#337) 

# 2.0.0-beta.6 (2017-02-03)

  - Fixed bug in tile dashboard where SkyMediaQueryService was being destroyed. (#330)

# 2.0.0-beta.5 (2017-02-02)

  - Added list grid view for displaying a grid in a SKY list. (#171)
  - Added action button component to allow users to pick an action during a branching point in the system. (#319)
  - Fixed bug where tiles were not properly rendered if hosted on a tile dashboard whose parent's change detection strategy was `OnPush`. (#324)
  - Added standalone toolbar component. (#326)
  - Updated Angular to 2.4.5 and updated various other NPM dependencies (#327)


# 2.0.0-beta.4 (2017-01-27)

  - Expose and document SkyMediaQueryService. (#288)
  - Fix plunkers for modal and tile documentation. (#307)
  - Updated skyux paths in component documentation. (#310)
  - Updated tile documentation to include entryComponent information. (#309)
  - Added standalone grid component (thanks @blackbaud-brandonstirnaman and @blackbaud-joshgerdes). (#171)
  - Fixed modal margin issues in IE11. (#301)

# 2.0.0-beta.3 (2017-01-17)

  - Added the alert role to the alert component. (Thanks @realistschuckle)
  - Added the aria-selected attribute to tab. (Thanks @realistschuckle)
  - Added the search component. (#168)
  - Added badges for npm and travis.

# 2.0.0-beta.2 (2017-01-11)

- Added ability to specify providers to tiles used in a tile dashboard (#285)
- Update Angular to 2.4.2 (#286)

# 2.0.0-beta.1 (2017-01-06)

- Use skyux-builder for documentation instead of sky-pages-out-skyux2.
- Created the paging component for pagingation. (#140)
- Created the list-paging component for pagination in the context of a list (more list functionality coming soon, thanks @blackbaud-brandonstirnaman and @blackbaud-joshgerdes). 
- Created the definition list component. (#274)
- Updated the media query service to work more like SKY UX 1 while using Observables. (#268)
- Added the sky- prefix for the button variant mixin.
- Added a dependency on [moment](https://github.com/moment/moment).
- Added a dependency on [microedge-rxstate](https://github.com/blackbaud/microedge-rxstate). 

# 2.0.0-beta.0 (2017-01-03)

- Adjusted npm package name to `@blackbaud/skyux`.  Please note this will require you to update your references.

# 2.0.0-alpha.14 (2016-12-19)

- Added wizard functionality to tabs module. (#165)
- Added wait component and wait service. (#164)
- Made modal instance injectable and added the save, cancel, and close methods.
- Fixed modal issue where background was scrollable when modals were open, and modals automatically scrolled to the top of the page when first opened. (#142)
- Fixed tabset issue where responsive behavior did not occur on initial load. (#183)
- Added the dispose method to modal service for testing purposes.

# 2.0.0-alpha.13 (2016-11-14)

- Added metadata files to dist to support AoT compilation. (#219)

# 2.0.0-alpha.12 (2016-11-04)

- Bundle SKY UX files using rollup and release in dist folder.

# 2.0.0-alpha.11 (2016-11-04)

- Import Font Awesome from SKY UX CSS so it doesn't need to be added by the host page
- Added ability to upload a file from the avatar component (#202)
- Upgraded to Angular 2.1.2

# 2.0.0-alpha.10 (2016-10-24)

- Updates to visual tests
- Fixed issue where page summary and tile dashboard on same page causes tile dashboard to not be responsive (#152)
- Added the radio component (#111)

# 2.0.0-alpha.9 (2016-10-18)

- Fixed issue where two tabsets on one page interfered with each other
- Escaped scss characters properly (#139, #136)
- Upgraded to Angular 2.1.0
- Added the file attachments module (#109)

# 2.0.0-alpha.8 (2016-10-11)

- Fixed missing file reference (#132)

# 2.0.0-alpha.7 (2016-10-06)

- Fixed issue where the checked state of a checkbox was not properly reflected in the UI (#129)
- Added page summary component (#130)
- Upgraded to Angular 2.0.2 (#131)

# 2.0.0-alpha.6 (2016-09-28)

- Added basic navbar component
- Upgraded to Angular 2.0.1

# 2.0.0-alpha.5 (2016-09-21)

- Fixed an issue where code editors could not resolve type references after upgrading to TypeScript 2.0 (#121)
- Updated Angular 2 Dragula and other NPM packages (#123) 

# 2.0.0-alpha.4 (2016-09-15)

- Updated to Angular 2 final release (#119)
- Fixed critical issue where alpha 3 did not contain the JavaScript files when installed via NPM (#118)

# 2.0.0-alpha.3 (2016-09-14)

- Updated to Angular 2 RC 7 (#115)
- Updated various other NPM packages (#108)

# 2.0.0-alpha.2 (2016-09-06)

- Updated to Angular 2 RC 6
- Added avatar component (sans upload capabilities)
- Fixed tile width issue when contents expanded past the width of the tile (#93)

# 2.0.0-alpha.1 (2016-08-19)

- Updated to Angular 2 RC 5
- Added type definition files to dist

# 2.0.0-alpha.0 (2016-08-01)

First alpha release.

# 2.0.0-pre-alpha.1 (2016-05-19)

No code changes.  Testing release process.

# 2.0.0-pre-alpha.0 (2016-05-18)

Initial release.
