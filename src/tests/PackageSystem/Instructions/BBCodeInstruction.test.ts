import Assert = require("assert");
import { BBCode } from "../../../Customization/BBCodes/BBCode";
import { BBCodeInstruction } from "../../../PackageSystem/Instructions/Customization/BBCodeInstruction";

suite(
    "BBCodeInstruction",
    () =>
    {
        let locale = "en";
        let localization: Record<string, string> = {};

        localization[locale] = "bar";

        let bbCode = new BBCode(
            {
                Name: "foo",
                DisplayName: localization
            });

        let bbCodeInstruction: BBCodeInstruction;

        suiteSetup(
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
                        Assert.strictEqual(bbCodeInstruction.TranslationDirectory, "bbcode");
                    });
            });

        suite(
            "GetMessages()",
            () =>
            {
                let category = "wcf.editor.button";
                let translations: Record<string, Record<string, Record<string, string>>>;

                suiteSetup(
                    () =>
                    {
                        translations = bbCodeInstruction.GetMessages();
                    });

                test(
                    "Checking whether an entry for the locale of the translations are present…",
                    () =>
                    {
                        Assert.strictEqual(locale in translations, true);
                    });

                test(
                    `Checking whether the \`${category}\`-category is present…`,
                    () =>
                    {
                        Assert.strictEqual(category in translations[locale], true);
                    });

                test(
                    `Checking whether the \`${category}.${bbCode.Name}\` translation is present…`,
                    () =>
                    {
                        Assert.strictEqual(`${category}.${bbCode.Name}` in translations[locale][category], true);
                    });

                test(
                    `Checking whether the translation of \`${category}.${bbCode.Name}\` is correct…`,
                    () =>
                    {
                        Assert.strictEqual(translations[locale][category][`${category}.${bbCode.Name}`], localization[locale]);
                    });
            });
    });
