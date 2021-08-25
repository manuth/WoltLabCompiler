import { basename } from "path";
import { LocalizationTests } from "./Localization.test";

/**
 * Registers tests for globalization components.
 */
export function GlobalizationTests(): void
{
    suite(
        basename(__dirname),
        () =>
        {
            LocalizationTests();
        });
}
