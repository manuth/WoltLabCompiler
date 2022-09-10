import { IPackageFileDescriptorOptions } from "./IPackageFileDescriptorOptions.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { RequiredPackageDescriptor } from "./RequiredPackageDescriptor.js";
import { VersionNumber } from "./VersionNumber.js";

/**
 * Provides options for the {@link RequiredPackageDescriptor `RequiredPackageDescriptor`} class.
 */
export interface IRequiredPackageDescriptorOptions extends IPackageFileDescriptorOptions
{
    /**
     * The minimal version of the package which must bee installed.
     */
    MinVersion: VersionNumber;
}
