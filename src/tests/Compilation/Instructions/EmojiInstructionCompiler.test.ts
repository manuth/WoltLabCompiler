import { doesNotReject, ok } from "assert";
import { TempDirectory } from "@manuth/temp-files";
import { pathExists } from "fs-extra";
import { EmojiInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/EmojiInstructionCompiler";
import { EmojiInstruction } from "../../../PackageSystem/Instructions/Customization/EmojiInstruction";
import { Package } from "../../../PackageSystem/Package";

/**
 * Registers tests for the `EmojiInstructionCompiler` class.
 */
export function EmojiInstructionCompilerTests(): void
{
    suite(
        "EmojiInstructionCompiler",
        () =>
        {
            let tempDir: TempDirectory;
            let fileName: string;
            let compiler: EmojiInstructionCompiler;

            suiteSetup(
                () =>
                {
                    tempDir = new TempDirectory();

                    let $package: Package = new Package(
                        {
                            Identifier: "test",
                            DisplayName: {},
                            InstallSet: {
                                Instructions: []
                            }
                        });

                    let instruction: EmojiInstruction = new EmojiInstruction(
                        {
                            FileName: "emojis.xml",
                            Emojis: []
                        });

                    $package.InstallSet.push(instruction);
                    compiler = new EmojiInstructionCompiler(instruction);
                    compiler.DestinationPath = tempDir.FullName;
                    fileName = compiler.DestinationFileName;
                });

            test(
                "Checking whether the compiler can be executed…",
                async () =>
                {
                    await doesNotReject(async () => compiler.Execute());
                });

            test(
                "Checking whether the compiled file exists…",
                async () =>
                {
                    ok(await pathExists(fileName));
                });
        });
}
