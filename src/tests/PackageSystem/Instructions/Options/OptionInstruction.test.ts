import { strictEqual } from "assert";
import { Random } from "random-js";
import { ACPOptionInstruction } from "../../../../PackageSystem/Instructions/Options/ACPOptionInstruction";
import { OptionInstruction } from "../../../../PackageSystem/Instructions/Options/OptionInstruction";

/**
 * Registers tests for the {@link OptionInstruction `OptionInstruction<TCategory, TCategoryOptions, TOption, TOptionOptions>`} class.
 */
export function OptionInstructionTests(): void
{
    suite(
        nameof(OptionInstruction),
        () =>
        {
            let random: Random;
            let instruction: ACPOptionInstruction;

            suiteSetup(
                () =>
                {
                    random = new Random();
                });

            setup(
                () =>
                {
                    instruction = new ACPOptionInstruction(
                        {
                            FileName: "test.xml",
                            Nodes: []
                        });
                });

            suite(
                nameof(OptionInstruction.constructor),
                () =>
                {
                    let translationDirectory: string;

                    setup(
                        () =>
                        {
                            translationDirectory = random.string(10);
                        });

                    test(
                        `Checking whether a custom \`${nameof<OptionInstruction<any, any, any, any>>((i) => i.TranslationDirectory)}\` can be specified…`,
                        () =>
                        {
                            strictEqual(
                                new ACPOptionInstruction(
                                    {
                                        FileName: instruction.FileName,
                                        Nodes: [],
                                        TranslationDirectory: translationDirectory
                                    }).TranslationDirectory,
                                translationDirectory);
                        });
                });

            suite(
                nameof<OptionInstruction<any, any, any, any>>((instruction) => instruction.TranslationDirectory),
                () =>
                {
                    test(
                        "Checking whether the translation-directory defaults to the name of the instruction-type…",
                        () =>
                        {
                            strictEqual(instruction.TranslationDirectory, instruction.Type);
                        });
                });
        });
}
