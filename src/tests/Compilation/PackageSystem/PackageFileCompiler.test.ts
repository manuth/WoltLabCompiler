import { ok, strictEqual } from "assert";
import { join } from "upath";
import { PackageFileCompiler } from "../../../Compilation/PackageSystem/PackageFileCompiler";
import { Constants } from "../../../Constants";
import { ILocalization } from "../../../Globalization/ILocalization";
import { ConflictingPackageDescriptor } from "../../../PackageSystem/ConflictingPackageDescriptor";
import { BBCodeInstruction } from "../../../PackageSystem/Instructions/Customization/BBCodeInstruction";
import { EmojiInstruction } from "../../../PackageSystem/Instructions/Customization/EmojiInstruction";
import { TemplateListenerInstruction } from "../../../PackageSystem/Instructions/Events/TemplateListenerInstruction";
import { TranslationInstruction } from "../../../PackageSystem/Instructions/Globalization/TranslationInstruction";
import { InstructionSet } from "../../../PackageSystem/Instructions/InstructionSet";
import { CronJobInstruction } from "../../../PackageSystem/Instructions/Tasks/CronJobInstruction";
import { UpdateInstructionSet } from "../../../PackageSystem/Instructions/UpdateInstructionSet";
import { OptionalPackageDescriptor } from "../../../PackageSystem/OptionalPackageDescriptor";
import { Package } from "../../../PackageSystem/Package";
import { RequiredPackageDescriptor } from "../../../PackageSystem/RequiredPackageDescriptor";
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
            return new XMLFileCompilerTester(
                new PackageFileCompiler(
                    new Package(
                        {
                            Identifier: "",
                            DisplayName: {},
                            Version: "0.0.0",
                            InstallSet: {
                                Instructions: []
                            }
                        })));
        }

        /**
         * @inheritdoc
         */
        protected override ExecuteTests(): void
        {
            let tester: typeof this.Tester;
            let compiler: PackageFileCompiler;
            let compatibilityNodeName = "compatibility";
            let voidNodeName = "void";
            super.ExecuteTests();

            setup(
                () =>
                {
                    let wscPackage = this.Compiler.Item;
                    let locales = [Constants.InvariantCultureName, "de"];
                    let displayName: ILocalization = {};
                    let description: ILocalization = {};
                    tester = this.Tester;
                    compiler = this.Compiler;

                    for (let locale of locales)
                    {
                        displayName[locale] = `${locale}-name`;
                        description[locale] = `${locale}-description`;
                    }

                    wscPackage.Identifier = "com.example.mypackage";
                    wscPackage.DisplayName.Load(displayName);
                    wscPackage.Description.Load(description);
                    wscPackage.Version = "2.0.0 Beta 3";
                    wscPackage.CreationDate = new Date("2001-03-04");
                    wscPackage.Author.Name = "John Doe";
                    wscPackage.Author.URL = "https://example.com";
                    wscPackage.RequiredPackages.splice(0);
                    wscPackage.ConflictingPackages.splice(0);
                    wscPackage.OptionalPackages.splice(0);

                    wscPackage.RequiredPackages.push(
                        new RequiredPackageDescriptor(
                            {
                                Identifier: "com.woltlab.wcf",
                                MinVersion: "3.1.0"
                            }),
                        new RequiredPackageDescriptor(
                            {
                                Identifier: "com.woltlab.gallery",
                                MinVersion: "3.0.0",
                                FileName: "gallery.tar"
                            }));

                    wscPackage.ConflictingPackages.push(
                        new ConflictingPackageDescriptor(
                            {
                                Identifier: "com.woltlab.wbb",
                                Version: "3.0.0"
                            }));

                    wscPackage.OptionalPackages.push(
                        new OptionalPackageDescriptor(
                            {
                                Identifier: "com.example.optional",
                                FileName: "optional.tar"
                            }));

                    wscPackage.InstallSet.Directory = "install";
                    wscPackage.InstallSet.splice(0);

                    wscPackage.InstallSet.push(
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
                            }));

                    let v1UpdateSet = new UpdateInstructionSet(wscPackage, "1.0");
                    let v2UpdateSet = new UpdateInstructionSet(wscPackage, "2.0");
                    wscPackage.UpdateSets.splice(0);
                    wscPackage.UpdateSets.push(v1UpdateSet, v2UpdateSet);
                    v1UpdateSet.Directory = "update/1.0";
                    v2UpdateSet.Directory = "update/2.0";

                    v1UpdateSet.push(
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
                            }));

                    v2UpdateSet.push(
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
                            }));
                });

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

            test(
                `Checking whether the \`${compatibilityNodeName}\`-node is added only if an API-version was specified…`,
                async () =>
                {
                    let apiVersion = "2018";
                    strictEqual(this.Tester.XMLEditor.GetChildrenByTag(compatibilityNodeName).length, 0);
                    // eslint-disable-next-line @delagen/deprecation/deprecation
                    this.Compiler.Item.APIVersion = apiVersion;
                    await this.Compiler.Execute();
                    strictEqual(this.Tester.XMLEditor.GetChildrenByTag(compatibilityNodeName).length, 1);
                    let compatibilityNode = this.GetElement(this.Tester.XMLEditor, compatibilityNodeName);
                    let apiNode = this.GetElement(compatibilityNode, "api");
                    strictEqual(apiNode.GetAttribute("version"), apiVersion);
                });

            test(
                `Checking whether a \`${voidNodeName}\`-element is added if an instruction-set is empty…`,
                async function()
                {
                    this.slow(7.5 * 1000);
                    this.timeout(15 * 1000);

                    let selector = `instructions > ${voidNodeName}`;
                    let wscPackage = compiler.Item;
                    let dummyInstruction = new EmojiInstruction({ FileName: "emojis.xml", Emojis: [] });
                    wscPackage.InstallSet.push(dummyInstruction);
                    await compiler.Execute();

                    for (let instructionSet of wscPackage.UpdateSets)
                    {
                        instructionSet.push(dummyInstruction);
                    }

                    strictEqual(tester.Cheerio(selector).length, 0);
                    wscPackage.InstallSet.splice(0);
                    await compiler.Execute();
                    strictEqual(tester.Cheerio(selector).length, 1);
                    wscPackage.UpdateSets.push(new UpdateInstructionSet(wscPackage, "1.0"));
                    await compiler.Execute();
                    strictEqual(tester.Cheerio(selector).length, 2);
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
                                assertedContent = join(assertedContent, "*.xml");
                            }

                            return (instructionNode.GetAttribute("type") === instruction.Type) &&
                                (instructionNode.TextContent === assertedContent);
                        }));
            }
        }
    }(nameof(PackageFileCompiler)).Register();
}
