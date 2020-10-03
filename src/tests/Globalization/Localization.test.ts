import { strictEqual } from "assert";
import { Localization } from "../../Globalization/Localization";

/**
 * Registers tests for the `Localization` class.
 */
export function LocalizationTests(): void
{
    suite(
        "Localization",
        () =>
        {
            suite(
                "GetLocales",
                () =>
                {
                    let locales1: string[];
                    let locales2: string[];
                    let testValue: string;
                    let localization1: Localization;
                    let localization2: Localization;

                    suiteSetup(
                        () =>
                        {
                            locales1 = ["de", "en"];
                            locales2 = ["de", "en", "it", "fr"];
                            testValue = "Test";
                            localization1 = new Localization();
                            localization2 = new Localization();

                            for (let locale of locales1)
                            {
                                localization1.Data[locale] = testValue;
                            }

                            for (let locale of locales2)
                            {
                                localization2.Data[locale] = testValue;
                            }
                        });

                    test(
                        "Checking whether the locales of the `Localization` are evaluated correctly…",
                        () =>
                        {
                            strictEqual(locales1.every((locale: string) => localization1.GetLocales().includes(locale)), true);
                            strictEqual(locales2.every((locale: string) => localization2.GetLocales().includes(locale)), true);
                        });
                });
        });
}
