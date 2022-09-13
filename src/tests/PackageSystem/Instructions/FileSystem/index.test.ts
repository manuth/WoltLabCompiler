import { basename } from "node:path";
import { ApplicationFileSystemInstructionTests } from "./ApplicationFileSystemInstruction.test.js";
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
            ApplicationFileSystemInstructionTests();
        });
}
