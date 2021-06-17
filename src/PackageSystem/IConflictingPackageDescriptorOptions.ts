import { ConflictingPackageDescriptor } from "./ConflictingPackageDescriptor";
import { IPackageDescriptorOptions } from "./IPackageDescriptorOptions";

/**
 * Provides options for the {@link ConflictingPackageDescriptor `ConflictingPackageDescriptor`} class.
 */
export interface IConflictingPackageDescriptorOptions extends IPackageDescriptorOptions
{
    /**
     * The version of the package.
     */
    Version: string;
}
