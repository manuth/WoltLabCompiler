import { LocalizationTests } from "./Localization.test";

/**
 * Registers tests for globalization components.
 */
export function GlobalizationTests(): void
{
    suite(
        "Globalization",
        () =>
        {
            LocalizationTests();
        });
}
