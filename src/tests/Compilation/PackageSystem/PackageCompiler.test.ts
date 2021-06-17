import { ok } from "assert";
import { TempDirectory, TempFile } from "@manuth/temp-files";
import { extract } from "tar";
import { join, normalize } from "upath";
import { PackageCompiler } from "../../../Compilation/PackageSystem/PackageCompiler";
import { BBCodeInstruction } from "../../../PackageSystem/Instructions/Customization/BBCodeInstruction";
import { InstructionSet } from "../../../PackageSystem/Instructions/InstructionSet";
import { Package } from "../../../PackageSystem/Package";
import { Tar } from "../../Tar";
import { CompilerTester } from "../TestComponents/Testers/CompilerTester";
import { CompilerTestRunner } from "../TestComponents/TestRunners/CompilerTestRunner";

/**
 * Registers tests for the {@link PackageCompiler `PackageCompiler`} class.
 */
export function PackageCompilerTests(): void
{
    let tempDir: TempDirectory;

    new class extends CompilerTestRunner<CompilerTester<PackageCompiler>, PackageCompiler>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): CompilerTester<PackageCompiler>
        {
            return new CompilerTester(
                new PackageCompiler(
                    new Package(
                        {
                            Identifier: "com.example.mypackage",
                            DisplayName: {},
                            InstallSet: {
                                Instructions: [
                                    new BBCodeInstruction(
                                        {
                                            FileName: "bbCodes.xml",
                                            BBCodes: []
                                        })
                                ]
                            },
                            UpdateSets: [
                                {
                                    FromVersion: "1.0.0",
                                    Instructions: [
                                        new BBCodeInstruction(
                                            {
                                                FileName: "bbCodes.xml",
                                                BBCodes: []
                                            })
                                    ]
                                },
                                {
                                    FromVersion: "2.0.0",
                                    Directory: "updates/v2.0.0",
                                    Instructions: [
                                        new BBCodeInstruction(
                                            {
                                                FileName: "bbCodes.xml",
                                                BBCodes: []
                                            })
                                    ]
                                }
                            ]
                        })));
        }

        /**
         * @inheritdoc
         */
        protected override async SuiteSetup(): Promise<void>
        {
            tempDir = new TempDirectory();
            return super.SuiteSetup();
        }

        /**
         * @inheritdoc
         */
        protected override ExecuteTests(): void
        {
            super.ExecuteTests();

            test(
                "Checking whether the tar-archive can be extracted…",
                async () =>
                {
                    await extract(
                        {
                            cwd: tempDir.FullName,
                            file: this.Compiler.DestinationPath
                        });
                });

            test(
                "Checking whether the package-manifest exists inside the tar-archive…",
                async () =>
                {
                    let files = await Tar.ListTarFiles(
                        {
                            file: this.Compiler.DestinationPath
                        });

                    ok(files.includes("package.xml"));
                });

            test(
                "Checking whether all instruction-sets are compiled…",
                async () =>
                {
                    let tempFile = new TempFile();
                    this.Compiler.DestinationPath = tempFile.FullName;
                    await this.Compiler.Execute();

                    await this.ValidateComponentFiles(this.Compiler.Item.InstallSet);

                    for (let instructionSet of this.Compiler.Item.UpdateSets)
                    {
                        await this.ValidateComponentFiles(instructionSet);
                    }
                });
        }

        /**
         * Assets the existence of the component-files of the instruction-set.
         *
         * @param instructionSet
         * The instruction-set to check
         */
        protected async ValidateComponentFiles(instructionSet: InstructionSet): Promise<void>
        {
            let files = (
                await Tar.ListTarFiles(
                    {
                        file: this.Compiler.DestinationPath
                    })).map(
                        (fileEntry) => normalize(fileEntry));

            for (let component of instructionSet)
            {
                ok(files.includes(join(instructionSet.Directory, component.FileName)));
            }
        }
    }("PackageCompiler").Register();
}
