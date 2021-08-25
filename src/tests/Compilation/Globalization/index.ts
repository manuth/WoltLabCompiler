import { basename } from "path";
import { LocalizationFileCompilerTests } from "./LocalizationFileCompiler.test";
import { LocalizationSetCompilerTests } from "./LocalizationSetCompiler.test";

/**
 * Registers globalization tests.
 */
export function GlobalizationTests(): void
{
    suite(
        basename(__dirname),
        () =>
        {
            LocalizationFileCompilerTests();
            LocalizationSetCompilerTests();
        });
}
