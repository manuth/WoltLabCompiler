# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## WoltLabCompiler [Unreleased]

[Show differences](https://github.com/manuth/WoltLabCompiler/compare/v2.1.6...dev)

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
