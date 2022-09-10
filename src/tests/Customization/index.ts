import { basename } from "path";
import { ThemeTests } from "./Themes/index.js";

/**
 * Registers tests for customizations.
 */
export function CustomizationTests(): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            ThemeTests();
        });
}
