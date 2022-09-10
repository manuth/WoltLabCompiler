// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ConflictingPackageDescriptor } from "./ConflictingPackageDescriptor.js";
import { IPackageDescriptorOptions } from "./IPackageDescriptorOptions.js";
import { VersionNumber } from "./VersionNumber.js";

/**
 * Provides options for the {@link ConflictingPackageDescriptor `ConflictingPackageDescriptor`} class.
 */
export interface IConflictingPackageDescriptorOptions extends IPackageDescriptorOptions
{
    /**
     * The version of the package.
     */
    Version: VersionNumber;
}
