import { LocalizationFileCompilerTests } from "./LocalizationFileCompiler.test";
import { LocalizationSetCompilerTests } from "./LocalizationSetCompiler.test";

/**
 * Registers globalization tests.
 */
export function GlobalizationTests(): void
{
    suite(
        "Globalization",
        () =>
        {
            LocalizationFileCompilerTests();
            LocalizationSetCompilerTests();
        });
}
