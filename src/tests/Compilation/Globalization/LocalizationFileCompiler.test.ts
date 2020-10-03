import Assert = require("assert");
import Dedent = require("dedent");
import FileSystem = require("fs-extra");
import { TempFile } from "temp-filesystem";
import { DOMParser } from "xmldom";
import { LocalizationFileCompiler } from "../../../Compilation/Globalization/LocalizationFileCompiler";
import { ILocalization } from "../../../Globalization/ILocalization";
import { TranslationInstruction } from "../../../PackageSystem/Instructions/Globalization/TranslationInstruction";
import { XMLEditor } from "../../../Serialization/XMLEditor";

/**
 * Registers tests for the `LocalizationFileCompiler` class.
 */
export function LocalizationFileCompilerTests(): void
{
    suite(
        "LocalizationFileCompiler",
        () =>
        {
            let compiler: LocalizationFileCompiler;
            let tempFile: TempFile;
            let locale: string;
            let category: string;
            let messageName: string;
            let messageValue: string;

            suiteSetup(
                () =>
                {
                    let instruction: TranslationInstruction;
                    let localization: ILocalization = {};

                    tempFile = new TempFile();
                    locale = "en";
                    category = "foo";
                    messageName = "bar";
                    messageValue = Dedent(
                        `
                        This is a test
                        with a message which has
                        multiple lines`);
                    localization[locale] = messageValue;

                    instruction = new TranslationInstruction(
                        {
                            FileName: "foo",
                            Nodes: [
                                {
                                    Name: category,
                                    Nodes: [
                                        {
                                            Name: messageName,
                                            Item:
                                            {
                                                Translations: localization
                                            }
                                        }
                                    ]
                                }
                            ]
                        });

                    compiler = new LocalizationFileCompiler([locale, instruction.GetMessages()[locale]]);
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
                                "Checking whether the item can be compiled…",
                                async () =>
                                {
                                    await compiler.Execute();
                                });

                            test(
                                "Checking whether the expected file exists…",
                                async () =>
                                {
                                    Assert.strictEqual(await FileSystem.pathExists(tempFile.FullName), true);
                                });
                        });

                    suite(
                        "Testing the integrity of the compiled file…",
                        () =>
                        {
                            let document: Document;
                            let rootTag: string;
                            let rootEditor: XMLEditor;
                            let languageAttribute: string;

                            suiteSetup(
                                async () =>
                                {
                                    document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FullName)).toString());
                                    rootTag = "language";
                                    rootEditor = new XMLEditor(document.documentElement);
                                    languageAttribute = "languagecode";
                                });

                            suite(
                                "Testing the XML-Document…",
                                () =>
                                {
                                    test(
                                        "Checking whether the tag-name is correct…",
                                        () =>
                                        {
                                            Assert.strictEqual(rootEditor.TagName, rootTag);
                                        });

                                    test(
                                        "Checking whether the language is specified…",
                                        () =>
                                        {
                                            Assert.strictEqual(rootEditor.HasAttribute(languageAttribute), true);
                                        });

                                    test(
                                        "Checking whether the language is specified correctly…",
                                        () =>
                                        {
                                            Assert.strictEqual(rootEditor.GetAttribute(languageAttribute), locale);
                                        });
                                });

                            suite(
                                "Checking the integrity of the categories…",
                                () =>
                                {
                                    let categoryTag: string;
                                    let categoryEditor: XMLEditor;
                                    let nameAttribute: string;

                                    suiteSetup(
                                        () =>
                                        {
                                            categoryTag = "category";
                                            nameAttribute = "name";
                                        });

                                    suite(
                                        "General",
                                        () =>
                                        {
                                            test(
                                                "Checking whether the category exists…",
                                                () =>
                                                {
                                                    Assert.strictEqual(rootEditor.HasTag(categoryTag, true), true);
                                                    categoryEditor = rootEditor.GetChildrenByTag(categoryTag)[0];
                                                });

                                            test(
                                                "Checking whether the integrity of the name of the category…",
                                                () =>
                                                {
                                                    Assert.strictEqual(categoryEditor.HasAttribute(nameAttribute, category), true);
                                                });
                                        });

                                    suite(
                                        "Checking the integrity of the translations…",
                                        () =>
                                        {
                                            let itemTag: string;
                                            let itemEditor: XMLEditor;

                                            suiteSetup(
                                                () =>
                                                {
                                                    itemTag = "item";
                                                });

                                            test(
                                                "Checking whether the translation exists…",
                                                () =>
                                                {
                                                    Assert.strictEqual(categoryEditor.HasTag(itemTag, true), true);
                                                    itemEditor = categoryEditor.GetChildrenByTag(itemTag)[0];
                                                });

                                            test(
                                                "Checking whether the integrity of the name of the translation…",
                                                () =>
                                                {
                                                    Assert.strictEqual(itemEditor.HasAttribute(nameAttribute, `${category}.${messageName}`), true);
                                                });

                                            test(
                                                "Checking the integrity of the text of the translation…",
                                                () =>
                                                {
                                                    Assert.strictEqual(itemEditor.TextContent, messageValue);
                                                });
                                        });
                                });
                        });
                });
        });
}
