import { ok, strictEqual } from "assert";
import { join } from "upath";
import { PackageFileCompiler } from "../../../Compilation/PackageSystem/PackageFileCompiler";
import { Constants } from "../../../Constants";
import { ILocalization } from "../../../Globalization/ILocalization";
import { BBCodeInstruction } from "../../../PackageSystem/Instructions/Customization/BBCodeInstruction";
import { TemplateListenerInstruction } from "../../../PackageSystem/Instructions/Events/TemplateListenerInstruction";
import { TranslationInstruction } from "../../../PackageSystem/Instructions/Globalization/TranslationInstruction";
import { InstructionSet } from "../../../PackageSystem/Instructions/InstructionSet";
import { CronJobInstruction } from "../../../PackageSystem/Instructions/Tasks/CronJobInstruction";
import { Package } from "../../../PackageSystem/Package";
import { XMLEditor } from "../../../Serialization/XMLEditor";
import { TimePeriod } from "../../../Tasks/TimePeriod";
import { XMLFileCompilerTester } from "../TestComponents/Testers/XMLFileCompilerTester";
import { XMLCompilerTestRunner } from "../TestComponents/TestRunners/XMLCompilerTestRunner";

/**
 * Registers tests for the {@link PackageFileCompiler `PackageFileCompiler`} class.
 */
