import { BBCodeInstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/BBCodeInstructionCompiler.js";
import { ILocalization } from "../../../../Globalization/ILocalization.js";
import { BBCodeInstruction } from "../../../../PackageSystem/Instructions/Customization/BBCodeInstruction.js";
import { CompilerTester } from "../../TestComponents/Testers/CompilerTester.js";
import { LocalizationProviderCompilerTestRunner } from "../../TestComponents/TestRunners/LocalizationProviderCompilerTestRunner.js";

/**
 * Registers tests for the {@link BBCodeInstructionCompiler `BBCodeInstructionCompiler`} class.
 */
export function BBCodeInstructionCompilerTests(): void
{
    new class extends LocalizationProviderCompilerTestRunner<CompilerTester<BBCodeInstructionCompiler>, BBCodeInstructionCompiler>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): CompilerTester<BBCodeInstructionCompiler>
        {
            let displayName: ILocalization = {};
            let locales = ["de", "en", "it"];

            for (let locale of locales)
            {
                displayName[locale] = "test";
            }

            return new CompilerTester(
                new BBCodeInstructionCompiler(
                    new BBCodeInstruction(
                        {
                            FileName: "bbCodes.xml",
                            BBCodes: [
                                {
                                    Name: "bar",
                                    DisplayName: displayName
                                }
                            ],
                            TranslationDirectory: "bbCodeLanguageStuff"
                        })));
        }
    }(nameof(BBCodeInstructionCompiler)).Register();
}
