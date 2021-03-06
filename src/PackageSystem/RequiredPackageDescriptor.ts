import { IRequiredPackageDescriptorOptions } from "./IRequiredPackageDescriptorOptions";
import { PackageFileDescriptor } from "./PackageFileDescriptor";

/**
 * Provides an abstraction of a required package.
 */
export class RequiredPackageDescriptor extends PackageFileDescriptor
{
    /**
     * The minimal version of the package which must bee installed.
     */
    private minVersion: string;

    /**
     * Initializes a new instance of the {@link RequiredPackageDescriptor `RequiredPackageDescriptor`} class.
     *
     * @param options
     * The options of the descriptor.
     */
    public constructor(options: IRequiredPackageDescriptorOptions)
    {
        super(options);
        this.MinVersion = options.MinVersion;
    }

    /**
     * Gets or sets the minimal version of the package which must bee installed.
     */
    public get MinVersion(): string
    {
        return this.minVersion;
    }

    /**
     * @inheritdoc
     */
    public set MinVersion(value: string)
    {
        this.minVersion = value;
    }
}
