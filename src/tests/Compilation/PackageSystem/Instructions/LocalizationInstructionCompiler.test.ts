import { ok } from "assert";
import { Random } from "random-js";
import { createSandbox, SinonSandbox } from "sinon";
import { join } from "upath";
import { InstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/InstructionCompiler";
import { LocalizationInstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/LocalizationInstructionCompiler";
import { ILocalization } from "../../../../Globalization/ILocalization";
import { ILocalizationInstruction } from "../../../../PackageSystem/Instructions/Globalization/ILocalizationInstruction";
import { TranslationInstruction } from "../../../../PackageSystem/Instructions/Globalization/TranslationInstruction";
import { XMLEditor } from "../../../../Serialization/XMLEditor";
import { CompilerTester } from "../../TestComponents/Testers/CompilerTester";
import { LocalizationInstructionCompilerTestRunner } from "../../TestComponents/TestRunners/LocalizationInstructionCompilerTestRunner";

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
