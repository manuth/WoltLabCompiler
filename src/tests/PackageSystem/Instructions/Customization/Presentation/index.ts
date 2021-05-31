import { ThemeInstructionTests } from "./ThemeInstruction.test";

/**
 * Registers tests for presentation-instructions.
 */
export function PresentationTests(): void
{
    suite(
        "Presentation",
        () =>
        {
            ThemeInstructionTests();
        });
}
