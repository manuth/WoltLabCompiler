import { basename } from "path";
import { ACPOptionFileCompilerTests } from "./ACPOptionFileCompiler.test.js";
import { GroupOptionFileCompilerTests } from "./GroupOptionFileCompiler.test.js";
import { OptionFileCompilerTests } from "./OptionFileCompiler.test.js";
import { UserOptionFileCompilerTests } from "./UserOptionFileCompiler.test.js";

/**
 * Registers tests for options-compilers.
 */
export function OptionTests(): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            OptionFileCompilerTests();
            ACPOptionFileCompilerTests();
            GroupOptionFileCompilerTests();
            UserOptionFileCompilerTests();
        });
}
