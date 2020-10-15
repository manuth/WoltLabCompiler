import { strictEqual } from "assert";
import { readdir } from "fs-extra";
import { parse } from "upath";
import { LocalizationSetCompiler } from "../../../Compilation/Globalization/LocalizationSetCompiler";
import { ILocalization } from "../../../Globalization/ILocalization";
import { TranslationInstruction } from "../../../PackageSystem/Instructions/Globalization/TranslationInstruction";
import { CompilerTester } from "../TestComponents/Testers/CompilerTester";
import { CompilerTestRunner } from "../TestComponents/TestRunners/CompilerTestRunner";

/**
 * Registers tests for the `LocalizationInstructionCompiler` class.
 */
export function LocalizationSetCompilerTests(): void
{
    new class extends CompilerTestRunner<CompilerTester<LocalizationSetCompiler>, LocalizationSetCompiler>
    {
        /**
         * @inheritdoc
         *
         * @returns
         * The new compiler-tester instance.
         */
        protected CreateTester(): CompilerTester<LocalizationSetCompiler>
        {
            let localization: ILocalization = {};
            let locales = ["en", "it", "fr"];

            for (let locale of locales)
            {
                localization[locale] = "example";
            }

            let instruction = new TranslationInstruction(
                {
                    FileName: "language",
                    Nodes: [
                        {
                            Name: "foo",
                            Item: {
                                Translations: localization
                            }
                        }
                    ]
                });

            return new CompilerTester(new LocalizationSetCompiler(instruction.GetMessages()));
        }

        /**
         * @inheritdoc
         */
        protected ExecuteTests(): void
        {
            super.ExecuteTests();

            test(
                "Checking whether all the expected files exist…",
                async () =>
                {
                    let locales = Object.keys(this.Compiler.Item);
                    let files = await readdir(this.Compiler.DestinationPath);

                    strictEqual(
                        files.every(
                            (file: string) =>
                            {
                                return locales.includes(parse(file).name);
                            }),
                        true);

                    strictEqual(
                        locales.every(
                            (locale: string) =>
                            {
                                return files.includes(`${locale}.xml`);
                            }),
                        true);
                });
        }
    }("LocalizationInstructionCompiler").Register();
}
