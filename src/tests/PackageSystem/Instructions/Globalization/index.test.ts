import { basename } from "node:path";
import { ErrorMessageInstructionTests } from "./ErrorMessageInstruction.test.js";
import { LocalizationInstructionTests } from "./LocalizationInstruction.test.js";

/**
 * Registers tests for globalization-instructions.
 */
export function GlobalizationTests(): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            LocalizationInstructionTests();
            ErrorMessageInstructionTests();
        });
}
