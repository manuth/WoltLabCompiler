// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDeleteInstruction } from "./IDeleteInstruction.js";
import { IInstructionOptions } from "./IInstructionOptions.js";

/**
 * Provides options for the {@link IDeleteInstruction `IDeleteInstruction<T>`} interface.
 */
export interface IDeleteInstructionOptions<T> extends IInstructionOptions
{
    /**
     * The objects to delete.
     */
    ObjectsToDelete?: T[];
}
