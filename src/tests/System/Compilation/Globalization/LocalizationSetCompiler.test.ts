import * as assert from "assert";
import * as FileSystem from "fs-extra";
import * as Path from "path";
import { TempDirectory } from "temp-filesystem";
import { LocalizationSetCompiler } from "../../../../System/Compilation/Globalization/LocalizationSetCompiler";
import { ILocalization } from "../../../../System/Globalization/ILocalization";
import { TranslationInstruction } from "../../../../System/PackageSystem/Instructions/Globalization/TranslationInstruction";

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
            "Compile()",
            () =>
            {
                test(
                    "Checking whether the item can be compiled...",
                    async () =>
                    {
                        await compiler.Execute();
                    });

                test(
                    "Checking whether all the expected files exist...",
                    async () =>
                    {
                        let files: string[] = await FileSystem.readdir(tempDir.FullName);

                        assert.strictEqual(
                            files.every(
                                (file: string) =>
                                {
                                    return locales.includes(Path.parse(file).name);
                                }),
                                true);

                        assert.strictEqual(
                            locales.every(
                                (locale: string) =>
                                {
                                    return files.includes(`${locale}.xml`);
                                }),
                                true);
                    });
            });
    });