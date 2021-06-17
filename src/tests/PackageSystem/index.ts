import { FileDescriptorTests } from "./FileDescriptor.test";
import { InstructionTests } from "./Instructions";
import { PackageTests } from "./Package.test";

/**
 * Registers tests for package-system components.
 */
export function PackageSystemTests(): void
{
    suite(
        "PackageSystem",
        () =>
        {
            FileDescriptorTests();
            InstructionTests();
            PackageTests();
        });
}
