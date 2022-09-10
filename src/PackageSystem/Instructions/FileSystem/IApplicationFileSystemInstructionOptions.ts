// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApplicationFileSystemInstruction } from "./ApplicationFileSystemInstruction.js";
import { IFileSystemInstructionOptions } from "./IFileSystemInstructionOptions.js";

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
