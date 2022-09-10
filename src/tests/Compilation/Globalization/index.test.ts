import { basename } from "node:path";
import { LocalizationFileCompilerTests } from "./LocalizationFileCompiler.test.js";
import { LocalizationSetCompilerTests } from "./LocalizationSetCompiler.test.js";

/**
 * Registers globalization tests.
 */
export function GlobalizationTests(): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            LocalizationFileCompilerTests();
            LocalizationSetCompilerTests();
        });
}
