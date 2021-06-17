import { IPackageFileDescriptorOptions } from "./IPackageFileDescriptorOptions";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RequiredPackageDescriptor } from "./RequiredPackageDescriptor";

/**
 * Provides options for the {@link RequiredPackageDescriptor `RequiredPackageDescriptor`} class.
 */
export interface IRequiredPackageDescriptorOptions extends IPackageFileDescriptorOptions
{
    /**
     * The minimal version of the package which must bee installed.
     */
    MinVersion: string;
}
