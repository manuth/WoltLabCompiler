import { ok } from "node:assert";
import { join } from "node:path";
import { TempDirectory } from "@manuth/temp-files";
import dedent from "dedent";
import fs from "fs-extra";
import { extract } from "tar";
import path from "upath";
import { ThemeInstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/ThemeInstructionCompiler.js";
import { ThemeInstruction } from "../../../../PackageSystem/Instructions/Customization/Presentation/ThemeInstruction.js";
import { Tar } from "../../../Tar.js";
import { CompilerTester } from "../../TestComponents/Testers/CompilerTester.js";
import { InstructionCompilerTestRunner } from "../../TestComponents/TestRunners/InstructionCompilerTestRunner.js";

const { writeFile } = fs;
const { parse } = path;

/**
 * Registers tests for the {@link ThemeInstructionCompiler `ThemeInstructionCompiler`} class.
 */
export function ThemeInstructionCompilerTests(): void
{
    let resourceDir: TempDirectory;
    let tempDir: TempDirectory;
    let variableFile: string;
    let stylesFile: string;
    let overridesFile: string;
    let themeArchiveFile: string;

    new class extends InstructionCompilerTestRunner<CompilerTester<ThemeInstructionCompiler>, ThemeInstructionCompiler>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): CompilerTester<ThemeInstructionCompiler>
        {
            return new CompilerTester(
                new ThemeInstructionCompiler(
                    new ThemeInstruction(
                        {
                            Theme: {
                                Name: "test-theme",
                                DisplayName: {},
                                VariableFileName: variableFile,
                                CustomScssFileName: stylesFile,
                                ScssOverrideFileName: overridesFile
                            }
                        })));
        }

        /**
         * @inheritdoc
         */
        protected override async SuiteSetup(): Promise<void>
        {
            resourceDir = new TempDirectory();
            tempDir = new TempDirectory();
            variableFile = resourceDir.MakePath("variables.json");
            stylesFile = resourceDir.MakePath("main.scss");
            overridesFile = resourceDir.MakePath("overrides.scss");

            await writeFile(
                variableFile,
                dedent(
                    `
                    {
                        "wcfHeaderBackground": "red",
                        "somethingSpecial": "test-value",
                        "moreSpecialStuff": "foobar"
                    }`));

            await writeFile(
                stylesFile,
                dedent(
                    `
                    :root
                    {
                        color: red !important;
                    }`));

            await writeFile(overridesFile, '$wcfHeaderBackground: "green";');
            await super.SuiteSetup();
            themeArchiveFile = join(this.Compiler.DestinationPath, this.Compiler.Item.FullName);
        }

        /**
         * @inheritdoc
         */
        protected override ExecuteTests(): void
        {
            super.ExecuteTests();

            test(
                "Checking whether the tar-archive can be extracted without an error…",
                async () =>
                {
                    await extract(
                        {
                            cwd: tempDir.FullName,
                            file: themeArchiveFile
                        });
                });

            test(
                "Checking whether the files expected in the tar-archive exist…",
                async () =>
                {
                    let files = await Tar.ListTarFiles(
                        {
                            file: themeArchiveFile,
                            filter: (path) =>
                            {
                                return parse(path).dir.length === 0;
                            }
                        });

                    ok(files.includes("style.xml"));
                    ok(files.includes("variables.xml"));
                });
        }
    }(nameof(ThemeInstructionCompiler)).Register();
}
