import { PackageCompilerTests } from "./PackageCompiler.test";
import { PackageFileCompilerTests } from "./PackageFileCompiler.test";

/**
 * Registers tests for package-system compilers.
 */
export function PackageSystemTests(): void
{
    suite(
        "PackageSystem",
        () =>
        {
            PackageFileCompilerTests();
            PackageCompilerTests();
        });
}
