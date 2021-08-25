import { basename } from "path";
import { ACPOptionFileCompilerTests } from "./ACPOptionFileCompiler.test";
import { GroupOptionFileCompilerTests } from "./GroupOptionFileCompiler.test";
import { OptionFileCompilerTests } from "./OptionFileCompiler.test";
import { UserOptionFileCompilerTests } from "./UserOptionFileCompiler.test";

/**
 * Registers tests for options-compilers.
 */
export function OptionTests(): void
{
    suite(
        basename(__dirname),
        () =>
        {
            OptionFileCompilerTests();
            ACPOptionFileCompilerTests();
            GroupOptionFileCompilerTests();
            UserOptionFileCompilerTests();
        });
}
