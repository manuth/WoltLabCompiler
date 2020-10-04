import { strictEqual } from "assert";
import { TempDirectory } from "@manuth/temp-files";
import { readdir } from "fs-extra";
import { parse } from "upath";
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

                    let extensionPackage: Package = new Package(
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

                    extensionPackage.InstallSet.push(instruction);
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
                            let files: string[] = await readdir(localizationDir);

                            strictEqual(
                                files.every(
                                    (file: string) =>
                                    {
                                        return locales.includes(parse(file).name);
                                    }),
                                true);

                            strictEqual(
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
