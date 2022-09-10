import { basename } from "node:path";
import { BBCodeFileCompilerTests } from "./BBCodeFileCompiler.test.js";
import { EmojiFileCompilerTests } from "./EmojiFileCompiler.test.js";
import { ThemeCompilerTests } from "./ThemeCompiler.test.js";
import { ThemeFileCompilerTests } from "./ThemeFileCompiler.test.js";
import { ThemeVariableCompilerTests } from "./ThemeVariableCompiler.test.js";

/**
 * Registers tests for presentation-related compilers.
 */
export function PresentationTests(): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            ThemeFileCompilerTests();
            ThemeVariableCompilerTests();
            ThemeCompilerTests();
            BBCodeFileCompilerTests();
            EmojiFileCompilerTests();
        });
}
