import { IFileDescriptorOptions } from "../../../PackageSystem/IFileDescriptorOptions.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ImageDirectoryDescriptor } from "./ImageDirectoryDescriptor.js";

/**
 * Provides options for the {@link ImageDirectoryDescriptor `ImageDirectoryDescriptor`} class.
 */
export interface IImageDirectoryDescriptorOptions extends Partial<IFileDescriptorOptions>
{
    /**
     * The directory to load the pictures from.
     */
    Source: string;

    /**
     * The directory to upload the pictures to.
     */
    DestinationRoot?: string;

    /**
     * The filename of the archive to compress the pictures to.
     */
    FileName?: string;
}
