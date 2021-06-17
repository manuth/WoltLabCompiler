import { IPackageDescriptorOptions } from "./IPackageDescriptorOptions";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PackageFileDescriptor } from "./PackageFileDescriptor";

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
