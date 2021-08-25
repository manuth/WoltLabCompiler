import { basename } from "path";
import { BBCodeInstructionTests } from "./BBCodeInstruction.test";
import { PresentationTests } from "./Presentation";

/**
 * Registers tests for customization-instructions.
 */
export function CustomizationTests(): void
{
    suite(
        basename(__dirname),
        () =>
        {
            BBCodeInstructionTests();
            PresentationTests();
        });
}
