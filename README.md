# WoltLabCompiler
A compiler for WoltLab-Package Archives and WoltLab-Package Components

## Installing WoltLabCompiler
`WoltLabCompiler` can be installed using the `npm`-cli:

```bash
npm install --save @manuth/woltlab-compiler
```

## Using WoltLabCompiler
The WoltLabCompiler allows you to compile WoltLab-Packages and WoltLab-Package components written in JavaScript.  
All classes and methods are documented using JSDoc-comments.

### Examples
***Compiling a .tar-Package***
```ts
import Path = require("path");
import { ACPOptionInstruction, ApplicationFileSystemInstruction, OptionType, Package, PackageCompiler } from "@manuth/woltlab-compiler";

(async () =>
{
    let compiler = new PackageCompiler(
        new Package(
            {
                Name: "MyPackage",
                DisplayName: {
                    inv: "My Package"
                },
                Identifier: "com.example.my-package",
                InstallSet: {
                    Directory: "install",
                    Instructions: [
                        new ApplicationFileSystemInstruction(
                            {
                                Application: "wcf",
                                Source: Path.join(__dirname, "..", "assets", "files", "wcf")
                            }),
                        new ACPOptionInstruction(
                            {
                                FileName: "acpOptions.xml",
                                Nodes: [
                                    {
                                        Name: "my-package",
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
                }
            }));

    compiler.DestinationPath = Path.join(__dirname, "..", "bin", "MyPackage.tar");
    await compiler.Execute();
})();
```

This creates a `.tar`-package called `MyPackage.tar`.

***Compiling a set of Localizations***
```ts
import Path = require("path");
import { LocalizationSetCompiler, TranslationInstruction } from "@manuth/woltlab-compiler";

(async () =>
{
    let compiler = new LocalizationSetCompiler(
        new TranslationInstruction(
            {
                FileName: null,
                Nodes: [
                    {
                        Name: "my",
                        Nodes: [
                            {
                                Name: "package",
                                Nodes: [
                                    {
                                        Name: "forms",
                                        Nodes: [
                                            {
                                                Name: "main",
                                                Nodes: [
                                                    {
                                                        Name: "title",
                                                        Item: {
                                                            Translations: {
                                                                de: "Haupt-Formular",
                                                                en: "Main Formular"
                                                            }
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }).GetMessages());

    compiler.DestinationPath = Path.join(__dirname, "..", "bin", "translations");
    await compiler.Execute();
})();
```

This will create a language file for each language in the `TranslationInstruction` (in this case `de` and `en`):
  - `translations/de.xml`
  - `translations/en.xml`

There are many more features, compilers and components you may want to work with.  
Have a look at the JSDoc-comments which are displayed automatically when working with an extended code-editor.
