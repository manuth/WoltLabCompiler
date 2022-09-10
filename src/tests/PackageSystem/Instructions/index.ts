import { basename } from "path";
import { CustomizationTests } from "./Customization/index.js";
import { FileSystemTests } from "./FileSystem/index.js";
import { GlobalizationTests } from "./Globalization/index.js";
import { InstructionTests as InstructionClassTests } from "./Instruction.test.js";
import { InstructionSetTests } from "./InstructionSet.test.js";
import { NodeSystemTests } from "./NodeSystem/index.js";
import { OptionTests } from "./Options/index.js";

/**
 * Registers tests for instruction components.
 */
export function InstructionTests(): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            InstructionSetTests();
            InstructionClassTests();
            FileSystemTests();
            NodeSystemTests();
            OptionTests();
            GlobalizationTests();
            CustomizationTests();
        });
}
