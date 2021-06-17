import { ok, strictEqual } from "assert";
import dedent = require("dedent");
import { ThemeVariableCompiler } from "../../../Compilation/Presentation/ThemeVariableCompiler";
import { XMLFileCompilerTester } from "../TestComponents/Testers/XMLFileCompilerTester";
import { XMLCompilerTestRunner } from "../TestComponents/TestRunners/XMLCompilerTestRunner";

/**
 * Registers tests for the {@link ThemeVariableCompiler `ThemeVariableCompiler`} class.
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
                    new Map(
                        Object.entries(
                            {
                                wcfHeaderBackground: "rgba(255, 0, 0, 1)",
                                individualScss: dedent(
                                    `
                                    :root
                                    {
                                        color: red !important;
                                    }`)
                            }))));
        }

        /**
         * @inheritdoc
         */
        protected override ExecuteTests(): void
        {
            super.ExecuteTests();

            test(
                "Checking the integrity of the metadata…",
                () =>
                {
                    strictEqual(this.Tester.XMLEditor.TagName, "variables");

                    for (let variableEntry of this.Compiler.Item)
                    {
                        ok(
                            this.Tester.XMLEditor.GetChildrenByTag("variable").some(
                                (variableNode) =>
                                {
                                    return (variableNode.GetAttribute("name") === variableEntry[0]) &&
                                        (variableNode.TextContent === variableEntry[1]);
                                }));
                    }
                });
        }
    }("ThemeVariableCompiler").Register();
}
