import { strictEqual } from "assert";
import { readFile } from "fs-extra";
import { TempFile } from "temp-filesystem";
import { join } from "upath";
import { DOMParser } from "xmldom";
import { PackageFileCompiler } from "../../../Compilation/PackageSystem/PackageFileCompiler";
import { ILocalization } from "../../../Globalization/ILocalization";
import { IConflictingPackageDescriptorOptions } from "../../../PackageSystem/IConflictingPackageDescriptorOptions";
import { BBCodeInstruction } from "../../../PackageSystem/Instructions/Customization/BBCodeInstruction";
import { TemplateListenerInstruction } from "../../../PackageSystem/Instructions/Events/TemplateListenerInstruction";
import { TranslationInstruction } from "../../../PackageSystem/Instructions/Globalization/TranslationInstruction";
import { IInstructionSetOptions } from "../../../PackageSystem/Instructions/IInstructionSetOptions";
import { IUpdateInstructionSetOptions } from "../../../PackageSystem/Instructions/IUpdateInstructionSetOptions";
import { CronJobInstruction } from "../../../PackageSystem/Instructions/Tasks/CronJobInstruction";
import { IPackageFileDescriptorOptions } from "../../../PackageSystem/IPackageFileDescriptorOptions";
import { IRequiredPackageDescriptorOptions } from "../../../PackageSystem/IRequiredPackageDescriptorOptions";
import { Package } from "../../../PackageSystem/Package";
import { XMLEditor } from "../../../Serialization/XMLEditor";
import { TimePeriod } from "../../../Tasks/TimePeriod";

/**
 * Registers tests for the `PackageFileCompiler` class.
 */
