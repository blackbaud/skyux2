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
