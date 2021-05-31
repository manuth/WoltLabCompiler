import { NodeSystemInstructionTests } from "./NodeSystemInstruction.test";

/**
 * Registers tests for node-system instructions.
 */
export function NodeSystemTests(): void
{
    suite(
        "NodeSystem",
        () =>
        {
            NodeSystemInstructionTests();
        });
}
