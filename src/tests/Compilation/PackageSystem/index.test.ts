import { basename } from "node:path";
import { InstructionTests } from "./Instructions/index.test.js";
import { PackageCompilerTests } from "./PackageCompiler.test.js";
import { PackageFileCompilerTests } from "./PackageFileCompiler.test.js";

/**
 * Registers tests for package-system compilers.
 */
export function PackageSystemTests(): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            InstructionTests();
            PackageFileCompilerTests();
            PackageCompilerTests();
        });
}
