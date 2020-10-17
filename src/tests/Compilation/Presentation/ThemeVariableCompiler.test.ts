import { ok, strictEqual } from "assert";
import dedent = require("dedent");
import { ThemeVariableCompiler } from "../../../Compilation/Presentation/ThemeVariableCompiler";
import { XMLFileCompilerTester } from "../TestComponents/Testers/XMLFileCompilerTester";
import { XMLCompilerTestRunner } from "../TestComponents/TestRunners/XMLCompilerTestRunner";

/**
 * Registers tests for the `ThemeVariableCompiler` class.
 */
export function ThemeVariableCompilerTests(): void
{
    new class extends XMLCompilerTestRunner<XMLFileCompilerTester<ThemeVariableCompiler>, ThemeVariableCompiler>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): XMLFileCompilerTester<ThemeVariableCompiler>
        {
            return new XMLFileCompilerTester(
                new ThemeVariableCompiler(
                    {
                        wcfHeaderBackground: "rgba(255, 0, 0, 1)",
                        individualScss: dedent(
                            `
                                :root
                                {
                                    color: red !important;
                                }`)
                    }));
        }

        /**
         * @inheritdoc
         */
        protected ExecuteTests(): void
        {
            super.ExecuteTests();

            test(
                "Checking the integrity of the metadata…",
                () =>
                {
                    strictEqual(this.Tester.XMLEditor.TagName, "variables");

                    for (let variable of Object.keys(this.Compiler.Item))
                    {
                        ok(
                            this.Tester.XMLEditor.GetChildrenByTag("variable").some(
                                (variableNode) =>
                                {
                                    return (variableNode.GetAttribute("name") === variable) &&
                                        (variableNode.TextContent === this.Compiler.Item[variable]);
                                }));
                    }
                });
        }
    }("ThemeVariableCompiler").Register();
}
