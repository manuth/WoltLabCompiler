import { basename } from "node:path";
import { OptionInstructionTests } from "./OptionInstruction.test.js";

/**
 * Registers tests for option instructions.
 */
export function OptionTests(): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            OptionInstructionTests();
        });
}
