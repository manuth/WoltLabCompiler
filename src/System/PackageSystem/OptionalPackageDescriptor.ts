import { IPackageFileDescriptorOptions } from "./IPackageFileDescriptorOptions";
import { PackageFileDescriptor } from "./PackageFileDescriptor";

/**
 * Provides an abstraction of an optional package.
 */
export class OptionalPackageDescriptor extends PackageFileDescriptor
{
    /**
     * Initializes a new instance of the `OptionalPackageDescriptor` class.
     *
     * @param options
     * The options of the file-descriptor.
     */
    public constructor(options: Required<IPackageFileDescriptorOptions>)
    {
        super(options);
    }
}
