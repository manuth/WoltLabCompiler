import { IPackageDescriptorOptions } from "./IPackageDescriptorOptions.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { PackageFileDescriptor } from "./PackageFileDescriptor.js";

/**
 * Provides options for the {@link PackageFileDescriptor `PackageFileDescriptor`} class.
 */
export interface IPackageFileDescriptorOptions extends IPackageDescriptorOptions
{
    /**
     * The filename of the package
     */
    FileName?: string;
}
