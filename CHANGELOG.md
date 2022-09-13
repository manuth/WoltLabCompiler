# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## WoltLabCompiler [Unreleased]
### Removed
  - The `Version`-fallback of the `Theme` class

[Show differences](https://github.com/manuth/WoltLabCompiler/compare/v4.0.2...dev)

## WoltLabCompiler v4.0.2
### Fixed
  - Broken `EventListenerInstructionCompiler` causing that no event-listener files are being created

[Show differences](https://github.com/manuth/WoltLabCompiler/compare/v4.0.1...v4.0.2)

## WoltLabCompiler v4.0.1
### Updated
  - The `Theme` class to fall back to the `Package`s version if no version has been specified
  - The `ThemeFileCompiler` to not include the `version`-tag in the resulting `.xml`-code if neither a `Theme`- nor a `Package`-version is specified
  - All dependencies

[Show differences](https://github.com/manuth/WoltLabCompiler/compare/v4.0.0...v4.0.1)

## WoltLabCompiler v4.0.0
### Breaking
  - Converted to package to `ESModule`

[Show differences](https://github.com/manuth/WoltLabCompiler/compare/v3.0.1...v4.0.0)

## WoltLabCompiler v3.0.1
### Updated
  - All dependencies
  - Drone CI settings to ensure the package is published properly

[Show differences](https://github.com/manuth/WoltLabCompiler/compare/v3.0.0...v3.0.1)

## WoltLabCompiler v3.0.0
### Updated
  - The type-declarations for enforcing the correct format of version numbers
  - The interpretation of `.scss`-variables

### Added
  - A `Package`-property to the `Instruction`-class for receiving the package of the `Instruction`

### Removed
   - Support for substituting contents of `.xml`-files using ejs
   - The `Name` property from the `Package` class

[Show differences](https://github.com/manuth/WoltLabCompiler/compare/v2.1.9...v3.0.0)

## WoltLabCompiler v2.1.9
### Fixed
  - Broken `ThemeCompiler`  
    So far, the theme-compiler wouldn't at images as specified in the `Theme`-settings. This issue is now fixed.

### Updated
  - The `PackageCompiler` to add a `<void>`-tag in empty instruction-sets  
    According to WoltLab's docs, this is useful for if you'd like to update nothing but the package's metadata. Check out [WoltLab's docs](https://docs.woltlab.com/5.4/package/package-xml/#void) for further information.

### Removed
  - The creation of the `<api>`-tag inside the `package.xml`-file  
    If you still want to have an `<api>`-tag inside your `package.xml`-file, you might want to pass the `APIVersion` to the package. However, please note that the use of the `<api>`-tag is deprecated according to [WoltLab's docs](https://docs.woltlab.com/5.4/package/package-xml/#compatibility)

[Show differences](https://github.com/manuth/WoltLabCompiler/compare/v2.1.8...v2.1.9)

## WoltLabCompiler v2.1.8
### Fixed
  - Compatibility issues of localizations with newer WoltLab Suite Core versions (see issue [#227](https://github.com/manuth/WoltLabCompiler/issues/227))

[Show differences](https://github.com/manuth/WoltLabCompiler/compare/v2.1.7...v2.1.8)

## WoltLabCompiler v2.1.7
### Fixed
  - Error causing translation byproducts to have an incorrect `type` attribute value in the `package.xml` file
  - Type declarations to make specifying a `Package`s `Version` **mandatory**
  - Error causing descriptions of options to not appear in language files
  - Broken `OptionInstruction` file creation
  - Broken creation of language files
  - Vulnerabilities in dependencies

### Added
  - The functionality to customize the translation directory of `ACPOption`-, `GroupOption`- and `OptionInstructions`

### Updated
  - All dependencies

[Show differences](https://github.com/manuth/WoltLabCompiler/compare/v2.1.6...v2.1.7)

## WoltLabCompiler v2.1.6
### Fixed
  - Vulnerabilities in dependencies

### Updated
  - All dependencies
  - Linting environment

[Show differences](https://github.com/manuth/WoltLabCompiler/compare/v2.1.5...v2.1.6)

## WoltLabCompiler v2.1.5
### Added
  - Missing exports to the package

### Updated
  - All dependencies

[Show differences](https://github.com/manuth/WoltLabCompiler/compare/v2.1.4...v2.1.5)

## WoltLabCompiler v2.1.4
### Fixed
  - Broken package by adding a reference to the `DOM`-library

[Show differences](https://github.com/manuth/WoltLabCompiler/compare/v2.1.3...v2.1.4)

## WoltLabCompiler v2.1.3
### Fixed
  - Vulnerabilities in dependencies
  - Broken release-notes script

### Added
  - Support for parallel step-execution in drone-pipelines
  - Support for the Test Explorer UI
  - Support for the `ts-nameof` plugin

### Updated
  - All dependencies

[Show differences](https://github.com/manuth/WoltLabCompiler/compare/v2.1.2...v2.1.3)

## WoltLabCompiler v2.1.2
### Updated
  - Code to set a default directory for `UpdateInstructionSet`s
  - The jsdoc-comments

### Added
  - New tests reflecting the changes

[Show differences](https://github.com/manuth/WoltLabCompiler/compare/v2.1.1...v2.1.2)

## WoltLabCompiler v2.1.1
### Fixed
  - Broken `PackageCompiler`

### Added
  - New tests
  - `@link`s to jsdoc-comments
  - Missing `@template`-comments

### Updated
  - All dependencies

[Show differences](https://github.com/manuth/WoltLabCompiler/compare/v2.1.0...v2.1.1)

## WoltLabCompiler v2.1.0
### Fixed
  - Vulnerabilities in dependencies

### Added
  - A reference to the `DOM`-library

### Updated
  - Package to replace `get-sass-vars.d.ts` with `@types/get-sass-vars`
  - All dependencies

[Show differences](https://github.com/manuth/WoltLabCompiler/compare/v2.0.1...v2.1.0)

## WoltLabCompiler v2.0.1
### Updated
  - The `README`-file

[Show differences](https://github.com/manuth/WoltLabCompiler/compare/v2.0.0...v2.0.1)

## WoltLabCompiler v2.0.0
### Breaking
  - Removed the `ThemeInstructionCollection`-class  
    Use multiple `ThemeInstruction`-instances instead

### Fixed
  - Broken drone-pipeline
  - Drone-pipeline for multi-digit version-numbers
  - Modern `node`-version support by replacing `sass-variable-parser` with `get-sass-vars`
  - Vulnerabilities in dependencies

### Added
  - A workflow for analyzing source-code
  - A workflow for automatically merging Dependabot-PRs
  - Separate class for loading themes asynchronously

### Updated
  - Drone-pipeline to use smaller docker-images
  - All dependencies
  - `Theme`-class to store variables in a `Map`

[Show differences](https://github.com/manuth/WoltLabCompiler/compare/v1.1.1...v2.0.0)

## WoltLabCompiler v1.1.1
### Fixed
  - Broken dependabot-settings
  - Vulnerabilities

### Updated
  - All dependencies

[Show differences](https://github.com/manuth/WoltLabCompiler/compare/v1.1.0...v1.1.1)

## WoltLabCompiler v1.1.0
### Breaking
  - Renamed the package to `@manuth/woltlab-compiler`
### Fixed
  - Broken `BidirectionalCollection`

### Added
  - An `All`-permission for user-options

### Updated
  - All dependencies
  - The development-environment
  - The directory structure
  - The tests

[Show differences](https://github.com/manuth/WoltLabCompiler/compare/v1.0.4...v1.1.0)

## WoltLabCompiler v1.0.4
  - Fix all vulnerabilities
  - Update all dependencies

[Show differences](https://github.com/manuth/WoltLabCompiler/compare/v1.0.3...v1.0.4)

## WoltLabCompiler v1.0.3
  - Improved the stability

[Show differences](https://github.com/manuth/WoltLabCompiler/compare/v1.0.2...v1.0.3)

## WoltLabCompiler v1.0.2
  - Improved the stability

[Show differences](https://github.com/manuth/WoltLabCompiler/compare/v1.0.1...v1.0.2)

## WoltLabCompiler v1.0.1
  - Beautified the test-descriptions of mocha-tests

[Show differences](https://github.com/manuth/WoltLabCompiler/compare/v1.0.0...v1.0.1)

## WoltLabCompiler v1.0.0
  - First release of the module

[Show differences](https://github.com/manuth/WoltLabCompiler/compare/da86209660fe5bf880a685d7b4c1c335dd6796f4...v1.0.0)
