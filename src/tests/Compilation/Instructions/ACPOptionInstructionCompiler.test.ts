import { ok } from "assert";
import { pathExists, readdir } from "fs-extra";
import { join } from "upath";
import { ACPOptionInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/ACPOptionInstructionCompiler";
import { ILocalization } from "../../../Globalization/ILocalization";
import { ACPOptionInstruction } from "../../../PackageSystem/Instructions/Options/ACPOptionInstruction";
import { Package } from "../../../PackageSystem/Package";
import { CompilerTester } from "../TestComponents/Testers/CompilerTester";
import { CompilerTestRunner } from "../TestComponents/TestRunners/CompilerTestRunner";

/**
 * Registers tests for the `ACPOptionInstructionCompiler` class.
 */
export function ACPOptionInstructionCompilerTests(): void
{
    new class extends CompilerTestRunner<CompilerTester<ACPOptionInstructionCompiler>, ACPOptionInstructionCompiler>
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

            let tester = new CompilerTester(
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

            new Package(
                {
                    Identifier: "foo",
                    DisplayName: {},
                    InstallSet: {
                        Instructions: []
                    }
                }).InstallSet.push(tester.Compiler.Item);

            return tester;
        }

        /**
         * @inheritdoc
         */
        protected ExecuteTests(): void
        {
            super.ExecuteTests();

            test(
                "Checking whether the options-file exists…",
                async () =>
                {
                    ok(await pathExists(this.Compiler.DestinationFileName));
                });

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
