import { ok } from "node:assert";
import { Localization } from "../../Globalization/Localization.js";

/**
 * Registers tests for the {@link Localization `Localization`} class.
 */
export function LocalizationTests(): void
{
    suite(
        nameof(Localization),
        () =>
        {
            suite(
                nameof<Localization>((localization) => localization.GetLocales),
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
                                localization1.Data.set(locale, testValue);
                            }

                            for (let locale of locales2)
                            {
                                localization2.Data.set(locale, testValue);
                            }
                        });

                    test(
                        `Checking whether the locales of the \`${nameof(Localization)}\` are evaluated correctly…`,
                        () =>
                        {
                            ok(locales1.every((locale: string) => localization1.GetLocales().includes(locale)));
                            ok(locales2.every((locale: string) => localization2.GetLocales().includes(locale)));
                        });
                });
        });
}
