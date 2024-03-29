import { IApplicationFileSystemInstructionOptions } from "./FileSystem/IApplicationFileSystemInstructionOptions.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { SelfContainedPHPInstruction } from "./SelfContainedPHPInstruction.js";

/**
 * Provides options for the {@link SelfContainedPHPInstruction `SelfContainedPHPInstruction`} class.
 */
export interface ISelfContainedPHPInstructionOptions extends IApplicationFileSystemInstructionOptions
{
    /**
     * The application to upload the file to.
     */
    Application?: string;

    /**
     * The path to load the php-file from.
     */
    Source: string;

    /**
     * The path to upload the php-file to.
     */
    Destination: string;
}
