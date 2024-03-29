import { ok, strictEqual } from "node:assert";
import dedent from "dedent";
import { ThemeVariableCompiler } from "../../../Compilation/Presentation/ThemeVariableCompiler.js";
import { XMLFileCompilerTester } from "../TestComponents/Testers/XMLFileCompilerTester.js";
import { XMLCompilerTestRunner } from "../TestComponents/TestRunners/XMLCompilerTestRunner.js";

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
    }(nameof(ThemeVariableCompiler)).Register();
}
