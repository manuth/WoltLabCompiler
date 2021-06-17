import { ok, strictEqual } from "assert";
import { BBCode } from "../../../../Customization/BBCodes/BBCode";
import { BBCodeInstruction } from "../../../../PackageSystem/Instructions/Customization/BBCodeInstruction";

/**
 * Registers tests for the {@link BBCodeInstruction `BBCodeInstruction`} class.
 */
export function BBCodeInstructionTests(): void
{
    suite(
        "BBCodeInstruction",
        () =>
        {
            let locale = "en";
            let localization: Record<string, string> = {};
            let bbCodeInstruction: BBCodeInstruction;
            localization[locale] = "bar";

            let bbCode = new BBCode(
                {
                    Name: "foo",
                    DisplayName: localization
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
                "TranslationDirectory",
                () =>
                {
                    test(
                        "Checking whether `TranslationDirectory` is set to `bbcode` if no directory is specified…",
                        () =>
                        {
                            strictEqual(bbCodeInstruction.TranslationDirectory, "bbcode");
                        });
                });

            suite(
                "GetMessages",
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
