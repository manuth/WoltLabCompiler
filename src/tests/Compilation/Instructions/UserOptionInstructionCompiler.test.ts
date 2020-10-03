import Assert = require("assert");
import FileSystem = require("fs-extra");
import { TempDirectory } from "temp-filesystem";
import { UserOptionInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/UserOptionInstructionCompiler";
import { ILocalization } from "../../../Globalization/ILocalization";
import { UserOptionInstruction } from "../../../PackageSystem/Instructions/Options/UserOptionInstruction";
import { Package } from "../../../PackageSystem/Package";

/**
 * Registers tests for the `UserOptionInstructionCompiler` class.
 */
export function UserOptionInstructionCompilerTests(): void
{
    suite(
        "UserOptionInstructionCompiler",
        () =>
        {
            let fileName: string;
            let translationDir: string;
            let tempDir: TempDirectory;
            let compiler: UserOptionInstructionCompiler;
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

                    let instruction: UserOptionInstruction = new UserOptionInstruction(
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
                    compiler = new UserOptionInstructionCompiler(instruction);
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
                            Assert.strictEqual(await FileSystem.pathExists(fileName), true);
                        });

                    test(
                        "Checking whether the language-files exist…",
                        async () =>
                        {
                            let files: string[] = await FileSystem.readdir(translationDir);
                            Assert.strictEqual(locales.every((locale: string) => files.includes(`${locale}.xml`)), true);
                        });
                });
        });
}