export function PackageFileCompilerTests(): void
{
    new class extends XMLCompilerTestRunner<XMLFileCompilerTester<PackageFileCompiler>, PackageFileCompiler>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): XMLFileCompilerTester<PackageFileCompiler>
        {
            let locales = [Constants.InvariantCultureName, "de"];
            let displayName: ILocalization = {};
            let description: ILocalization = {};

            for (let locale of locales)
            {
                displayName[locale] = `${locale}-name`;
                description[locale] = `${locale}-description`;
            }

            return new XMLFileCompilerTester(
                new PackageFileCompiler(
                    new Package(
                        {
                            Identifier: "com.example.mypackage",
                            DisplayName: displayName,
                            Description: description,
                            Version: "2.0 Beta 3",
                            CreationDate: new Date("2001-03-04"),
                            Author: {
                                Name: "John Doe",
                                URL: "https://example.com"
                            },
                            RequiredPackages: [
                                {
                                    Identifier: "com.woltlab.wcf",
                                    MinVersion: "3.1.0"
                                },
                                {
                                    Identifier: "com.woltlab.gallery",
                                    MinVersion: "3.0.0",
                                    FileName: "gallery.tar"
                                }
                            ],
                            ConflictingPackages: [
                                {
                                    Identifier: "com.woltlab.wbb",
                                    Version: "3.0.0"
                                }
                            ],
                            OptionalPackages: [
                                {
                                    Identifier: "com.example.optional",
                                    FileName: "optional.tar"
                                }
                            ],
                            InstallSet: {
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
                            },
                            UpdateSets: [
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
                            ]
                        })));
        }

        /**
         * @inheritdoc
         */
        protected override ExecuteTests(): void
        {
            super.ExecuteTests();

            test(
                "Checking the integrity of the metadata…",
                () =>
                {
                    let localeAttribute = "languagecode";
                    let packageInformationNode = this.GetElement(this.Tester.XMLEditor, "packageinformation");
                    let authorInformationNode = this.GetElement(this.Tester.XMLEditor, "authorinformation");
                    let requiredPackageListNode = this.GetElement(this.Tester.XMLEditor, "requiredpackages");
                    let requiredPackageNodes = requiredPackageListNode.GetChildrenByTag("requiredpackage");
                    let conflictingPackageListNode = this.GetElement(this.Tester.XMLEditor, "excludedpackages");
                    let conflictingPackageNodes = conflictingPackageListNode.GetChildrenByTag("excludedpackage");
                    let optionalPackageListNode = this.GetElement(this.Tester.XMLEditor, "optionalpackages");
                    let optionalPackageNodes = optionalPackageListNode.GetChildrenByTag("optionalpackage");
                    let compatibilityNode = this.GetElement(this.Tester.XMLEditor, "compatibility");
                    let apiNode = this.GetElement(compatibilityNode, "api");
                    let instructionSetNodes = this.Tester.XMLEditor.GetChildrenByTag("instructions");
                    let installSetNodes = instructionSetNodes.filter((instructionSetNode) => instructionSetNode.GetAttribute("type") === "install");
                    strictEqual(this.Tester.XMLEditor.TagName, "package");
                    strictEqual(this.Tester.XMLEditor.GetAttribute("name"), this.Compiler.Item.Identifier);

                    for (let locale of this.Compiler.Item.DisplayName.Data.keys())
                    {
                        ok(
                            packageInformationNode.GetChildrenByTag("packagename").some(
                                (displayNameNode) =>
                                {
                                    return (
                                        (locale === Constants.InvariantCultureName) ?
                                            !displayNameNode.HasAttribute(localeAttribute) :
                                            (displayNameNode.HasAttribute(localeAttribute) && displayNameNode.GetAttribute(localeAttribute) === locale)) &&
                                        (displayNameNode.TextContent === this.Compiler.Item.DisplayName.Data.get(locale));
                                }));
                    }

                    for (let locale of this.Compiler.Item.Description.Data.keys())
                    {
                        ok(
                            packageInformationNode.GetChildrenByTag("packagedescription").some(
                                (descriptionNode) =>
                                {
                                    return (
                                        (locale === Constants.InvariantCultureName) ?
                                            !descriptionNode.HasAttribute(localeAttribute) :
                                            (descriptionNode.HasAttribute(localeAttribute) && descriptionNode.GetAttribute(localeAttribute) === locale)) &&
                                        (descriptionNode.TextContent === this.Compiler.Item.Description.Data.get(locale));
                                }));
                    }

                    this.AssertTagContent(packageInformationNode, "version", this.Compiler.Item.Version);
                    strictEqual(new Date(this.GetText(packageInformationNode, "date")).getTime(), this.Compiler.Item.CreationDate.getTime());
                    this.AssertTagContent(authorInformationNode, "author", this.Compiler.Item.Author.Name);
                    this.AssertTagContent(authorInformationNode, "authorurl", this.Compiler.Item.Author.URL);
                    strictEqual(requiredPackageNodes.length, this.Compiler.Item.RequiredPackages.length);

                    for (let requiredPackage of this.Compiler.Item.RequiredPackages)
                    {
                        requiredPackageNodes.some(
                            (requiredPackageNode) =>
                            {
                                return (requiredPackageNode.TextContent === requiredPackage.Identifier) &&
                                    (requiredPackageNode.GetAttribute("minversion") === requiredPackage.MinVersion) &&
                                    ((requiredPackage.FileName === undefined) || (requiredPackageNode.HasAttribute("file") && (requiredPackageNode.GetAttribute("file") === requiredPackage.FileName)));
                            });
                    }

                    strictEqual(conflictingPackageNodes.length, this.Compiler.Item.ConflictingPackages.length);

                    for (let conflictingPackage of this.Compiler.Item.ConflictingPackages)
                    {
                        conflictingPackageNodes.some(
                            (conflictingPackageNode) =>
                            {
                                return (conflictingPackageNode.TextContent === conflictingPackage.Identifier) &&
                                    (conflictingPackageNode.GetAttribute("version") === conflictingPackage.Version);
                            });
                    }

                    strictEqual(optionalPackageNodes.length, this.Compiler.Item.OptionalPackages.length);

                    for (let optionalPackage of this.Compiler.Item.OptionalPackages)
                    {
                        optionalPackageNodes.some(
                            (optionalPackageNode) =>
                            {
                                return (optionalPackageNode.TextContent === optionalPackage.Identifier) &&
                                    (optionalPackageNode.GetAttribute("file") === optionalPackage.FileName);
                            });
                    }

                    strictEqual(apiNode.GetAttribute("version"), "2018");
                    strictEqual(installSetNodes.length, 1);
                    this.ValidateInstructionSet(this.Compiler.Item.InstallSet, installSetNodes[0]);

                    for (let updateSet of this.Compiler.Item.UpdateSets)
                    {
                        ok(
                            instructionSetNodes.some(
                                (instructionSetNode) =>
                                {
                                    try
                                    {
                                        strictEqual(instructionSetNode.GetAttribute("type"), "update");
                                        strictEqual(instructionSetNode.GetAttribute("fromversion"), updateSet.FromVersion);
                                        this.ValidateInstructionSet(updateSet, instructionSetNode);
                                        return true;
                                    }
                                    catch
                                    {
                                        return false;
                                    }
                                }));
                    }
                });
        }

        /**
         * Asserts the existence of the metadata inside the {@link instructionSetNode `instructionSetNode`}.
         *
         * @param instructionSet
         * The asserted meta-data.
         *
         * @param instructionSetNode
         * The instruction-set to check.
         */
        protected ValidateInstructionSet(instructionSet: InstructionSet, instructionSetNode: XMLEditor): void
        {
            for (let instruction of instructionSet)
            {
                ok(
                    instructionSetNode.GetChildrenByTag("instruction").some(
                        (instructionNode) =>
                        {
                            let assertedContent: string;
                            assertedContent = instruction.FullName;

                            if (instruction.Type === "language")
                            {
                                assertedContent = join(assertedContent, "*");
                            }

                            return (instructionNode.GetAttribute("type") === instruction.Type) &&
                                (instructionNode.TextContent === assertedContent);
                        }));
            }
        }
    }(nameof(PackageFileCompiler)).Register();
}
