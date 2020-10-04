import { doesNotReject, ok } from "assert";
import { TempDirectory } from "@manuth/temp-files";
import { pathExists } from "fs-extra";
import { CronJobInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/CronJobInstructionCompiler";
import { ACPOptionInstruction } from "../../../PackageSystem/Instructions/Options/ACPOptionInstruction";
import { CronJobInstruction } from "../../../PackageSystem/Instructions/Tasks/CronJobInstruction";
import { Package } from "../../../PackageSystem/Package";
import { TimePeriod } from "../../../Tasks/TimePeriod";

/**
 * Registers tests for the `CronJobInstructionCompiler` class.
 */
export function CronJobInstructionCompilerTests(): void
{
    suite(
        "CronJobInstructionCompiler",
        () =>
        {
            let tempDir: TempDirectory;
            let fileName: string;
            let compiler: CronJobInstructionCompiler;
            let instruction: CronJobInstruction;

            suiteSetup(
                () =>
                {
                    tempDir = new TempDirectory();
                    let $package: Package = new Package(
                        {
                            Identifier: "foo",
                            DisplayName: {},
                            InstallSet: {
                                Instructions: [
                                    new ACPOptionInstruction(
                                        {
                                            FileName: null,
                                            Nodes: [
                                                {
                                                    ID: "foo",
                                                    Name: "this-is-a-test"
                                                }
                                            ]
                                        })
                                ]
                            }
                        });

                    instruction = new CronJobInstruction(
                        {
                            FileName: "cronJobs.xml",
                            CronJobs: [
                                {
                                    Name: "foo",
                                    ClassName: "bar",
                                    Period: TimePeriod.Monthly
                                }
                            ]
                        });

                    $package.InstallSet.push(instruction);
                    compiler = new CronJobInstructionCompiler(instruction);
                    compiler.DestinationPath = tempDir.FullName;
                    fileName = compiler.DestinationFileName;
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
                        "Checking whether the instruction can be compiled without an error…",
                        async () =>
                        {
                            await doesNotReject(async () => compiler.Execute());
                        });

                    test(
                        "Checking whether the expected file exists…",
                        async () =>
                        {
                            ok(await pathExists(fileName));
                        });
                });
        });
}
