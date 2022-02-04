import { basename } from "path";
import { OptionInstructionTests } from "./OptionInstruction.test";

/**
 * Registers tests for option instructions.
 */
export function OptionTests(): void
{
    suite(
        basename(__dirname),
        () =>
        {
            OptionInstructionTests();
        });
}
