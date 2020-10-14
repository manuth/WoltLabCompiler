import { ok, strictEqual } from "assert";
import { TempFile } from "@manuth/temp-files";
import dedent = require("dedent");
import { pathExists, readFile } from "fs-extra";
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

                    messageValue = dedent(
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
                                    ok(await pathExists(tempFile.FullName));
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
                                    document = new DOMParser().parseFromString((await readFile(tempFile.FullName)).toString());
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
                                            strictEqual(rootEditor.TagName, rootTag);
                                        });

                                    test(
                                        "Checking whether the language is specified…",
                                        () =>
                                        {
                                            ok(rootEditor.HasAttribute(languageAttribute));
                                        });

                                    test(
                                        "Checking whether the language is specified correctly…",
                                        () =>
                                        {
                                            strictEqual(rootEditor.GetAttribute(languageAttribute), locale);
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
                                                    ok(rootEditor.HasTag(categoryTag, true));
                                                    categoryEditor = rootEditor.GetChildrenByTag(categoryTag)[0];
                                                });

                                            test(
                                                "Checking whether the integrity of the name of the category…",
                                                () =>
                                                {
                                                    strictEqual(categoryEditor.GetAttribute(nameAttribute), category);
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
                                                    ok(categoryEditor.HasTag(itemTag, true));
                                                    itemEditor = categoryEditor.GetChildrenByTag(itemTag)[0];
                                                });

                                            test(
                                                "Checking whether the integrity of the name of the translation…",
                                                () =>
                                                {
                                                    strictEqual(itemEditor.GetAttribute(nameAttribute), `${category}.${messageName}`);
                                                });

                                            test(
                                                "Checking the integrity of the text of the translation…",
                                                () =>
                                                {
                                                    strictEqual(itemEditor.TextContent, messageValue);
                                                });
                                        });
                                });
                        });
                });
        });
}
