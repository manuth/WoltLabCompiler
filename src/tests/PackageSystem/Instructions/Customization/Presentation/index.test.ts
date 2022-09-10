import { basename } from "node:path";
import { ThemeInstructionTests } from "./ThemeInstruction.test.js";

/**
 * Registers tests for presentation-instructions.
 */
export function PresentationTests(): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            ThemeInstructionTests();
        });
}
