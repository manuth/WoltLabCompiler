import { ACPOptionInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/ACPOptionInstructionCompiler";
import { ILocalization } from "../../../Globalization/ILocalization";
import { ACPOptionInstruction } from "../../../PackageSystem/Instructions/Options/ACPOptionInstruction";
import { CompilerTester } from "../TestComponents/Testers/CompilerTester";
import { OptionInstructionCompilerTestRunner } from "../TestComponents/TestRunners/OptionInstructionCompilerTestRunner";

/**
 * Registers tests for the `ACPOptionInstructionCompiler` class.
 */
export function ACPOptionInstructionCompilerTests(): void
{
    new class extends OptionInstructionCompilerTestRunner<CompilerTester<ACPOptionInstructionCompiler>, ACPOptionInstructionCompiler>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): CompilerTester<ACPOptionInstructionCompiler>
        {
            let displayName: ILocalization = {};
            let locales = ["en", "de", "it", "fr"];

            for (let locale of locales)
            {
                displayName[locale] = "test";
            }

            return new CompilerTester(
                new ACPOptionInstructionCompiler(
                    new ACPOptionInstruction(
                        {
                            FileName: "options.xml",
                            Nodes: [
                                {
                                    Name: "bar",
                                    Item: {
                                        DisplayName: displayName
                                    }
                                }
                            ]
                        })));
        }
    }("ACPOptionInstructionCompiler").Register();
}
