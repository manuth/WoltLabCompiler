import { basename } from "path";
import { EventListenerFileCompilerTests } from "../../Events/EventListenerFileCompiler.test.js";
import { ACPOptionInstructionCompilerTests } from "./ACPOptionInstructionCompiler.test.js";
import { BBCodeInstructionCompilerTests } from "./BBCodeInstructionCompiler.test.js";
import { CronJobInstructionCompilerTests } from "./CronJobInstructionCompiler.test.js";
import { EmojiInstructionCompilerTests } from "./EmojiInstructionCompiler.test.js";
import { FileInstructionCompilerTests } from "./FileInstructionCompiler.test.js";
import { GroupOptionInstructionCompilerTests } from "./GroupOptionInstructionCompiler.test.js";
import { InstructionCompilerTests } from "./InstructionCompiler.test.js";
import { LocalizationInstructionCompilerTests } from "./LocalizationInstructionCompiler.test.js";
import { TemplateListenerInstructionCompilerTests } from "./TemplateListenerInstructionCompiler.test.js";
import { ThemeInstructionCompilerTests } from "./ThemeInstructionCompiler.test.js";
import { UserOptionInstructionCompilerTests } from "./UserOptionInstructionCompiler.test.js";

/**
 * Registers tests for instruction-compilers.
 */
export function InstructionTests(): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
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
            EventListenerFileCompilerTests();
            TemplateListenerInstructionCompilerTests();
            BBCodeInstructionCompilerTests();
        });
}
