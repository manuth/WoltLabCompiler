import { basename } from "path";
import { LocalizationTests } from "./Localization.test.js";

/**
 * Registers tests for globalization components.
 */
export function GlobalizationTests(): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            LocalizationTests();
        });
}