export function PackageFileCompilerTests(): void
{
    suite(
        "PackageFileCompiler",
        () =>
        {
            let tempFile: TempFile;
            let compiler: PackageFileCompiler;
            let identifier: string;
            let locale: string;
            let localizedName: string;
            let invariantName: string;
            let localizedDescription: string;
            let invariantDescription: string;
            let version: string;
            let date: Date;
            let author: string;
            let homePage: string;
            let requiredPackages: IRequiredPackageDescriptorOptions[];
            let conflictingPackages: IConflictingPackageDescriptorOptions[];
            let optionalPackages: Array<Required<IPackageFileDescriptorOptions>>;
            let installSet: IInstructionSetOptions;
            let updateSets: IUpdateInstructionSetOptions[];

            suiteSetup(
                () =>
                {
                    tempFile = new TempFile();
                    identifier = "com.example.mypackage";
                    locale = "de";
                    localizedName = "Mein Paket";
                    invariantName = "My Package";
                    localizedDescription = "Das ist ein Test";
                    invariantDescription = "This is a test";
                    version = "2.0 Beta 3";
                    date = new Date("2001-03-04");
                    author = "John Doe";
                    homePage = "https://example.com";
                    requiredPackages = [
                        {
                            Identifier: "com.woltlab.wcf",
                            MinVersion: "3.1.0"
                        },
                        {
                            Identifier: "com.woltlab.gallery",
                            MinVersion: "3.0.0",
                            FileName: "gallery.tar"
                        }
                    ];
                    conflictingPackages = [
                        {
                            Identifier: "com.woltlab.wbb",
                            Version: "3.0.0"
                        }
                    ];
                    optionalPackages = [
                        {
                            Identifier: "com.example.optional",
                            FileName: "optional.tar"
                        }
                    ];
                    installSet = {
                        Directory: "install",
                        Instructions: [
                            new TranslationInstruction(
                                {
                                    FileName: "language",
                                    Nodes: [
                                        {
                                            Name: "mypackage",
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
                                                                            en: "Main Form",
                                                                            de: "Hauptformular"
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
                                }),
                            new CronJobInstruction(
                                {
                                    FileName: "cronJobs.xml",
                                    CronJobs: [
                                        {
                                            Name: "myCronJob",
                                            ClassName: "wcf\\system\\mypackage\\MyCronJob",
                                            Period: TimePeriod.Yearly
                                        }
                                    ]
                                })
                        ]
                    };
                    updateSets = [
                        {
                            FromVersion: "1.0",
                            Directory: "update/1.0",
                            Instructions: [
                                new BBCodeInstruction(
                                    {
                                        FileName: "bbCodes.xml",
                                        BBCodes: [
                                            {
                                                Name: "newAnchor",
                                                Icon: "fa-anchor",
                                                TagName: "div",
                                                Attributes: [
                                                    {
                                                        Required: true,
                                                        Code: 'id="%s"'
                                                    }
                                                ]
                                            }
                                        ],
                                        ObjectsToDelete: [
                                            {
                                                Name: "anchor"
                                            }
                                        ]
                                    })
                            ]
                        },
                        {
                            FromVersion: "2.0",
                            Directory: "update/2.0",
                            Instructions: [
                                new TemplateListenerInstruction(
                                    {
                                        FileName: "templateListeners.xml",
                                        Listeners: [
                                            {
                                                Name: "myNewListener",
                                                EventName: "headIncludeJavaScript",
                                                TemplateName: "javascriptInclude",
                                                Code: "{include file='__myCustomJavaScript'}"
                                            }
                                        ],
                                        ObjectsToDelete: [
                                            {
                                                Name: "myListener"
                                            }
                                        ]
                                    })
                            ]
                        }
                    ];

                    let displayName: ILocalization = {};
                    let description: ILocalization = {};
                    displayName["inv"] = invariantName;
                    displayName[locale] = localizedName;
                    description["inv"] = invariantDescription;
                    description[locale] = localizedDescription;

                    let $package: Package = new Package(
                        {
                            Identifier: identifier,
                            DisplayName: displayName,
                            Description: description,
                            Version: version,
                            CreationDate: date,
                            Author: {
                                Name: author,
                                URL: homePage
                            },
                            RequiredPackages: requiredPackages,
                            ConflictingPackages: conflictingPackages,
                            OptionalPackages: optionalPackages,
                            InstallSet: installSet,
                            UpdateSets: updateSets
                        });

                    compiler = new PackageFileCompiler($package);
                    compiler.DestinationPath = tempFile.FullName;
                });

            suiteTeardown(
                () =>
                {
                    tempFile.Dispose();
                });

            suite(
                "Compile",
                () =>
                {
                    suite(
                        "General",
                        () =>
                        {
                            test(
                                "Checking whether the compiler can be executed…",
                                async () =>
                                {
                                    await compiler.Execute();
                                });
                        });

                    suite(
                        "Checking the integrity of the compiled file…",
                        () =>
                        {
                            let extensionPackage: XMLEditor;

                            suite(
                                "General",
                                () =>
                                {
                                    let rootTag: string;
                                    let identifierAttribute: string;

                                    suiteSetup(
                                        () =>
                                        {
                                            rootTag = "package";
                                            identifierAttribute = "name";
                                        });

                                    test(
                                        "Checking whether the content of the content of the document is valid xml…",
                                        async () =>
                                        {
                                            let document: Document = new DOMParser().parseFromString((await readFile(tempFile.FullName)).toString());
                                            extensionPackage = new XMLEditor(document.documentElement);
                                        });

                                    test(
                                        "Checking whether the name of the document-element tag is correct…",
                                        () =>
                                        {
                                            strictEqual(extensionPackage.TagName, rootTag);
                                        });

                                    test(
                                        "Checking whether the identifier is correct…",
                                        () =>
                                        {
                                            strictEqual(extensionPackage.HasAttribute(identifierAttribute, identifier), true);
                                        });
                                });

                            suite(
                                "Checking the package-metadata…",
                                () =>
                                {
                                    suite(
                                        "Checking the package-information…",
                                        () =>
                                        {
                                            let packageInfo: XMLEditor;

                                            suite(
                                                "General",
                                                () =>
                                                {
                                                    let packageInfoTag: string;

                                                    suiteSetup(
                                                        () =>
                                                        {
                                                            packageInfoTag = "packageinformation";
                                                        });

                                                    test(
                                                        "Checking whether the package-information is present…",
                                                        () =>
                                                        {
                                                            strictEqual(extensionPackage.HasTag(packageInfoTag, true), true);
                                                            packageInfo = extensionPackage.GetChildrenByTag(packageInfoTag)[0];
                                                        });
                                                });

                                            suite(
                                                "Checking the meta-data…",
                                                () =>
                                                {
                                                    let nameTag: string;
                                                    let descriptionTag: string;
                                                    let versionTag: string;
                                                    let dateTag: string;
                                                    let languageAttribute: string;

                                                    suiteSetup(
                                                        () =>
                                                        {
                                                            nameTag = "packagename";
                                                            descriptionTag = "packagedescription";
                                                            versionTag = "version";
                                                            dateTag = "date";
                                                            languageAttribute = "languagecode";
                                                        });

                                                    test(
                                                        "Checking the integrity of the display-name…",
                                                        () =>
                                                        {
                                                            for (let editor of packageInfo.GetChildrenByTag(nameTag))
                                                            {
                                                                let expected: string;

                                                                if (editor.HasAttribute(languageAttribute))
                                                                {
                                                                    strictEqual(editor.GetAttribute(languageAttribute), locale);
                                                                    expected = localizedName;
                                                                }
                                                                else
                                                                {
                                                                    expected = invariantName;
                                                                }

                                                                strictEqual(editor.TextContent, expected);
                                                            }
                                                        });

                                                    test(
                                                        "Checking the integrity of the description…",
                                                        () =>
                                                        {
                                                            for (let editor of packageInfo.GetChildrenByTag(descriptionTag))
                                                            {
                                                                let expected: string;

                                                                if (editor.HasAttribute(languageAttribute))
                                                                {
                                                                    strictEqual(editor.GetAttribute(languageAttribute), locale);
                                                                    expected = localizedDescription;
                                                                }
                                                                else
                                                                {
                                                                    expected = invariantDescription;
                                                                }

                                                                strictEqual(editor.TextContent, expected);
                                                            }
                                                        });

                                                    test(
                                                        "Checking whether the version is correct…",
                                                        () =>
                                                        {
                                                            strictEqual(packageInfo.HasText(versionTag, version), true);
                                                        });

                                                    test(
                                                        "Checking whether the date is correct…",
                                                        () =>
                                                        {
                                                            strictEqual(new Date(packageInfo.GetText(dateTag)).getTime(), date.getTime());
                                                        });
                                                });
                                        });

                                    suite(
                                        "Checking the author-information",
                                        () =>
                                        {
                                            let authorInfo: XMLEditor;

                                            suite(
                                                "General",
                                                () =>
                                                {
                                                    let authorInfoTag: string;

                                                    suiteSetup(
                                                        () =>
                                                        {
                                                            authorInfoTag = "authorinformation";
                                                        });

                                                    test(
                                                        "Checking whether the author-information is present…",
                                                        () =>
                                                        {
                                                            strictEqual(extensionPackage.HasTag(authorInfoTag, true), true);
                                                            authorInfo = extensionPackage.GetChildrenByTag(authorInfoTag)[0];
                                                        });
                                                });

                                            suite(
                                                "Checking the meta-data…",
                                                () =>
                                                {
                                                    let nameTag: string;
                                                    let urlTag: string;

                                                    suiteSetup(
                                                        () =>
                                                        {
                                                            nameTag = "author";
                                                            urlTag = "authorurl";
                                                        });

                                                    test(
                                                        "Checking whether the name is correct…",
                                                        () =>
                                                        {
                                                            authorInfo.HasText(nameTag, author);
                                                        });

                                                    test(
                                                        "Checking whether the homepage is correct…",
                                                        () =>
                                                        {
                                                            authorInfo.HasText(urlTag, homePage);
                                                        });
                                                });
                                        });

                                    suite(
                                        "Checking the required packages…",
                                        () =>
                                        {
                                            let packages: XMLEditor;

                                            suite(
                                                "General",
                                                () =>
                                                {
                                                    let requiredPackagesTag: string;

                                                    suiteSetup(
                                                        () =>
                                                        {
                                                            requiredPackagesTag = "requiredpackages";
                                                        });

                                                    test(
                                                        "Checking whether the list of the required packages is present…",
                                                        () =>
                                                        {
                                                            strictEqual(extensionPackage.HasTag(requiredPackagesTag, true), true);
                                                            packages = extensionPackage.GetChildrenByTag(requiredPackagesTag)[0];
                                                        });
                                                });

                                            suite(
                                                "Checking the meta-data…",
                                                () =>
                                                {
                                                    let requiredPackageTag: string;
                                                    let requiredPackageNodes: XMLEditor[];

                                                    suiteSetup(
                                                        () =>
                                                        {
                                                            requiredPackageTag = "requiredpackage";
                                                            requiredPackageNodes = packages.GetChildrenByTag(requiredPackageTag);
                                                        });

                                                    test(
                                                        "Checking whether the tag-names are correct…",
                                                        () =>
                                                        {
                                                            strictEqual(
                                                                requiredPackageNodes.length,
                                                                packages.ChildNodes.filter((node: Node) => node.nodeType === node.ELEMENT_NODE).length);
                                                        });

                                                    test(
                                                        "Checking whether all required packages are serialized correctly…",
                                                        () =>
                                                        {
                                                            for (let requiredPackage of requiredPackages)
                                                            {
                                                                strictEqual(
                                                                    requiredPackageNodes.filter(
                                                                        (requiredPackageNode: XMLEditor) =>
                                                                        {
                                                                            return (requiredPackageNode.TextContent === requiredPackage.Identifier) &&
                                                                                requiredPackageNode.HasAttribute("minversion", requiredPackage.MinVersion) &&
                                                                                ((requiredPackage.FileName === undefined) || requiredPackageNode.HasAttribute("file", requiredPackage.FileName));
                                                                        }).length > 0,
                                                                    true);
                                                            }
                                                        });
                                                });
                                        });

                                    suite(
                                        "Checking conflicting packages…",
                                        () =>
                                        {
                                            let packages: XMLEditor;

                                            suite(
                                                "General",
                                                () =>
                                                {
                                                    let conflictingPackagesTag: string;

                                                    suiteSetup(
                                                        () =>
                                                        {
                                                            conflictingPackagesTag = "excludedpackages";
                                                        });

                                                    test(
                                                        "Checking whether the list of conflicting packages is present…",
                                                        () =>
                                                        {
                                                            strictEqual(extensionPackage.HasTag(conflictingPackagesTag, true), true);
                                                            packages = extensionPackage.GetChildrenByTag(conflictingPackagesTag)[0];
                                                        });
                                                });

                                            suite(
                                                "Checking the meta-data…",
                                                () =>
                                                {
                                                    let confligtingPackageTag: string;
                                                    let conflictingPackageNodes: XMLEditor[];

                                                    suiteSetup(
                                                        () =>
                                                        {
                                                            confligtingPackageTag = "excludedpackage";
                                                            conflictingPackageNodes = packages.GetChildrenByTag(confligtingPackageTag);
                                                        });

                                                    test(
                                                        "Checking whether the tag-names are correct…",
                                                        () =>
                                                        {
                                                            strictEqual(
                                                                conflictingPackageNodes.length,
                                                                packages.ChildNodes.filter((node: Node) => node.nodeType === node.ELEMENT_NODE).length);
                                                        });

                                                    test(
                                                        "Checking whether all conflicting packages are serialized correctly…",
                                                        () =>
                                                        {
                                                            for (let conflictingPackage of conflictingPackages)
                                                            {
                                                                strictEqual(
                                                                    conflictingPackageNodes.filter(
                                                                        (conflictingPackageNode: XMLEditor) =>
                                                                        {
                                                                            return (conflictingPackageNode.TextContent === conflictingPackage.Identifier) &&
                                                                                conflictingPackageNode.HasAttribute("version", conflictingPackage.Version);
                                                                        }).length > 0,
                                                                    true);
                                                            }
                                                        });
                                                });
                                        });

                                    suite(
                                        "Checking optional packages…",
                                        () =>
                                        {
                                            let packages: XMLEditor;

                                            suite(
                                                "General",
                                                () =>
                                                {
                                                    let optionalPackagesTag: string;

                                                    suiteSetup(
                                                        () =>
                                                        {
                                                            optionalPackagesTag = "optionalpackages";
                                                        });

                                                    test(
                                                        "Checking whether the list of optional packages is present…",
                                                        () =>
                                                        {
                                                            strictEqual(extensionPackage.HasTag(optionalPackagesTag, true), true);
                                                            packages = extensionPackage.GetChildrenByTag(optionalPackagesTag)[0];
                                                        });
                                                });

                                            suite(
                                                "Checking the meta-data…",
                                                () =>
                                                {
                                                    let optionalPackageTag: string;
                                                    let optionalPackageNodes: XMLEditor[];

                                                    suiteSetup(
                                                        () =>
                                                        {
                                                            optionalPackageTag = "optionalpackage";
                                                            optionalPackageNodes = packages.GetChildrenByTag(optionalPackageTag);
                                                        });

                                                    test(
                                                        "Checking whether the tag-names are correct…",
                                                        () =>
                                                        {
                                                            strictEqual(
                                                                optionalPackageNodes.length,
                                                                packages.ChildNodes.filter((node: Node) => node.nodeType === node.ELEMENT_NODE).length);
                                                        });

                                                    test(
                                                        "Checking whether all optional packages are serialized correctly…",
                                                        () =>
                                                        {
                                                            for (let optionalPackage of optionalPackages)
                                                            {
                                                                strictEqual(
                                                                    optionalPackageNodes.filter(
                                                                        (optionalPackageNode: XMLEditor) =>
                                                                        {
                                                                            return (optionalPackageNode.TextContent === optionalPackage.Identifier) &&
                                                                                optionalPackageNode.HasAttribute("file", optionalPackage.FileName);
                                                                        }).length > 0,
                                                                    true);
                                                            }
                                                        });
                                                });
                                        });

                                    suite(
                                        "Checking the compatibility-section…",
                                        () =>
                                        {
                                            let compatibilityTag: string;
                                            let apiTag: string;

                                            suiteSetup(
                                                () =>
                                                {
                                                    compatibilityTag = "compatibility";
                                                    apiTag = "api";
                                                });

                                            test(
                                                "Checking whether the compatibility-information looks like expected…",
                                                () =>
                                                {
                                                    strictEqual(extensionPackage.HasTag(compatibilityTag, true), true);
                                                    let compatibility: XMLEditor = extensionPackage.GetChildrenByTag(compatibilityTag)[0];
                                                    strictEqual(compatibility.HasTag(apiTag, true), true);
                                                    strictEqual(compatibility.GetChildrenByTag(apiTag)[0].HasAttribute("version", "2018"), true);
                                                });
                                        });

                                    suite(
                                        "Checking the instruction-sets…",
                                        () =>
                                        {
                                            let instructionLists: XMLEditor[];
                                            let instructionTag: string;
                                            let typeAttribute: string;
                                            let validateInstructionSet: (instructionSet: IInstructionSetOptions, node: XMLEditor) => void;

                                            suiteSetup(
                                                () =>
                                                {
                                                    instructionLists = extensionPackage.GetChildrenByTag("instructions");
                                                    instructionTag = "instruction";
                                                    typeAttribute = "type";

                                                    validateInstructionSet = (instructionSet: IInstructionSetOptions, node: XMLEditor): void =>
                                                    {
                                                        for (let instruction of instructionSet.Instructions)
                                                        {
                                                            strictEqual(
                                                                node.GetElementsByTag(instructionTag).filter(
                                                                    (instructionEditor: XMLEditor) =>
                                                                    {
                                                                        let textContent: string;

                                                                        if (instruction.Type === "language")
                                                                        {
                                                                            textContent = join(instruction.FullName, "*");
                                                                        }
                                                                        else
                                                                        {
                                                                            textContent = instruction.FullName;
                                                                        }

                                                                        return instructionEditor.TextContent === textContent &&
                                                                            instructionEditor.HasAttribute("type", instruction.Type);
                                                                    }).length > 0,
                                                                true);
                                                        }
                                                    };
                                                });

                                            suite(
                                                "Checking the integrity of the install-set…",
                                                () =>
                                                {
                                                    let installSetEditor: XMLEditor;

                                                    suite(
                                                        "General",
                                                        () =>
                                                        {
                                                            test(
                                                                "Checking whether the install-set is present…",
                                                                () =>
                                                                {
                                                                    let filtered: XMLEditor[] = instructionLists.filter(
                                                                        (instructionList: XMLEditor) => instructionList.HasAttribute(typeAttribute, "install"));

                                                                    strictEqual(filtered.length, 1);
                                                                    installSetEditor = filtered[0];
                                                                });
                                                        });

                                                    suite(
                                                        "Checking the integrity of the meta-data…",
                                                        () =>
                                                        {
                                                            test(
                                                                "Checking whether the set is serialized correctly…",
                                                                () =>
                                                                {
                                                                    validateInstructionSet(installSet, installSetEditor);
                                                                });
                                                        });
                                                });

                                            suite(
                                                "Checking the integrity of the update-sets…",
                                                () =>
                                                {
                                                    suite(
                                                        "Checking the integrity of the meta-data…",
                                                        () =>
                                                        {
                                                            test(
                                                                "Checking whether all sets are serialized correctly…",
                                                                () =>
                                                                {
                                                                    for (let updateSet of updateSets)
                                                                    {
                                                                        let filtered: XMLEditor[] = instructionLists.filter(
                                                                            (instructionList: XMLEditor) =>
                                                                            {
                                                                                return instructionList.HasAttribute(typeAttribute, "update") &&
                                                                                    instructionList.HasAttribute("fromversion", updateSet.FromVersion);
                                                                            });

                                                                        strictEqual(filtered.length, 1);
                                                                        validateInstructionSet(updateSet, filtered[0]);
                                                                    }
                                                                });
                                                        });
                                                });
                                        });
                                });
                        });
                });
        });
}
