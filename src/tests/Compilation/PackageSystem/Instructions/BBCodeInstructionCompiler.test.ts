import { BBCodeInstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/BBCodeInstructionCompiler";
import { ILocalization } from "../../../../Globalization/ILocalization";
import { BBCodeInstruction } from "../../../../PackageSystem/Instructions/Customization/BBCodeInstruction";
import { CompilerTester } from "../../TestComponents/Testers/CompilerTester";
import { LocalizationInstructionCompilerTestRunner } from "../../TestComponents/TestRunners/LocalizationInstructionCompilerTestRunner";

/**
 * Registers tests for the {@link BBCodeInstructionCompiler `BBCodeInstructionCompiler`} class.
 */
export function BBCodeInstructionCompilerTests(): void
{
    new class extends LocalizationInstructionCompilerTestRunner<CompilerTester<BBCodeInstructionCompiler>, BBCodeInstructionCompiler>
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
