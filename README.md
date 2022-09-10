# WoltLabCompiler
A compiler for generating WoltLab-Package `.tar` Archives and other WoltLab-Package Components

## Table of Contents
- [WoltLabCompiler](#woltlabcompiler)
  - [Table of Contents](#table-of-contents)
  - [About WoltLabCompiler](#about-woltlabcompiler)
  - [Installing WoltLabCompiler](#installing-woltlabcompiler)
  - [Using WoltLabCompiler](#using-woltlabcompiler)
    - [Quick Start](#quick-start)
    - [Core Concept](#core-concept)
      - [Package](#package)
      - [Instruction](#instruction)
      - [Compiler](#compiler)
      - [Localizations](#localizations)
    - [The Basics](#the-basics)
    - [Adding Instructions](#adding-instructions)
      - [Control Panel Settings](#control-panel-settings)
      - [Files and Templates](#files-and-templates)
      - [Themes](#themes)

## About WoltLabCompiler
Writing packages for WoltLab Suite Core ain't easy. Normally, you have to work yourself through a whole bunch of docs helping you to create an exhausting amount of repetitive `.xml`-files.

There are a few design limitations WoltLab packages are bound to:
  - The `.xml`-files mentioned before are quite redundant highly increasing the risk of doing typos
  - Options and emojis are strictly separated from their corresponding translations (such as the human readable name and description)
  - The `.tar`-archive has to be created manually
  - There is no such thing like error detection, you have to try to install your package in order to see whether you did any error

`WoltLabCompiler` is an attempt to try to fix these issues and make creating packages for WoltLab Suite Core easier and more accessible and understandable. It provides components for generating WoltLab packages or single components such as translation files, metadata files or themes. Furthermore, this package provides extensive documentation comments making editing packages easier.

In order to create this package, [WoltLab's official documentations](https://docs.woltlab.com/5.5/package/package-xml/#packagedescription) were used. You might want to have a look at it in case you're wondering how you were supposed to write packages originally.

## Installing WoltLabCompiler
`WoltLabCompiler` can be installed using the `npm`-cli:

```bash
npm install --save @manuth/woltlab-compiler
```

## Using WoltLabCompiler
Using WoltLabCompiler, you can create metadata representing your package's component and compile this metadata to a WoltLab package.

In order to get your package compiled following steps are necessary:
  - Setting up a compiler
  - Filling the compiler with metadata
  - Setting the path to write the output file to
  - Running the compiler
  - Profit!

Following piece of code creates a small package providing new dummy options for WoltLab's control panel:

```ts
import { join } from "node:path";
import { ACPOptionInstruction, InvariantCultureName, OptionType, Package, PackageCompiler } from "@manuth/woltlab-compiler";

(async () =>
{
    let compiler = new PackageCompiler(
        new Package(
            {
                Identifier: "com.example.my-package",
                DisplayName: {
                    [InvariantCultureName]: "My Package",
                    de: "Mein Paket"
                },
                Version: "0.0.1 Beta 1",
                InstallSet: {
                    Instructions: [
                        new ACPOptionInstruction(
                            {
                                FileName: "acpOptions.xml",
                                Nodes: [
                                    {
                                        Name: "my-package",
                                        Parent: {
                                            Name: "general"
                                        },
                                        Item: {
                                            DisplayName: {
                                                de: "Mein Paket",
                                                en: "My Package"
                                            },
                                            Options: [
                                                {
                                                    Name: "enabled",
                                                    DisplayName: {
                                                        de: "Aktiviert",
                                                        en: "Enabled"
                                                    },
                                                    Description: {
                                                        de: "Aktiviert `Mein Paket`",
                                                        en: "Enables `My Package`"
                                                    },
                                                    Type: OptionType.CheckBox
                                                }
                                            ]
                                        }
                                    }
                                ]
                            })
                    ]
                },
                ConflictingPackages: [
                    {
                        Identifier: "com.woltlab.wcf",
                        Version: "6.0.0 Alpha 1"
                    }
                ]
            }));

    compiler.DestinationPath = join("my-package.tar");
    await compiler.Execute();
})();
```

This will create a `.tar`-archive which is ready to install in WoltLab Suite Core.

The `.tar`-archive contains all the files which you originally would have had to write manually:
  - A `package.xml`-file containing the package's metadata
  - `de.xml` and `en.xml`-files containing the translated nodes (such as `DisplayName` and `Description`)
  - An `acpOptions.xml`-file containing the metadata of the options

### Quick Start
In order to get started as quickly as possible, you might want to create a ready-to-use workspace using Yeoman:

```bash
npm install --global yo @manuth/generator-wsc-package
yo @manuth/wsc-package
```

This tool will help you create basic code for easily creating a WoltLab package.

However, if you'd like to find out more on how WoltLabCompiler works, you might want to continue reading a little further.

### Core Concept
In order to use the WoltLabCompiler properly, it's important to get a grasp of its core concept.
Said core concept is explained briefly in the further paragraphs.

#### Package
A package is an extension which can be installed in WoltLab Suite Core's admin panel.

Packages consist of metadata and a set of instructions which are executed during the installation.
Furthermore, packages can provide instruction-sets for updating the package from a specific version.

#### Instruction
An instruction is a step which is executed while installing or updating a package.

#### Compiler
Compilers provided by `WoltLabCompiler` are components for generating files.
To name a few, there is a compiler which generates a directory containing language files, there is a compiler for generating the package's metadata (`package.xml`), a compiler for generating the options-file etc.

The only compiler you might ever be using might be the `PackageCompiler` for generating a WoltLab package or the `ThemeCompiler` for compiling WoltLab themes.

However, you can even generate individual files in case you want to take care of creating the `.tar` file yourself:

```ts
import { join } from "node:path";
import { ACPOptionFileCompiler, ACPOptionInstruction } from "@manuth/woltlab-compiler";

(async () =>
{
    let compiler = new ACPOptionFileCompiler(
        new ACPOptionInstruction(
            {
                FileName: "acpOption.xml",
                Nodes: [
                    {
                        Name: "example",
                        Parent: {
                            Name: "general"
                        }
                    }
                ]
            }));

    compiler.DestinationPath = join(compiler.Item.FileName);
    await compiler.Execute();
})();
```

#### Localizations
Some of the metadata, such as descriptions, is localizable.
You can provide localizations using an object-hash with a key for each locale and its corresponding translation:

```ts
let localization = {
    en: "Main Form",
    de: "Hauptformular"
}
```

In some rare cases you can provide a fallback value which will be shown if the translation isn't available in WoltLab's configured language:

```ts
import { InvariantCultureName } from "@manuth/woltlab-compiler";

let localization = {
    [InvariantCultureName]: "Main Form",
    en: "Main Form",
    de: "Hauptformular"
}
```

Please notice, that providing a fallback value most commonly isn't possible due to WoltLab's specifications.

### The Basics
With the previously mentioned core concept in mind, the first thing you might want to do is creating a piece of code for creating a dummy package:

```ts
import { join } from "node:path";
import { Package, PackageCompiler } from "@manuth/woltlab-compiler";

(async () =>
{
    let compiler = new PackageCompiler(
        new Package(
            {
                Identifier: "MyPackage",
                DisplayName: {
                    [InvariantCultureName]: "My Package"
                },
                Version: "0.0.1 Alpha 1",
                InstallSet: {
                    Instructions: []
                }
            }));

    compiler.DestinationPath = join("my-package.tar");
})();
```

### Adding Instructions
All that's left to do is adding instructions to the installation- and update-queue in order to add some functionality to your package.

Commonly, instructions accept a `FileName`-property which allows you to specify the name of the file which ends up in the resulting package's `.tar` archive.

This chapter provides a brief overview of the most important available instructions.

#### Control Panel Settings
The `ACPOptionInstruction` allows you to add options to the administration control panel.

The constructor accepts a single argument containing metadata for the options.

The most important properties are listed here:
  - `FileName`:  
    The name of the file to add to the `.tar`-archive
  - `Nodes`:  
    The categories to provide. Each have following options:
    - `Name`:  
      The name of the category. This name is used to identify the category.
    - `Parent`:  
      Information about a pre-existing parent category
    - `Nodes`:  
      A set of sub-categories
    - `Item`:  
      The metadata of the category:
      - `DisplayName`:  
        The human-readable name of the category. This option is localizable.
      - `Description`:  
        The description of the category. This option is localizable.
      - `Options`:  
        The options of the category.

Example:
```ts
import { ACPOptionInstruction, OptionType } from "@manuth/woltlab-compiler";

new ACPOptionInstruction(
    {
        FileName: "acpOptions.xml",
        Nodes: [
            {
                Name: "example",
                Parent: {
                    Name: "general"
                },
                Item: {
                    DisplayName: {
                        en: "This is an example",
                        de: "Das ist ein Beispiel"
                    },
                    Options: [
                        {
                            Name: "enabled",
                            DisplayName: {
                                en: "Enabled",
                                de: "Aktiviert"
                            },
                            Type: OptionType.CheckBox
                        }
                    ]
                }
            }
        ]
    });
```

> ***Note:***  
> In most cases, you might want to add your categories and options to an already existing category.
> In order to do so you **must** pass it's name to the `Parent` property.
>
> The example shown previously adds the category `example` (and all its options and sub-categories) to an already existing category named `general`.

#### Files and Templates
In most cases you might want to add a few templates and files to the packages which are uploaded to WoltLab Suite Core during the installation.

The `ApplicationFileSystemInstruction` allows you to upload files while the `ACPTemplateInstruction` and the `TemplateInstruction` allow you to upload templates for the admin control panel or the frontend.

All instructions mentioned before are used in the same manner and thus accept the same properties:
  - `FileName`:  
    The name of the file to compress and save the files to. If this property is omitted, a default filename will be used based on the specified `Application` and/or the `Source` properties.
  - `Application`:  
    The abbreviated name of the application to upload the files/templates to (e.g. `wbb`, `gallery`, `wcf` etc.). If you omit this property, WoltLab Suite Core will determine an application to upload the files/templates to automatically. Please refer to [WoltLab's docs](https://docs.woltlab.com/5.4/package/pip/acp-template/#application).
  - `Source`:  
    The path to the directory to load the files/templates from.

***Example:***

```ts
import { join } from "node:path";
import { ACPTemplateInstruction, TemplateInstruction, ApplicationFileSystemInstruction } from "@manuth/woltlab-compiler";

new ACPTemplateInstruction(
    {
        FileName: "acpTemplates.tar",
        Application: "wcf",
        Source: join("..", "assets", "acpTemplates")
    });

new TemplateInstruction(
    {
        Application: "wcf",
        Source: join("..", "assets", "templates")
    });

new ApplicationFileSystemInstruction(
    {
        Source: join("..", "assets", "files")
    });
```

> ***Note:***  
> In some rare cases - especially when writing PHP files - you might want to have a few parts of your files replaced with metadata from your package. This might especially be useful if you're accessing ACP options from your PHP scripts and you're likely to rename these options at some point.
>
> The `SelfContainedPHPInstruction`, `ACPTemplateInstruction`, `TemplateInstruction`, `ApplicationFileSystemInstruction` and `SQLInstruction` preprocess the specified files using [ejs](https://ejs.co/).
>
> You can access the instruction's metadata using `<%= Item %>` or add an `ID` to your most important components and access them in ejs-snippets using `<%= $("MyID") %>`.
>
> > ***Example:***  
> > **index.ts:**
> > <p>
> > <details>
> > <summary>Show Verbose Code</summary>
> >
> > ```ts
> > import { join } from "node:path";
> > import { ACPOptionInstruction, ApplicationFileSystemInstruction, Package, PackageCompiler, TemplateInstruction } from "@manuth/woltlab-compiler";
> > (async () =>
> > {
> >     let compiler = new PackageCompiler(
> >         new Package(
> >             {
> >                 Identifier: "com.example.test",
> >                 DisplayName: {
> >                     [InvariantCultureName]: "My Test Package"
> >                 },
> >                 InstallSet: {
> >                     Instructions: [
> >                         new ACPOptionInstruction(
> >                             {
> >                                 ID: "ExampleCategory",
> >                                 Name: "example",
> >                                 Parent: {
> >                                     Name: "general"
> >                                 },
> >                                 Item: {
> >                                     DisplayName: {
> >                                         en: "Example Category"
> >                                     }
> >                                     Options: [
> >                                         {
> >                                             ID: "ExampleEnabledOption",
> >                                             Name: "example_enabled",
> >                                             DisplayName: {
> >                                                 en: "Enabled"
> >                                             }
> >                                         }
> >                                     ]
> >                                 }
> >                             }),
> >                         new TemplateInstruction(
> >                             {
> >                                 Source: join("templates")
> >                             }),
> >                         new ApplicationFileSystemInstruction(
> >                             {
> >                                 Source: join("files")
> >                             })
> >                     ]
> >                 }
> >             }));
> >     compiler.DestinationPath = join("test.tar");
> >     await compiler.Execute();
> > })();
> > ```
> > 
> > </details>
> > </p>
> >
> > ***./templates/example.tpl***
> > ```html
> > <p>
> >     Please enable the "{lang}wcf.acp.option.<%= $("ExampleEnabledOption").Name %>{/lang}" option in the "{lang}wcf.acp.option.category.<%= $("ExampleCategory").FullName %>{/lang}" in order to use <%= Item.Package.DisplayName["inv"] %>.
> > </p>
> > ```
> >
> > ***Output:***
> > ```html
> > <p>
> >     Please enable the "{lang}wcf.acp.option.enabled{/lang}" option in the "{lang}wcf.acp.option.category.general.my-package{/lang}" in order to use My Package.
> > </p>
> > ```
> >
> > ***./files/example.php***
> > ```php
> > <?php
> >
> > namespace wcf\system\option\example;
> > {
> >     /**
> >      * Handles options related to My Test Package.
> >      */
> >     class OptionHandler extends \wcf\system\option\OptionHandler
> >     {
> >         /**
> >          * @inheritDoc
> >          */
> >         public function validate()
> >         {
> >             $errors = parent::validate();
> >
> >             if ($this->getOption("<%= $('ExampleEnabledOption').Name %>")["value"] === 1)
> >             {
> >                 // My Validation Code
> >             }
> >         }
> >     }
> > }
> > ?>
> > ```
> >
> > ***Output:***
> > ```php
> > // [...]
> >             if ($this->getOption("example_enabled")["value"] === 1)
> >             {
> >                 // [...]
> >             }
> > // [...]
> > ```

#### Themes
One more goal of `WoltLabCompiler` is to make creating themes easier. Instead of declaring scss-variables in an `.xml`-file, said variables can now be written in plain `.scss`.

The `ThemeInstruction` accepts an object-hash containing the following properties:
  - `Theme`:  
    Provides the theme's metadata:
    - `FileName`:  
      The name of the `.tar`-archive containing the theme which will be added to your package's `.tar`. If this option is omitted, the filename will be determined according to the specified `Name`.
    - `Name`:  
      The name of the theme which is used for determining the `FileName`
    - `DisplayName`:  
      The human-readable name of the theme. This option is localizable and accepts a fallback value using the `InvariantCultureName`.
    - `Thumbnail`, `HighResThumbnail`, `CoverPhoto`:  
      Declares the location of miscellaneous theme assets.
      - `Source`: The path to load the asset from
      - `FileName`: The name the file should have inside the theme's `.tar`-file
    - `Images`:  
      Declares the location of the pictures provided by the theme.
      - `Source`: The path to the directory to load the pictures from.
      - `DestinationRoot`: The name of the directory on the webserver to upload the pictures to
      - `FileName`: The name the picture-archive should have inside the theme's `.tar`
    - `Variables`:  
      A set of the theme's `.scss`-variables and their corresponding values. Unknown variables will end up in WoltLab's `scssOverride` theme-variable.
    - `CustomScssFileName`:  
      The path to a `.scss`-file which contains the theme's `scss`-code. The code of the specified file will end up in WoltLab's `individualScss` theme variable.
    - `ScssOverrideFileName`:  
      If you prefer managing your theme-variables in a `.scss`-file rather than the `Variables`-property, you can specify the path to a `.scss`-file which contains theme-variables. Unknown variables will end up in WoltLab's `scssOverride` theme-variable.
    - `VariableFileName`:  
      In case you prefer to manage your theme-variables in a `.json` file rather than the `Variables`-property, you can specify the path to a `.json`-file which provides a set of variable-names and their corresponding values. Unknown variables will end up in WoltLab's `scssOverride` theme-variable.

The priorities of the variables are as followed:
  1. Variable-file (as specified per `VariableFileName`)
  2. The `.scss`-overrides (as specified per `ScssOverrideFileName`)
  3. The plain variables specified using the `Variables`-properties

> ***Example:***
> <p>
> <details>
> <summary>Show Verbose Code</summary>
>
> ***index.ts***
> ```ts
> import { join } from "node:path";
> import { Package, PackageCompiler } from "@manuth/woltlab-compiler";
>
> (async () =>
> {
>     let compiler = new PackageCompiler(
>         new Package(
>             {
>                 Identifier: "com.example.my-theme",
>                 DisplayName: {
>                     [InvariantCultureName]: "My Theme"
>                 },
>                 Version: "0.0.1 Beta 1",
>                 InstallSet: {
>                     Instructions: [
>                         new ThemeInstruction(
>                             {
>                                 Theme: {
>                                     Name: "my-theme",
>                                     DisplayName: {
>                                         [InvariantCultureName]: "My Theme"
>                                     },
>                                     CoverPhoto: join("cover.jpg"), // Loads the picture from ./cover.jpg
>                                     Thumbnail: join("thumbnail.png"), // Loads the thumbnail from ./thumbnail.png
>                                     HighResThumbnail: join("hq-thumbnail.png"), // Loads the hq thumbnail from ./hq-thumbnail.png
>                                     Variables: {
>                                         wcfFontSizeDefault: "1px"
>                                     },
>                                     CustomScssFileName: join("style.scss"), // Loads the custom scss code from ./style.scss
>                                     ScssOverrideFileName: join("overrides.scss"), // Loads variables from ./overrides.scss
>                                     VariableFileName: join("variables.json"),
>                                     Images: {
>                                         Source: join("images") // Loads the images from ./images
>                                     }
>                                 }
>                             })
>                     ]
>                 }
>             }));
> })();
> ```
>
> ***./style.scss***
> ```scss
> :root {
>     background: red;
> }
> ```
>
> ***./overrides.scss***
> ```scss
> $wcfHeaderBackground: green;
> ```
>
> ***./variables.json***
> ```json
> {
>     "wcfLayoutMinWidth": "2000px"
> }
> ```
>
> </details>
> </p>

There are many more features, compilers and components you may want to work with.  
Have a look at the JSDoc-comments which are displayed automatically when working with an extended code-editor.
