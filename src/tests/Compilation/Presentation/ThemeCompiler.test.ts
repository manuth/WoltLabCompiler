import { ok } from "node:assert";
import { TempFile } from "@manuth/temp-files";
import fs from "fs-extra";
import path from "upath";
import { ThemeCompiler } from "../../../Compilation/Presentation/ThemeCompiler.js";
import { Theme } from "../../../Customization/Presentation/Themes/Theme.js";
import { ThemeInstruction } from "../../../PackageSystem/Instructions/Customization/Presentation/ThemeInstruction.js";
import { Package } from "../../../PackageSystem/Package.js";
import { CompilerTester } from "../TestComponents/Testers/CompilerTester.js";
import { CompilerTestRunner } from "../TestComponents/TestRunners/CompilerTestRunner.js";

const { pathExists, writeJSON } = fs;
const { join } = path;

/**
 * Registers tests for the {@link ThemeCompiler `ThemeCompiler`} class.
 */
export function ThemeCompilerTests(): void
{
    let theme: Theme;
    let variableSource: TempFile;

    new class extends CompilerTestRunner<CompilerTester<ThemeCompiler>, ThemeCompiler>
    {
        /**
         * @inheritdoc
         */
        protected override async SuiteSetup(): Promise<void>
        {
            variableSource = new TempFile({ Suffix: ".json" });

            let instruction: ThemeInstruction = new ThemeInstruction(
                {
                    Theme: {
                        Name: "foo",
                        DisplayName: {},
                        VariableFileName: variableSource.FullName
                    }
                });

            let extensionPackage: Package = new Package(
                {
                    Identifier: "bar",
                    DisplayName: {},
                    Version: "0.0.0",
                    InstallSet: {
                        Instructions: []
                    }
                });

            await writeJSON(
                variableSource.FullName,
                {
                    wcfHeaderBackground: "red"
                });

            extensionPackage.InstallSet.push(instruction);
            theme = await instruction.ThemeLoader.Load();
            return super.SuiteSetup();
        }

        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected override CreateTester(): CompilerTester<ThemeCompiler>
        {
            return new CompilerTester(new ThemeCompiler(theme, "myVariableFile.xml"));
        }

        /**
         * @inheritdoc
         */
        protected override ExecuteTests(): void
        {
            super.ExecuteTests();

            test(
                "Checking whether the theme-metadata exists…",
                async () =>
                {
                    ok(await pathExists(join(this.Compiler.DestinationPath, "style.xml")));
                });

            test(
                "Checking whether the variable-file exists…",
                async () =>
                {
                    ok(await pathExists(join(this.Compiler.DestinationPath, this.Compiler.VariableFileName)));
                });
        }
    }(nameof(ThemeCompiler)).Register();
}
