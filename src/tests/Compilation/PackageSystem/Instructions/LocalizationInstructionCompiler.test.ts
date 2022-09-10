import { ok } from "assert";
import { Random } from "random-js";
import { createSandbox, SinonSandbox } from "sinon";
import path from "upath";
import { InstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/InstructionCompiler.js";
import { LocalizationInstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/LocalizationInstructionCompiler.js";
import { ILocalization } from "../../../../Globalization/ILocalization.js";
import { ILocalizationInstruction } from "../../../../PackageSystem/Instructions/Globalization/ILocalizationInstruction.js";
import { TranslationInstruction } from "../../../../PackageSystem/Instructions/Globalization/TranslationInstruction.js";
import { XMLEditor } from "../../../../Serialization/XMLEditor.js";
import { CompilerTester } from "../../TestComponents/Testers/CompilerTester.js";
import { LocalizationInstructionCompilerTestRunner } from "../../TestComponents/TestRunners/LocalizationInstructionCompilerTestRunner.js";

const { join } = path;

/**
 * Registers tests for the {@link LocalizationInstructionCompiler `LocalizationInstructionCompiler`} class.
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

        /**
         * @inheritdoc
         */
        protected override SerializeTests(): void
        {
            let sandbox: SinonSandbox;
            let random: Random;
            let editor: XMLEditor;

            suiteSetup(
                () =>
                {
                    random = new Random();
                });

            setup(
                () =>
                {
                    let translationDirectory = random.string(10);
                    sandbox = createSandbox();
                    sandbox.replaceGetter(this.Compiler.Item, "TranslationDirectory", () => translationDirectory);
                    editor = new XMLEditor(this.Compiler.Serialize().documentElement);
                });

            test(
                "Checking whether the filename of the instruction is generated correctly…",
                () =>
                {
                    ok(editor.TextContent.endsWith(join(this.Compiler.Item.DestinationRoot, this.Compiler.Item.TranslationDirectory, "*.xml")));
                });
        }
    }(nameof(LocalizationInstructionCompiler)).Register();
}
