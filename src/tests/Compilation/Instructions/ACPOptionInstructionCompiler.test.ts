import { ok } from "assert";
import { readdir } from "fs-extra";
import { join } from "upath";
import { ACPOptionInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/ACPOptionInstructionCompiler";
import { ILocalization } from "../../../Globalization/ILocalization";
import { ACPOptionInstruction } from "../../../PackageSystem/Instructions/Options/ACPOptionInstruction";
import { CompilerTester } from "../TestComponents/Testers/CompilerTester";
import { InstructionCompilerTestRunner } from "../TestComponents/TestRunners/InstructionCompilerTestRunner";

/**
 * Registers tests for the `ACPOptionInstructionCompiler` class.
 */
export function ACPOptionInstructionCompilerTests(): void
{
    new class extends InstructionCompilerTestRunner<CompilerTester<ACPOptionInstructionCompiler>, ACPOptionInstructionCompiler>
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
                    let files = await readdir(
                        join(
                            this.Compiler.DestinationPath,
                            this.Compiler.Item.DestinationRoot,
                            this.Compiler.Item.TranslationDirectory));

                    let locales = Object.keys(this.Compiler.Item.GetMessages());
                    ok(locales.every((locale) => files.includes(`${locale}.xml`)));
                });
        }
    }("ACPOptionInstructionCompiler").Register();
}
