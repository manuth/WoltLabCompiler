import { IRequiredPackageDescriptorOptions } from "./IRequiredPackageDescriptorOptions";
import { PackageFileDescriptor } from "./PackageFileDescriptor";
import { VersionNumber } from "./VersionNumber";

/**
 * Provides an abstraction of a required package.
 */
export class RequiredPackageDescriptor extends PackageFileDescriptor
{
    /**
     * The minimal version of the package which must bee installed.
     */
    private minVersion: VersionNumber;

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
    public get MinVersion(): VersionNumber
    {
        return this.minVersion;
    }

    /**
     * @inheritdoc
     */
    public set MinVersion(value: VersionNumber)
    {
        this.minVersion = value;
    }
}
