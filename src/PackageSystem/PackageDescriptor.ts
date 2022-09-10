import { IPackageDescriptorOptions } from "./IPackageDescriptorOptions.js";

/**
 * Provides an abstraction of a package.
 */
export class PackageDescriptor
{
    /**
     * The identifier of the package.
     */
    private identifier: string;

    /**
     * Initializes a new instance of the {@link PackageDescriptor `PackageDescriptor`} class.
     *
     * @param options
     * The options of the descriptor.
     */
    public constructor(options: IPackageDescriptorOptions)
    {
        this.Identifier = options.Identifier;
    }

    /**
     * Gets or sets the identifier of the package.
     */
    public get Identifier(): string
    {
        return this.identifier;
    }

    /**
     * @inheritdoc
     */
    public set Identifier(value: string)
    {
        this.identifier = value;
    }
}
