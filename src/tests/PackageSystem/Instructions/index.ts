import { CustomizationTests } from "./Customization";
import { FileSystemTests } from "./FileSystem";
import { GlobalizationTests } from "./Globalization";
import { InstructionTests as InstructionClassTests } from "./Instruction.test";
import { InstructionSetTests } from "./InstructionSet.test";
import { NodeSystemTests } from "./NodeSystem";

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
            FileSystemTests();
            NodeSystemTests();
            GlobalizationTests();
            CustomizationTests();
        });
}
