import { strictEqual } from "assert";
import { pathExists, readdir } from "fs-extra";
import { TempDirectory } from "temp-filesystem";
import { GroupOptionInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/GroupOptionInstructionCompiler";
import { ILocalization } from "../../../Globalization/ILocalization";
import { GroupOptionInstruction } from "../../../PackageSystem/Instructions/Options/GroupOptionInstruction";
import { Package } from "../../../PackageSystem/Package";

/**
 * Registers tests for the `GroupOptionInstructionCompiler` class.
 */
export function GroupOptionInstructionCompilerTests(): void
{
    suite(
        "GroupOptionInstructionCompiler",
        () =>
        {
            let fileName: string;
            let translationDir: string;
            let tempDir: TempDirectory;
            let compiler: GroupOptionInstructionCompiler;
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
                    locales = ["en", "cn", "es"];

                    for (let locale of locales)
                    {
                        displayName[locale] = "test";
                    }

                    let instruction: GroupOptionInstruction = new GroupOptionInstruction(
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
                    compiler = new GroupOptionInstructionCompiler(instruction);
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
