import { IInstructionOptions } from "../IInstructionOptions";
import { FileSystemInstruction } from "./FileSystemInstruction";

/**
 * Provides options for the {@link FileSystemInstruction `FileSystemInstruction`} class.
 */
export interface IFileSystemInstructionOptions extends Partial<IInstructionOptions>
{
    /**
     * The path to the file-system entry the instruction is bound to.
     */
    Source: string;
}
