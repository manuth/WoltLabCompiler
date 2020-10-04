import { strictEqual } from "assert";
import { TempDirectory } from "@manuth/temp-files";
import { readdir } from "fs-extra";
import { parse } from "upath";
import { LocalizationSetCompiler } from "../../../Compilation/Globalization/LocalizationSetCompiler";
import { ILocalization } from "../../../Globalization/ILocalization";
import { TranslationInstruction } from "../../../PackageSystem/Instructions/Globalization/TranslationInstruction";

/**
 * Registers tests for the `LocalizationInstructionCompiler` class.
 */
export function LocalizationSetCompilerTests(): void
{
    suite(
        "LocalizationInstructionCompiler",
        () =>
        {
            let locales: string[];
            let tempDir: TempDirectory;
            let compiler: LocalizationSetCompiler;

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

                    compiler = new LocalizationSetCompiler(instruction.GetMessages());
                    compiler.DestinationPath = tempDir.FullName;
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
                            let files: string[] = await readdir(tempDir.FullName);

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
