// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDeleteInstruction } from "./IDeleteInstruction";
import { IInstructionOptions } from "./IInstructionOptions";

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
