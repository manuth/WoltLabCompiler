import { ok } from "assert";
import { TempFile } from "@manuth/temp-files";
import { pathExists, writeJSON } from "fs-extra";
import { join } from "upath";
import { ThemeCompiler } from "../../../Compilation/Presentation/ThemeCompiler";
import { Theme } from "../../../Customization/Presentation/Themes/Theme";
import { ThemeInstruction } from "../../../PackageSystem/Instructions/Customization/Presentation/ThemeInstruction";
import { Package } from "../../../PackageSystem/Package";
import { CompilerTester } from "../TestComponents/Testers/CompilerTester";
import { CompilerTestRunner } from "../TestComponents/TestRunners/CompilerTestRunner";

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
                    Version: "",
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
