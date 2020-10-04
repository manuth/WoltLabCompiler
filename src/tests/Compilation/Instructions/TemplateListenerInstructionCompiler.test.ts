import { strictEqual } from "assert";
import { TempDirectory } from "@manuth/temp-files";
import { pathExists } from "fs-extra";
import { TemplateListenerInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/TemplateListenerInstructionCompiler";
import { TemplateListenerInstruction } from "../../../PackageSystem/Instructions/Events/TemplateListenerInstruction";
import { Package } from "../../../PackageSystem/Package";

/**
 * Registers tests for the `TemplateListenerInstructionCompiler` class.
 */
export function TemplateListenerInstructionCompilerTests(): void
{
    suite(
        "TemplateListenerInstructionCompiler",
        () =>
        {
            let tempDir: TempDirectory;
            let fileName: string;
            let compiler: TemplateListenerInstructionCompiler;

            suiteSetup(
                () =>
                {
                    let extensionPackage: Package = new Package(
                        {
                            Identifier: "test",
                            DisplayName: {},
                            InstallSet: {
                                Instructions: []
                            }
                        });

                    let instruction: TemplateListenerInstruction = new TemplateListenerInstruction(
                        {
                            FileName: "eventListeners.xml",
                            Listeners: []
                        });

                    extensionPackage.InstallSet.push(instruction);
                    compiler = new TemplateListenerInstructionCompiler(instruction);
                    compiler.DestinationPath = tempDir.FullName;
                    fileName = compiler.DestinationFileName;
                });

            test(
                "Checking whether the compiler can be executed…",
                async () =>
                {
                    await compiler.Execute();
                });

            test(
                "Checking whether the compiled file exists…",
                async () =>
                {
                    strictEqual(await pathExists(fileName), true);
                });
        });
}
