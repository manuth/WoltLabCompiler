import { ok, strictEqual } from "node:assert";
import { Random } from "random-js";
import { BBCode } from "../../../../Customization/BBCodes/BBCode.js";
import { BBCodeInstruction } from "../../../../PackageSystem/Instructions/Customization/BBCodeInstruction.js";

/**
 * Registers tests for the {@link BBCodeInstruction `BBCodeInstruction`} class.
 */
export function BBCodeInstructionTests(): void
{
    suite(
        nameof(BBCodeInstruction),
        () =>
        {
            let random: Random;
            let locale = "en";
            let localization: Record<string, string> = {};
            let bbCodeDirName = "bbcode";
            let bbCodeInstruction: BBCodeInstruction;
            localization[locale] = "bar";

            let bbCode = new BBCode(
                {
                    Name: "foo",
                    DisplayName: localization
                });

            suiteSetup(
                () =>
                {
                    random = new Random();
                });

            setup(
                () =>
                {
                    bbCodeInstruction = new BBCodeInstruction(
                        {
                            FileName: "test.xml",
                            BBCodes: []
                        });

                    bbCodeInstruction.BBCodes.push(bbCode);
                });

            suite(
                nameof(BBCodeInstruction.constructor),
                () =>
                {
                    let translationDirectory: string;

                    setup(
                        () =>
                        {
                            translationDirectory = random.string(10);
                        });

                    test(
                        `Checking whether a custom \`${nameof<BBCodeInstruction>((i) => i.TranslationDirectory)}\` can be passed…`,
                        () =>
                        {
                            strictEqual(
                                new BBCodeInstruction(
                                    {
                                        FileName: bbCodeInstruction.FileName,
                                        BBCodes: [],
                                        TranslationDirectory: translationDirectory
                                    }).TranslationDirectory,
                                translationDirectory);
                        });
                });

            suite(
                nameof<BBCodeInstruction>((instruction) => instruction.TranslationDirectory),
                () =>
                {
                    test(
                        `Checking whether \`${nameof<BBCodeInstruction>((i) => i.TranslationDirectory)}\` is set to \`${bbCodeDirName}\` if no directory is specified…`,
                        () =>
                        {
                            strictEqual(bbCodeInstruction.TranslationDirectory, bbCodeDirName);
                        });
                });

            suite(
                nameof<BBCodeInstruction>((instruction) => instruction.GetMessages),
                () =>
                {
                    let category: string;
                    let translations: Record<string, Record<string, Record<string, string>>>;

                    suiteSetup(
                        () =>
                        {
                            category = "wcf.editor.button";
                        });

                    setup(
                        () =>
                        {
                            translations = bbCodeInstruction.GetMessages();
                        });

                    test(
                        "Checking whether an entry for the locale of the translations are present…",
                        () =>
                        {
                            ok(locale in translations);
                        });

                    test(
                        `Checking whether the \`${category}\`-category is present…`,
                        () =>
                        {
                            ok(category in translations[locale]);
                        });

                    test(
                        `Checking whether the \`${category}.${bbCode.Name}\` translation is present…`,
                        () =>
                        {
                            ok(`${category}.${bbCode.Name}` in translations[locale][category]);
                        });

                    test(
                        `Checking whether the translation of \`${category}.${bbCode.Name}\` is correct…`,
                        () =>
                        {
                            strictEqual(translations[locale][category][`${category}.${bbCode.Name}`], localization[locale]);
                        });
                });
        });
}
