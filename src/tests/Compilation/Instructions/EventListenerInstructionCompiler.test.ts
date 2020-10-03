import Assert = require("assert");
import FileSystem = require("fs-extra");
import { TempDirectory } from "temp-filesystem";
import { EventListenerInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/EventListenerInstructionCompiler";
import { EventListenerInstruction } from "../../../PackageSystem/Instructions/Events/EventListenerInstruction";
import { Package } from "../../../PackageSystem/Package";

/**
 * Registers tests for the `EventListenerInstructionCompiler` class.
 */
export function EventListenerInstructionCompilerTests(): void
{
    suite(
        "EventListenerInstructionCompiler",
        () =>
        {
            let tempDir: TempDirectory;
            let fileName: string;
            let compiler: EventListenerInstructionCompiler;

            suiteSetup(
                () =>
                {
                    let $package: Package = new Package(
                        {
                            Identifier: "test",
                            DisplayName: {},
                            InstallSet: {
                                Instructions: []
                            }
                        });

                    let instruction: EventListenerInstruction = new EventListenerInstruction(
                        {
                            FileName: "eventListeners.xml",
                            Listeners: []
                        });

                    $package.InstallSet.push(instruction);
                    compiler = new EventListenerInstructionCompiler(instruction);
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
                    Assert.strictEqual(await FileSystem.pathExists(fileName), true);
                });
        });
}
