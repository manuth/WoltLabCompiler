import { ThemeTests } from "./Themes";

/**
 * Registers tests for customizations.
 */
export function CustomizationTests(): void
{
    suite(
        "Customization",
        () =>
        {
            ThemeTests();
        });
}
