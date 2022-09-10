import { basename } from "node:path";
import { NodeSystemInstructionTests } from "./NodeSystemInstruction.test.js";

/**
 * Registers tests for node-system instructions.
 */
export function NodeSystemTests(): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            NodeSystemInstructionTests();
        });
}
