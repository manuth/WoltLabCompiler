import { strictEqual } from "node:assert";
import { TempFile } from "@manuth/temp-files";
import fs from "fs-extra";
import { ThemeFileCompiler } from "../../../Compilation/Presentation/ThemeFileCompiler.js";
import { Constants } from "../../../Constants.js";
import { Theme } from "../../../Customization/Presentation/Themes/Theme.js";
import { ILocalization } from "../../../Globalization/ILocalization.js";
import { ThemeInstruction } from "../../../PackageSystem/Instructions/Customization/Presentation/ThemeInstruction.js";
import { Package } from "../../../PackageSystem/Package.js";
import { XMLFileCompilerTester } from "../TestComponents/Testers/XMLFileCompilerTester.js";
import { XMLCompilerTestRunner } from "../TestComponents/TestRunners/XMLCompilerTestRunner.js";

const { writeJSON } = fs;

/**
 * Registers tests for the {@link ThemeFileCompiler `ThemeFileCompiler`} class.
 */
export function ThemeFileCompilerTests(): void
{
    let variableSource: TempFile;
    let theme: Theme;

    new class extends XMLCompilerTestRunner<XMLFileCompilerTester<ThemeFileCompiler>, ThemeFileCompiler>
    {
        /**
         * @inheritdoc
         */
        protected override async SuiteSetup(): Promise<void>
        {
            variableSource = new TempFile({ Suffix: ".json" });
            await writeJSON(variableSource.FullName, { wcfHeaderBackground: "red" });

            let locales = [
                Constants.InvariantCultureName,
                "de",
                "en"
            ];

            let themeName: ILocalization = {};
            let description: ILocalization = {};

            for (let locale of locales)
            {
                themeName[locale] = `${locale}-name`;
                description[locale] = `${locale}-description`;
            }

            let themeInstruction = new ThemeInstruction(
                {
                    Theme: {
                        Name: null,
                        DisplayName: themeName,
                        Version: "1.0.0 Beta 3",
                        CreationDate: new Date("2019-06-12"),
                        License: "MIT",
                        Description: description,
                        Thumbnail: "thumb.png",
                        HighResThumbnail: "highResThumb.png",
                        CoverPhoto: "cover.jpg",
                        Author: {
                            Name: "John Doe",
                            URL: "https://example.com/"
                        },
                        VariableFileName: variableSource.FullName,
                        Images: {
                            Source: "./images",
                            DestinationRoot: "foo/bar/images",
                            FileName: "images.tar"
                        }
                    }
                });

            new Package(
                {
                    DisplayName: {},
                    Identifier: "foo.bar",
                    Version: "0.0.0",
                    InstallSet: {
                        Instructions: []
                    }
                }).InstallSet.push(themeInstruction);

            theme = await themeInstruction.ThemeLoader.Load();
            return super.SuiteSetup();
        }

        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): XMLFileCompilerTester<ThemeFileCompiler>
        {
            return new XMLFileCompilerTester(new ThemeFileCompiler(theme, "variables.xml"));
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
                    let generalNode = this.GetElement(this.Tester.XMLEditor, "general");
                    let authorNode = this.GetElement(this.Tester.XMLEditor, "author");
                    let filesNode = this.GetElement(this.Tester.XMLEditor, "files");
                    let imageNode = this.GetElement(filesNode, "images");
                    strictEqual(this.Tester.XMLEditor.TagName, "style");

                    for (let locale of this.Compiler.Item.DisplayName.GetLocales())
                    {
                        generalNode.GetChildrenByTag("stylename").some(
                            (nameNode) =>
                            {
                                return (
                                    (locale === Constants.InvariantCultureName) ?
                                        !nameNode.HasAttribute(localeAttribute) :
                                        (nameNode.HasAttribute(localeAttribute) && nameNode.GetAttribute(localeAttribute) === locale)) &&
                                    (nameNode.TextContent === this.Compiler.Item.DisplayName.Data.get(locale));
                            });
                    }

                    for (let locale of this.Compiler.Item.Description.GetLocales())
                    {
                        generalNode.GetChildrenByTag("description").some(
                            (descriptionNode) =>
                            {
                                return (
                                    (locale === Constants.InvariantCultureName) ?
                                        !descriptionNode.HasAttribute(localeAttribute) :
                                        (descriptionNode.HasAttribute(localeAttribute) && descriptionNode.GetAttribute(localeAttribute) === locale)) &&
                                    (descriptionNode.TextContent === this.Compiler.Item.Description.Data.get(locale));
                            });
                    }

                    this.AssertTagContent(generalNode, "version", this.Compiler.Item.Version);
                    strictEqual(new Date(this.GetText(generalNode, "date")).getTime(), this.Compiler.Item.CreationDate.getTime());
                    this.AssertTagContent(generalNode, "license", this.Compiler.Item.License);
                    this.AssertTagContent(generalNode, "packageName", this.Compiler.Item.Instruction.Collection.Package.Identifier);
                    this.AssertTagContent(generalNode, "apiVersion", "3.1");
                    this.AssertTagContent(generalNode, "image", this.Compiler.Item.Thumbnail.FileName);
                    this.AssertTagContent(generalNode, "image2x", this.Compiler.Item.HighResThumbnail.FileName);
                    this.AssertTagContent(generalNode, "coverPhoto", this.Compiler.Item.CoverPhoto.FileName);
                    this.AssertTagContent(authorNode, "authorname", this.Compiler.Item.Author.Name);
                    this.AssertTagContent(authorNode, "authorurl", this.Compiler.Item.Author.URL);
                    this.AssertTagContent(filesNode, "variables", this.Compiler.VariableFileName);
                    strictEqual(imageNode.GetAttribute("path"), this.Compiler.Item.Images.DestinationRoot);
                    strictEqual(imageNode.TextContent, this.Compiler.Item.Images.FileName);
                });

            test(
                `Checking whether the version tag is added only if the version of the \`${nameof(Theme)}\` can be determined…`,
                async () =>
                {
                    this.Compiler.Item.Version = undefined;
                    this.Compiler.Item.Instruction.Package.Version = undefined;
                    await this.Compiler.Execute();
                    let generalNode = this.GetElement(this.Tester.XMLEditor, "general");
                    strictEqual(generalNode.GetChildrenByTag("version").length, 0);
                });
        }
    }(nameof(ThemeFileCompiler)).Register();
}
