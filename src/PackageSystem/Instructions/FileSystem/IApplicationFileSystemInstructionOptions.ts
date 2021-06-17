// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApplicationFileSystemInstruction } from "./ApplicationFileSystemInstruction";
import { IFileSystemInstructionOptions } from "./IFileSystemInstructionOptions";

/**
 * Provides options for the {@link ApplicationFileSystemInstruction `ApplicationFileSystemInstruction`} class.
 */
export interface IApplicationFileSystemInstructionOptions extends IFileSystemInstructionOptions
{
    /**
     * The application to upload the files to.
     */
    Application?: string;
}
