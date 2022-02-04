import { ACPOptionInstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/ACPOptionInstructionCompiler";
import { ILocalization } from "../../../../Globalization/ILocalization";
import { ACPOptionInstruction } from "../../../../PackageSystem/Instructions/Options/ACPOptionInstruction";
import { CompilerTester } from "../../TestComponents/Testers/CompilerTester";
import { LocalizationProviderCompilerTestRunner } from "../../TestComponents/TestRunners/LocalizationProviderCompilerTestRunner";

/**
 * Registers tests for the {@link ACPOptionInstructionCompiler `ACPOptionInstructionCompiler`} class.
 */
export function ACPOptionInstructionCompilerTests(): void
{
    new class extends LocalizationProviderCompilerTestRunner<CompilerTester<ACPOptionInstructionCompiler>, ACPOptionInstructionCompiler>
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
    }(nameof(ACPOptionInstructionCompiler)).Register();
}
