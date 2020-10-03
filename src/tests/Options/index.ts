import { CategoryTests } from "./Category.test";
import { OptionTests as OptionClassTests } from "./Option.test";

/**
 * Registers tests for option-components.
 */
export function OptionTests(): void
{
    suite(
        "Options",
        () =>
        {
            OptionClassTests();
            CategoryTests();
        });
}
