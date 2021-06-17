import { IPackageFileDescriptorOptions } from "./IPackageFileDescriptorOptions";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Package } from "./Package";
import { PackageDescriptor } from "./PackageDescriptor";

/**
 * Provides an abstraction of a package stored in a file.
 */
export class PackageFileDescriptor extends PackageDescriptor
{
    /**
     * The filename of the package
     */
    private fileName: string = null;

    /**
     * Initializes a new instance of the {@link PackageFileDescriptor `PackageFileDescriptor`} class.
     *
     * @param options
     * The options of the descriptor.
     */
    public constructor(options: IPackageFileDescriptorOptions)
    {
        super(options);

        if (
            (options.FileName !== null) &&
            (options.FileName !== undefined))
        {
            this.FileName = options.FileName;
        }
    }

    /**
     * The filename of the package.
     *
     * Keep in mind to provide the file using the {@link Package.AdditionalFiles `Package.AdditionalFiles`}-property.
     */
    public get FileName(): string
    {
        return this.fileName;
    }

    /**
     * @inheritdoc
     */
    public set FileName(value: string)
    {
        this.fileName = value;
    }
}
