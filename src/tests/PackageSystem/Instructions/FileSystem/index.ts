import { basename } from "path";
import { FileSystemInstructionTests } from "./FileSystemInstruction.test";

/**
 * Registers tests for file-system instructions.
 */
export function FileSystemTests(): void
{
    suite(
        basename(__dirname),
        () =>
        {
            FileSystemInstructionTests();
        });
}
