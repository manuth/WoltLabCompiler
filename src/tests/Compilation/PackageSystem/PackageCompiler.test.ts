import { ok } from "assert";
import { TempDirectory } from "@manuth/temp-files";
import { extract, list } from "tar";
import { PackageCompiler } from "../../../Compilation/PackageSystem/PackageCompiler";
import { Package } from "../../../PackageSystem/Package";
import { CompilerTester } from "../TestComponents/Testers/CompilerTester";
import { CompilerTestRunner } from "../TestComponents/TestRunners/CompilerTestRunner";

/**
 * Registers tests for the `PackageCompiler` class.
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
                                Instructions: []
                            }
                        })));
        }

        /**
         * @inheritdoc
         */
        protected async SuiteSetup(): Promise<void>
        {
            tempDir = new TempDirectory();
            await super.SuiteSetup();
        }

        /**
         * @inheritdoc
         */
        protected ExecuteTests(): void
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
                    let files: string[] = [];

                    await list(
                        {
                            file: this.Compiler.DestinationPath,
                            onentry: (entry) =>
                            {
                                files.push(entry.header.path);
                            }
                        });

                    ok(files.includes("package.xml"));
                });
        }
    }("PackageCompiler").Register();
}
