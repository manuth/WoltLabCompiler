import { basename } from "path";
import { FileDescriptorTests } from "./FileDescriptor.test";
import { InstructionTests } from "./Instructions";
import { PackageTests } from "./Package.test";

/**
 * Registers tests for package-system components.
 */
export function PackageSystemTests(): void
{
    suite(
        basename(__dirname),
        () =>
        {
            FileDescriptorTests();
            InstructionTests();
            PackageTests();
        });
}
