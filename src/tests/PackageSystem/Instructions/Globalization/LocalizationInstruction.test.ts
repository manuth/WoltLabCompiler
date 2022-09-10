import { ok, strictEqual } from "assert";
import { ILocalization } from "../../../../Globalization/ILocalization.js";
import { ILocalizationItemOptions } from "../../../../Globalization/ILocalizationItemOptions.js";
import { LocalizationItem } from "../../../../Globalization/LocalizationItem.js";
import { LocalizationInstruction } from "../../../../PackageSystem/Instructions/Globalization/LocalizationInstruction.js";
import { TranslationInstruction } from "../../../../PackageSystem/Instructions/Globalization/TranslationInstruction.js";

/**
 * Registers tests for the {@link LocalizationInstruction `LocalizationInstruction<T, TOptions>`} class.
 */
export function LocalizationInstructionTests(): void
{
    suite(
        nameof(LocalizationInstruction),
        () =>
        {
            let locale: string;
            let category: string;
            let messageName: string;
            let messageValue: string;
            let instruction: LocalizationInstruction<LocalizationItem, ILocalizationItemOptions>;
            let translations: Record<string, Record<string, Record<string, string>>>;

            suiteSetup(
                () =>
                {
                    let localization: ILocalization = {};

                    locale = "en";
                    category = "foo";
                    messageName = "bar";
                    messageValue = "baz";
                    localization[locale] = messageValue;

                    instruction = new TranslationInstruction(
                        {
                            FileName: "foo",
                            Nodes: [
                                {
                                    Name: category,
                                    Nodes: [
                                        {
                                            Name: messageName,
                                            Item:
                                            {
                                                Translations: localization
                                            }
                                        }
                                    ]
                                }
                            ]
                        });

                    translations = instruction.GetMessages();
                });

            suite(
                nameof<LocalizationInstruction<any, any>>((instruction) => instruction.GetMessages),
                () =>
                {
                    test(
                        "Checking whether an entry for the locale of the translations is present…",
                        () =>
                        {
                            ok(locale in translations);
                        });

                    test(
                        "Checking whether categories are created correctly…",
                        () =>
                        {
                            ok(category in translations[locale]);
                        });

                    test(
                        "Checking whether keys are created correctly…",
                        () =>
                        {
                            ok(`${category}.${messageName}` in translations[locale][category]);
                        });

                    test(
                        "Checking whether translations are created correctly…",
                        () =>
                        {
                            strictEqual(translations[locale][category][`${category}.${messageName}`], messageValue);
                        });
                });
        });
}
