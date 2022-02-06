import { IConflictingPackageDescriptorOptions } from "./IConflictingPackageDescriptorOptions";
import { PackageDescriptor } from "./PackageDescriptor";
import { VersionNumber } from "./VersionNumber";

/**
 * Provides the abstraction of a package which causes a conflict.
 */
export class ConflictingPackageDescriptor extends PackageDescriptor
{
    /**
     * The version of the package.
     */
    private version: VersionNumber;

    /**
     * Initializes a new instance of the {@link ConflictingPackageDescriptor `ConflictingPackageDescriptor`} class.
     *
     * @param options
     * The options of the conflicting package descriptor.
     */
    public constructor(options: IConflictingPackageDescriptorOptions)
    {
        super(options);
        this.Version = options.Version;
    }

    /**
     * Gets or sets the version of the package.
     */
    public get Version(): VersionNumber
    {
        return this.version;
    }

    /**
     * @inheritdoc
     */
    public set Version(value: VersionNumber)
    {
        this.version = value;
    }
}
