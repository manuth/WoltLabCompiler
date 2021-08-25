import { basename } from "path";
import { CategoryTests } from "./Category.test";
import { OptionTests as OptionClassTests } from "./Option.test";

/**
 * Registers tests for option-components.
 */
export function OptionTests(): void
{
    suite(
        basename(__dirname),
        () =>
        {
            OptionClassTests();
            CategoryTests();
        });
}
