import { ErrorMessageInstructionTests } from "./ErrorMessageInstruction.test";
import { LocalizationInstructionTests } from "./LocalizationInstruction.test";

/**
 * Registers tests for globalization-instructions.
 */
export function GlobalizationTests(): void
{
    suite(
        "Globalization",
        () =>
        {
            LocalizationInstructionTests();
            ErrorMessageInstructionTests();
        });
}
