import { basename } from "path";
import { CustomizationTests } from "./Customization/index.test.js";
import { FileSystemTests } from "./FileSystem/index.test.js";
import { GlobalizationTests } from "./Globalization/index.test.js";
import { InstructionTests as InstructionClassTests } from "./Instruction.test.js";
import { InstructionSetTests } from "./InstructionSet.test.js";
import { NodeSystemTests } from "./NodeSystem/index.test.js";
import { OptionTests } from "./Options/index.test.js";

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
