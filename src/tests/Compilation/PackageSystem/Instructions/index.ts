import { basename } from "path";
import { ACPOptionInstructionCompilerTests } from "./ACPOptionInstructionCompiler.test";
import { BBCodeInstructionCompilerTests } from "./BBCodeInstructionCompiler.test";
import { CronJobInstructionCompilerTests } from "./CronJobInstructionCompiler.test";
import { EmojiInstructionCompilerTests } from "./EmojiInstructionCompiler.test";
import { EventListenerInstructionCompilerTests } from "./EventListenerInstructionCompiler.test";
import { FileInstructionCompilerTests } from "./FileInstructionCompiler.test";
import { GroupOptionInstructionCompilerTests } from "./GroupOptionInstructionCompiler.test";
import { InstructionCompilerTests } from "./InstructionCompiler.test";
import { LocalizationInstructionCompilerTests } from "./LocalizationInstructionCompiler.test";
import { TemplateListenerInstructionCompilerTests } from "./TemplateListenerInstructionCompiler.test";
import { ThemeInstructionCompilerTests } from "./ThemeInstructionCompiler.test";
import { UserOptionInstructionCompilerTests } from "./UserOptionInstructionCompiler.test";

/**
 * Registers tests for instruction-compilers.
 */
export function InstructionTests(): void
{
    suite(
        basename(__dirname),
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
            EventListenerInstructionCompilerTests();
            TemplateListenerInstructionCompilerTests();
            BBCodeInstructionCompilerTests();
        });
}
