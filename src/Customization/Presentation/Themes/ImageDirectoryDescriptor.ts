import { FileDescriptor } from "../../../PackageSystem/FileDescriptor";
import { IImageDirectoryDescriptorOptions } from "./IImageDirectoryDescriptorOptions";

/**
 * Provides a description of a directory which contains images.
 */
export class ImageDirectoryDescriptor extends FileDescriptor
{
    /**
     * The folder to upload the images to.
     */
    private destinationRoot: string;

    /**
     * Initializes a new instance of the `ImageFolderDescriptor` class.
     *
     * @param options
     * The options of the image-directory descriptor.
     */
    public constructor(options: IImageDirectoryDescriptorOptions)
    {
        super({
            Source: options.Source,
            FileName: options.FileName ?? "images.tar"
        });

        if (
            (options.DestinationRoot !== null) &&
            (options.DestinationRoot !== undefined))
        {
            this.destinationRoot = options.DestinationRoot;
        }
        else
        {
            this.destinationRoot = this.Source;
        }
    }

    /**
     * Gets or sets the folder to upload the images to.
     */
    public get DestinationRoot(): string
    {
        return this.destinationRoot;
    }

    /**
     * @inheritdoc
     */
    public set DestinationRoot(value: string)
    {
        this.destinationRoot = value;
    }
}
