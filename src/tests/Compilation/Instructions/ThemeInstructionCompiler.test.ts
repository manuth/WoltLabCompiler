import { strictEqual } from "assert";
import { TempDirectory } from "@manuth/temp-files";
import dedent = require("dedent");
import { pathExists, writeFile } from "fs-extra";
import { extract } from "tar";
import { ThemeInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/ThemeInstructionCompiler";
import { ThemeInstruction } from "../../../PackageSystem/Instructions/Customization/Presentation/ThemeInstruction";
import { Package } from "../../../PackageSystem/Package";

/**
 * Registers tests for the `ThemeInstructionCompiler` class.
 */
export function ThemeInstructionCompilerTests(): void
{
    suite(
        "ThemeInstructionCompiler",
        () =>
        {
            let themeArchive: string;
            let tempDir: TempDirectory;
            let themeDir: TempDirectory;
            let compiler: ThemeInstructionCompiler;
            let instruction: ThemeInstruction;

            suiteSetup(
                async () =>
                {
                    tempDir = new TempDirectory();
                    themeDir = new TempDirectory();

                    let extensionPackage: Package = new Package(
                        {
                            Identifier: "foo",
                            DisplayName: {},
                            InstallSet: {
                                Instructions: []
                            }
                        });

                    let resourceDir: TempDirectory = new TempDirectory();

                    await writeFile(
                        resourceDir.MakePath("variables.json"),
                        dedent(`
                            {
                                "wcfHeaderBackground": "red",
                                "somethingSpecial": "test-value",
                                "moreSpecialStuff": "foobar"
                            }`));

                    await writeFile(
                        resourceDir.MakePath("main.scss"),
                        dedent(`
                            :root
                            {
                                color: red !important;
                            }`));

                    instruction = new ThemeInstruction(
                        {
                            Theme: {
                                Name: "test-theme",
                                DisplayName: {},
                                VariableFileName: resourceDir.MakePath("variables.json"),
                                CustomScssFileName: resourceDir.MakePath("main.scss")
                            }
                        });

                    resourceDir.Dispose();
                    extensionPackage.InstallSet.push(instruction);
                    compiler = new ThemeInstructionCompiler(instruction);
                    compiler.DestinationPath = tempDir.FullName;
                    themeArchive = tempDir.MakePath(instruction.FullName);
                });

            suiteTeardown(
                () =>
                {
                    tempDir.Dispose();
                    themeDir.Dispose();
                });

            suite(
                "Compile",
                () =>
                {
                    test(
                        "Checking whether the instruction can be compiled without any errors…",
                        async () =>
                        {
                            await compiler.Execute();
                        });

                    test(
                        "Checking whether the tar-archive has been created…",
                        async () =>
                        {
                            strictEqual(await pathExists(themeArchive), true);
                        });

                    test(
                        "Checking whether the tar-archive can be extracted without an error…",
                        async () =>
                        {
                            await extract(
                                {
                                    cwd: themeDir.FullName,
                                    file: themeArchive
                                });
                        });

                    test(
                        "Checking whether the files expected in the tar-archive exist…",
                        async () =>
                        {
                            strictEqual(await pathExists(themeDir.MakePath("style.xml")), true);
                            strictEqual(await pathExists(themeDir.MakePath("variables.xml")), true);
                        });
                });
        });
}
