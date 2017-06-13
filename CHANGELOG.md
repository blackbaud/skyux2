# 2.0.0-beta.30 (2017-06-07)
  - Fixed bug when modal service injected into ngIf block. (#744)
  - Added locale date format as default to datepicker. (#732) (Thanks @Blackbaud-JoshGerdes)
  - Added error modal to avatar when image upload fails (#204) (Thanks @Blackbaud-AdamHickey)
  - Ensure list moves to first page after search is executed. (#706)
  - Added checkbox to repeater component. (#278) (Thanks @Blackbaud-AdamHickey)
  - Ensure fixed columns not appear in the column chooser for list. (#660) 


# 2.0.0-beta.29 (2017-05-24)

  - Added the error modal service. (Thanks @Blackbaud-AdamHickey)

# 2.0.0-beta.28 (2017-05-17)

  - Added the timepicker component. (Thanks @Blackbaud-JaminQuimby)

# 2.0.0-beta.27 (2017-05-16)

  - Added proper nesting for `getData` in grids. (Thanks @Blackbaud-TrevorBurch)
  - Updated styles for full page modal header. (#548)
  - Ensured component wait mask appears behind modal. (#637)
  - Fixed padding for tab close button. (#542)
  - Fixed styles for file drop when links are not allowed. (#645)
  - Added space between modal footer buttons and added cancel button to wizard demo. (#541)
  - Updated styles for placeholder text for inputs. (#538)
  - Fixed bug around search and paging for lists. (#696)
  - Updated disabled and hover styles for paging. (#539)
  - Added documentation around editing skyuxconfig. (#700)
  - Updated border and striped background for grids. (#536)
  - Updated text color for body. (#533)

# 2.0.0-beta.26 (2017-05-11)

  - Added appropriate loaders to work with new version of builder.

# 2.0.0-beta.25 (2017-05-10)

  - Updated broken npm packages.

# 2.0.0-beta.24 (2017-05-09)

  - Ensured mobile tabs respect disabled state. (#599)
  - Added file drop capabilities to avatar. (#525)
  - Ensured dropdowns close when any parent is scrolled. (#667)
  - Fixed documentation plunker examples on IE11. (#565)
  - Prevented unneeded scrollbars from appearing in grids. (#600)

# 2.0.0-beta.23 (2017-05-05)

  - Added accepted attribute for file input in file drop component. (#594)
  - Made file drop component reject empty file types when `acceptedTypes` attribute is specified. (#592)
  - Updated font size variables to match font sizes in SKY UX 1. (#537)
  - Added the datepicker module. (#141)

# 2.0.0-beta.22 (2017-04-29)

  - Added sanity checks for unsubscribes. (Thanks @Blackbaud-TrevorBurch)
  - Fixed bug around text-expand maxLength property. (#617) (Thanks @Blackbaud-TrevorBurch)
  - Added intelligent positioning and close on scroll to dropdown component. (#531)

# 2.0.0-beta.21 (2017-04-25)

  - Added documentation around entry components and modals.
  - Fixed problem around exporting SKY UX classes for AOT. (#607)

# 2.0.0-beta.20 (2017-04-24)
  
  - Fixed text expand AOT compilation. (#613) (Thanks @Blackbaud-JoshGerdes)
  - Fixed bug where lists did not display all entries when pagination was undefined. (#583)
  - Fixed bug where initial sort state for lists only accepted array. (#586)
  - Made card hide header when title existence changes. (#611)

# 2.0.0-beta.19 (2017-04-20)

  - Added documentation around unit testing modals. (#507)
  - Corrected spelling of `SkyModalConfiguration` class.
  - Updated file drop documentation to have correct input type. (Thanks @Blackbaud-JeffDye)

# 2.0.0-beta.18 (2017-04-13)

  - Made background for wait semi-transparent. (#545)
  - Handled modal overflow properly with IE11. (#564)
  - Made tabset dropdown handle overflow gracefully. (#505)
  - Made wait component hide absolutely positioned elements. (#546)
  - Made wait service work in ngOnInit. (#529)

# 2.0.0-beta.17 (2017-04-07)

  - Added the ability to use filters within lists. (#170)
  - Added documentation for styling components in builder. (#558)

# 2.0.0-beta.16 (2017-03-31)

  - Updated dropdown styles to be consistent with sky-btn-default on hover. (#534)
  - Updated modal header padding to account for padding of close button. (#512)
  - Updated margin-left of sky-btn-link when it is the first child in the modal footer. (#512)
  - Updated the padding and border of modal header and footer to not display when those components are not included. (#512)
  - Added correct cursor pointer styles for checkbox and radio inputs. (#502)

# 2.0.0-beta.15 (2017-03-29)

  - Fixed issues around blank and undefined text in text expand. (Thanks @Blackbaud-Trevor-Burch) (#524)
  - Added standalone components for filter button, filter summary, and inline filters. (#170)

# 2.0.0-beta.14 (2017-03-22)

  - Changed tabs to have `active` state on tabset level instead of individual tab. (#433)
  - Added the text expand component. (Thanks @Blackbaud-TrevorBurch) (#162)
  - Added additional documentation to README.
  - Added additional documentation around configuration options.
  - Added additional documentation around items in the template.
  - Added white background-color to dropdown buttons. (Thanks @Blackbaud-TrevorBurch) (#486)
  - Fixed documentation examples to use `indexOf` instead of a loop. (Thanks @Blackbaud-ScottFreeman) 
  - Updated the default padding for modals. (#483)
  - Removed border for hover state of `btn-link-inline` class. (#488)

# 2.0.0-beta.13 (2017-03-13)

  - Added documentation for help configuration.
  - Updated action button for small screens. (#425)
  - Addressed bug in list-view-grid around loading columns. (#475)
  - Added zero margin to fullpage modal to fix visual issue on small screens. (Thanks @Blackbaud-JaminQuimby)

# 2.0.0-beta.12 (2017-03-09)

  - Added initial documentation around testing, serving, and host.
  - Added sorting support to sky-list and sky-list-toolbar. (#169)
  - Added sort integration to list headers. (#315) 
  - Fixed typo in Learn documentation. (thanks @don-noonan)
  - Ensured that select change event for card is emitted properly. (#396)
  - Added a property to tab for header counts. (thanks @Blackbaud-AlexKingman) (#388)

# 2.0.0-beta.11 (2017-03-03)

  - Add a max-height to modal so that content overflows properly. (#361)
  - Documentation updates for getting started guide.
  - Added the error component. (thanks @Blackbaud-AdamHickey) (#156)
  - Added the standalone sort component. (#169)
  - Added the full screen modal option. (#160)

# 2.0.0-beta.10 (2017-02-28)

  - Added support for secondary action dropdown in list. (#313)
  - Added column chooser service and component that works with sky-list-view-grid. (#314)
  - Set action button icon default properties. (#382)
  - Add appropriate font-weight to modal header. (thanks @Blackbaud-TrevorBurch) (#389)
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
