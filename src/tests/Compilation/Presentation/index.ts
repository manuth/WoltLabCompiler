import { BBCodeFileCompilerTests } from "./BBCodeFileCompiler.test";
import { EmojiFileCompilerTests } from "./EmojiFileCompiler.test";
import { ThemeCompilerTests } from "./ThemeCompiler.test";
import { ThemeFileCompilerTests } from "./ThemeFileCompiler.test";
import { ThemeVariableCompilerTests } from "./ThemeVariableCompiler.test";

/**
 * Registers tests for presentation-related compilers.
 */
export function PresentationTests(): void
{
    suite(
        "Presentation",
        () =>
        {
            ThemeFileCompilerTests();
            ThemeVariableCompilerTests();
            ThemeCompilerTests();
            BBCodeFileCompilerTests();
            EmojiFileCompilerTests();
        });
}
