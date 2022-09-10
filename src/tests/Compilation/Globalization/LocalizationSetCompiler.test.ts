import { strictEqual } from "assert";
import fs from "fs-extra";
import path from "upath";
import { LocalizationSetCompiler } from "../../../Compilation/Globalization/LocalizationSetCompiler.js";
import { ILocalization } from "../../../Globalization/ILocalization.js";
import { TranslationInstruction } from "../../../PackageSystem/Instructions/Globalization/TranslationInstruction.js";
import { CompilerTester } from "../TestComponents/Testers/CompilerTester.js";
import { CompilerTestRunner } from "../TestComponents/TestRunners/CompilerTestRunner.js";

const { readdir } = fs;
const { parse } = path;

/**
 * Registers tests for the {@link LocalizationSetCompiler `LocalizationSetCompiler`} class.
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
        protected override ExecuteTests(): void
        {
            super.ExecuteTests();

            test(
                "Checking whether all expected files exist…",
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
    }(nameof(LocalizationSetCompiler)).Register();
}
