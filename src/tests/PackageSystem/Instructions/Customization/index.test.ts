import { basename } from "node:path";
import { BBCodeInstructionTests } from "./BBCodeInstruction.test.js";
import { PresentationTests } from "./Presentation/index.test.js";

/**
 * Registers tests for customization-instructions.
 */
export function CustomizationTests(): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            BBCodeInstructionTests();
            PresentationTests();
        });
}
