import { ok } from "assert";
import { TempFile } from "@manuth/temp-files";
import { pathExists, writeJSON } from "fs-extra";
import { join } from "upath";
import { ThemeCompiler } from "../../../Compilation/Presentation/ThemeCompiler";
import { ThemeInstruction } from "../../../PackageSystem/Instructions/Customization/Presentation/ThemeInstruction";
import { Package } from "../../../PackageSystem/Package";
import { CompilerTester } from "../TestComponents/Testers/CompilerTester";
import { CompilerTestRunner } from "../TestComponents/TestRunners/CompilerTestRunner";

/**
 * Registers tests for the `ThemeCompiler` class.
 */
export function ThemeCompilerTests(): void
{
    let variableSource: TempFile;

    new class extends CompilerTestRunner<CompilerTester<ThemeCompiler>, ThemeCompiler>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): CompilerTester<ThemeCompiler>
        {
            let variableFileName = "myVariableFile.xml";

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
                    InstallSet: {
                        Instructions: []
                    }
                });

            extensionPackage.InstallSet.push(instruction);
            return new CompilerTester(new ThemeCompiler(instruction.Theme, variableFileName));
        }

        /**
         * @inheritdoc
         */
        protected async SuiteSetup(): Promise<void>
        {
            variableSource = new TempFile({ Suffix: ".json" });

            await writeJSON(
                variableSource.FullName,
                {
                    wcfHeaderBackground: "red"
                });

            await super.SuiteSetup();
        }

        /**
         * @inheritdoc
         */
        protected ExecuteTests(): void
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
    }("ThemeCompiler").Register();
}
