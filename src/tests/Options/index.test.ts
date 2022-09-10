import { basename } from "node:path";
import { CategoryTests } from "./Category.test.js";
import { OptionTests as OptionClassTests } from "./Option.test.js";

/**
 * Registers tests for option-components.
 */
export function OptionTests(): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            OptionClassTests();
            CategoryTests();
        });
}
