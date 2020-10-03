import { ACPOptionInstructionCompilerTests } from "./ACPOptionInstructionCompiler.test";
import { BBCodeInstructionCompilerTests } from "./BBCodeInstructionCompiler.test";
import { CronJobInstructionCompilerTests } from "./CronJobInstructionCompiler.test";
import { EmojiInstructionCompilerTests } from "./EmojiInstructionCompiler.test";
import { FileInstructionCompilerTests } from "./FileInstructionCompiler.test";
import { GroupOptionInstructionCompilerTests } from "./GroupOptionInstructionCompiler.test";
import { InstructionCompilerTests } from "./InstructionCompiler.test";
import { LocalizationInstructionCompilerTests } from "./LocalizationInstructionCompiler.test";
import { ThemeInstructionCompilerTests } from "./ThemeInstructionCompiler.test";
import { UserOptionInstructionCompilerTests } from "./UserOptionInstructionCompiler.test";

/**
 * Registers tests for instruction-compilers.
 */
export function InstructionTests(): void
{
    suite(
        "Instructions",
        () =>
        {
            InstructionCompilerTests();
            FileInstructionCompilerTests();
            LocalizationInstructionCompilerTests();
            ACPOptionInstructionCompilerTests();
            GroupOptionInstructionCompilerTests();
            UserOptionInstructionCompilerTests();
            CronJobInstructionCompilerTests();
            ThemeInstructionCompilerTests();
            EmojiInstructionCompilerTests();
            BBCodeInstructionCompilerTests();
        });
}
