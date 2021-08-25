import { basename } from "path";
import { ErrorMessageInstructionTests } from "./ErrorMessageInstruction.test";
import { LocalizationInstructionTests } from "./LocalizationInstruction.test";

/**
 * Registers tests for globalization-instructions.
 */
export function GlobalizationTests(): void
{
    suite(
        basename(__dirname),
        () =>
        {
            LocalizationInstructionTests();
            ErrorMessageInstructionTests();
        });
}
