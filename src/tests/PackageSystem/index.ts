import { basename } from "path";
import { FileDescriptorTests } from "./FileDescriptor.test.js";
import { InstructionTests } from "./Instructions/index.js";
import { PackageTests } from "./Package.test.js";

/**
 * Registers tests for package-system components.
 */
export function PackageSystemTests(): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            FileDescriptorTests();
            InstructionTests();
            PackageTests();
        });
}
