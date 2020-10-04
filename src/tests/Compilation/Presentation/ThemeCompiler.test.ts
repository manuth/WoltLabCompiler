import { strictEqual } from "assert";
import { TempDirectory, TempFile } from "@manuth/temp-files";
import { pathExists, writeJSON } from "fs-extra";
import { ThemeCompiler } from "../../../Compilation/Presentation/ThemeCompiler";
import { ThemeInstruction } from "../../../PackageSystem/Instructions/Customization/Presentation/ThemeInstruction";
import { Package } from "../../../PackageSystem/Package";

/**
 * Registers tests for the `ThemeCompiler` class.
 */
export function ThemeCompilerTests(): void
{
    suite(
        "ThemeCompiler",
        () =>
        {
            let tempDir: TempDirectory;
            let variableFile: TempFile;
            let variableFileName: string;
            let compiler: ThemeCompiler;

            suiteSetup(
                async () =>
                {
                    tempDir = new TempDirectory();

                    variableFile = new TempFile(
                        {
                            Suffix: ".json"
                        });

                    variableFileName = "myVariableFile.xml";

                    await writeJSON(
                        variableFile.FullName,
                        {
                            wcfHeaderBackground: "red"
                        });

                    let instruction: ThemeInstruction = new ThemeInstruction(
                        {
                            Theme: {
                                Name: "foo",
                                DisplayName: {},
                                VariableFileName: variableFile.FullName
                            }
                        });

                    let extensionPackage: Package = new Package(
                        {
                            Identifier: "bar",
                            DisplayName: {},
                            InstallSet: {
                                Instructions: []
                            }
                        });

                    extensionPackage.InstallSet.push(instruction);
                    compiler = new ThemeCompiler(instruction.Theme, variableFileName);
                    compiler.DestinationPath = tempDir.FullName;
                });

            suiteTeardown(
                () =>
                {
                    tempDir.Dispose();
                    variableFile.Dispose();
                });

            suite(
                "Compile",
                () =>
                {
                    test(
                        "Checking whether themes can be compiled without an error…",
                        async () =>
                        {
                            await compiler.Execute();
                        });

                    test(
                        "Checking whether the theme-metadata exists…",
                        async () =>
                        {
                            strictEqual(await pathExists(tempDir.MakePath("style.xml")), true);
                        });

                    test(
                        "Checking whether the variable-file exists…",
                        async () =>
                        {
                            strictEqual(await pathExists(tempDir.MakePath(variableFileName)), true);
                        });
                });
        });
}
