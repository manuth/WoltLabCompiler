import Assert = require("assert");
import Path = require("path");
import FileSystem = require("fs-extra");
import { TempDirectory } from "temp-filesystem";
import { LocalizationInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/LocalizationInstructionCompiler";
import { ILocalization } from "../../../Globalization/ILocalization";
import { TranslationInstruction } from "../../../PackageSystem/Instructions/Globalization/TranslationInstruction";
import { Package } from "../../../PackageSystem/Package";

/**
 * Registers tests for the `LocalizationInstructionCompiler` class.
 */
export function LocalizationInstructionCompilerTests(): void
{
    suite(
        "LocalizationInstructionCompiler",
        () =>
        {
            let locales: string[];
            let tempDir: TempDirectory;
            let compiler: LocalizationInstructionCompiler;
            let localizationDir: string;

            suiteSetup(
                () =>
                {
                    let localization: ILocalization = {};
                    locales = ["en", "it", "fr"];
                    tempDir = new TempDirectory();

                    for (let locale of locales)
                    {
                        localization[locale] = "example";
                    }

                    let $package: Package = new Package(
                        {
                            Identifier: "test",
                            DisplayName: {},
                            InstallSet: {
                                Instructions: []
                            }
                        });

                    let instruction: TranslationInstruction = new TranslationInstruction(
                        {
                            FileName: "language",
                            Nodes: [
                                {
                                    Name: "foo",
                                    Item: {
                                        Translations: localization
                                    }
                                }
                            ]
                        });

                    $package.InstallSet.push(instruction);
                    compiler = new LocalizationInstructionCompiler(instruction);
                    compiler.DestinationPath = tempDir.FullName;
                    localizationDir = compiler.DestinationFileName;
                });

            suiteTeardown(
                () =>
                {
                    tempDir.Dispose();
                });

            suite(
                "Compile",
                () =>
                {
                    test(
                        "Checking whether the item can be compiled…",
                        async () =>
                        {
                            await compiler.Execute();
                        });

                    test(
                        "Checking whether all the expected files exist…",
                        async () =>
                        {
                            let files: string[] = await FileSystem.readdir(localizationDir);

                            Assert.strictEqual(
                                files.every(
                                    (file: string) =>
                                    {
                                        return locales.includes(Path.parse(file).name);
                                    }),
                                true);

                            Assert.strictEqual(
                                locales.every(
                                    (locale: string) =>
                                    {
                                        return files.includes(`${locale}.xml`);
                                    }),
                                true);
                        });
                });
        });
}
