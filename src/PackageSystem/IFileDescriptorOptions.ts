// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FileDescriptor } from "./FileDescriptor";

/**
 * Provides options for the {@link FileDescriptor `FileDescriptor`} class.
 */
export interface IFileDescriptorOptions
{
    /**
     * The path to load the file from.
     */
    Source: string;

    /**
     * The filename to save the file to.
     */
    FileName?: string;
}
