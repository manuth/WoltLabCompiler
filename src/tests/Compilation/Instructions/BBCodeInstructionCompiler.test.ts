import { ok } from "assert";
import { readdir } from "fs-extra";
import { join } from "upath";
import { BBCodeInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/BBCodeInstructionCompiler";
import { ILocalization } from "../../../Globalization/ILocalization";
import { BBCodeInstruction } from "../../../PackageSystem/Instructions/Customization/BBCodeInstruction";
import { CompilerTester } from "../TestComponents/Testers/CompilerTester";
import { InstructionCompilerTestRunner } from "../TestComponents/TestRunners/InstructionCompilerTestRunner";

/**
 * Registers tests for the `BBCodeInstructionCompiler` class.
 */
export function BBCodeInstructionCompilerTests(): void
{
    new class extends InstructionCompilerTestRunner<CompilerTester<BBCodeInstructionCompiler>, BBCodeInstructionCompiler>
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

        /**
         * @inheritdoc
         */
        protected ExecuteTests(): void
        {
            super.ExecuteTests();

            test(
                "Checking whether the language-files exist…",
                async () =>
                {
                    let locales = Object.keys(this.Compiler.Item.GetMessages());

                    let files = await readdir(
                        join(
                            this.Compiler.DestinationPath,
                            this.Compiler.Item.DestinationRoot,
                            this.Compiler.Item.TranslationDirectory));

                    ok(locales.every((locale: string) => files.includes(`${locale}.xml`)));
                });
        }
    }("BBCodeInstructionCompiler").Register();
}
