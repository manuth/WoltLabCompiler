import { basename } from "path";
import { ThemeTests } from "./Themes";

/**
 * Registers tests for customizations.
 */
export function CustomizationTests(): void
{
    suite(
        basename(__dirname),
        () =>
        {
            ThemeTests();
        });
}
