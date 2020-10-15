import { InstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/InstructionCompiler";
import { LocalizationInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/LocalizationInstructionCompiler";
import { ILocalization } from "../../../Globalization/ILocalization";
import { ILocalizationInstruction } from "../../../PackageSystem/Instructions/Globalization/ILocalizationInstruction";
import { TranslationInstruction } from "../../../PackageSystem/Instructions/Globalization/TranslationInstruction";
import { CompilerTester } from "../TestComponents/Testers/CompilerTester";
import { LocalizationInstructionCompilerTestRunner } from "../TestComponents/TestRunners/LocalizationInstructionCompilerTestRunner";

/**
 * Registers tests for the `LocalizationInstructionCompiler` class.
 */
export function LocalizationInstructionCompilerTests(): void
{
    new class extends LocalizationInstructionCompilerTestRunner<CompilerTester<InstructionCompiler<ILocalizationInstruction>>, InstructionCompiler<ILocalizationInstruction>>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): CompilerTester<InstructionCompiler<ILocalizationInstruction>>
        {
            let localization: ILocalization = {};
            let locales = ["en", "it", "fr"];

            for (let locale of locales)
            {
                localization[locale] = "example";
            }

            return new CompilerTester(
                new LocalizationInstructionCompiler(
                    new TranslationInstruction(
                        {
                            FileName: "",
                            Nodes: [
                                {
                                    Name: "foo",
                                    Item: {
                                        Translations: localization
                                    }
                                }
                            ]
                        })));
        }
    }("LocalizationInstructionCompiler").Register();
}
