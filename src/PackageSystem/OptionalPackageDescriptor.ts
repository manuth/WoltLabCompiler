import { IPackageFileDescriptorOptions } from "./IPackageFileDescriptorOptions.js";
import { PackageFileDescriptor } from "./PackageFileDescriptor.js";

/**
 * Provides an abstraction of an optional package.
 */
export class OptionalPackageDescriptor extends PackageFileDescriptor
{
    /**
     * Initializes a new instance of the {@link OptionalPackageDescriptor `OptionalPackageDescriptor`} class.
     *
     * @param options
     * The options of the file-descriptor.
     */
    public constructor(options: Required<IPackageFileDescriptorOptions>)
    {
        super(options);
    }
}
