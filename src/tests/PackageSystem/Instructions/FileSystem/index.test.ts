import { basename } from "node:path";
import { FileSystemInstructionTests } from "./FileSystemInstruction.test.js";

/**
 * Registers tests for file-system instructions.
 */
export function FileSystemTests(): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            FileSystemInstructionTests();
        });
}
