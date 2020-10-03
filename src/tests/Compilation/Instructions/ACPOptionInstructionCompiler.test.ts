import { strictEqual } from "assert";
import { pathExists, readdir } from "fs-extra";
import { TempDirectory } from "temp-filesystem";
import { ACPOptionInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/ACPOptionInstructionCompiler";
import { ILocalization } from "../../../Globalization/ILocalization";
import { ACPOptionInstruction } from "../../../PackageSystem/Instructions/Options/ACPOptionInstruction";
import { Package } from "../../../PackageSystem/Package";

/**
 * Registers tests for the `ACPOptionInstructionCompiler` class.
 */
export function ACPOptionInstructionCompilerTests(): void
{
    suite(
        "ACPOptionInstructionCompiler",
        () =>
        {
            let fileName: string;
            let translationDir: string;
            let tempDir: TempDirectory;
            let compiler: ACPOptionInstructionCompiler;
            let locales: string[];

            suiteSetup(
                () =>
                {
                    let displayName: ILocalization = {};

                    let $package: Package = new Package(
                        {
                            Identifier: "foo",
                            DisplayName: {},
                            InstallSet: {
                                Instructions: []
                            }
                        });

                    tempDir = new TempDirectory();
                    locales = ["en", "de", "it", "fr"];

                    for (let locale of locales)
                    {
                        displayName[locale] = "test";
                    }

                    let instruction: ACPOptionInstruction = new ACPOptionInstruction(
                        {
                            FileName: "options.xml",
                            Nodes: [
                                {
                                    Name: "bar",
                                    Item: {
                                        DisplayName: displayName
                                    }
                                }
                            ]
                        });

                    $package.InstallSet.push(instruction);
                    compiler = new ACPOptionInstructionCompiler(instruction);
                    compiler.DestinationPath = tempDir.FullName;
                    fileName = compiler.DestinationFileName;
                    translationDir = tempDir.MakePath(instruction.DestinationRoot, instruction.TranslationDirectory);
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
                        "Checking whether the compiler can be executed…",
                        async () =>
                        {
                            await compiler.Execute();
                        });

                    test(
                        "Checking whether the option-file exists…",
                        async () =>
                        {
                            strictEqual(await pathExists(fileName), true);
                        });

                    test(
                        "Checking whether the language-files exist…",
                        async () =>
                        {
                            let files: string[] = await readdir(translationDir);
                            strictEqual(locales.every((locale: string) => files.includes(`${locale}.xml`)), true);
                        });
                });
        });
}
