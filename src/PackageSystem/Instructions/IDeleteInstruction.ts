import { IInstruction } from "./IInstruction.js";

/**
 * Represents an instruction which provides the functionality to delete objects.
 */
export interface IDeleteInstruction<T> extends IInstruction
{
    /**
     * Gets the objects to delete.
     */
    ObjectsToDelete: T[];
}
