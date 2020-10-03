import { BBCodeInstructionTests } from "./BBCodeInstruction.test";
import { ErrorMessageInstructionTests } from "./ErrorMessageInstruction.test";
import { FileSystemInstructionTests } from "./FileSystemInstruction.test";
import { InstructionTests as InstructionClassTests } from "./Instruction.test";
import { InstructionSetTests } from "./InstructionSet.test";
import { LocalizationInstructionTests } from "./LocalizationInstruction.test";
import { NodeSystemInstructionTests } from "./NodeSystemInstruction.test";
import { ThemeInstructionTests } from "./ThemeInstruction.test";

/**
 * Registers tests for instruction components.
 */
export function InstructionTests(): void
{
    suite(
        "Instructions",
        () =>
        {
            InstructionSetTests();
            InstructionClassTests();
            FileSystemInstructionTests();
            NodeSystemInstructionTests();
            LocalizationInstructionTests();
            ErrorMessageInstructionTests();
            BBCodeInstructionTests();
            ThemeInstructionTests();
        });
}
