import { INamedObject } from "../../INamedObject.js";
import { IDeleteInstructionOptions } from "./IDeleteInstructionOptions.js";
import { INamedDeleteInstruction } from "./INamedDeleteInstruction.js";
import { Instruction } from "./Instruction.js";

/**
 * Represents an instruction which provides the functionality to delete named objects.
 */
export abstract class NamedDeleteInstruction extends Instruction implements INamedDeleteInstruction
{
    /**
     * The objects to delete.
     */
    private objectsToDelete: INamedObject[] = [];

    /**
     * Initializes a new instance of the {@link NamedDeleteInstruction `NamedDeleteInstruction`} class.
     *
     * @param options
     * The options for the named deletion-instruction.
     */
    public constructor(options: IDeleteInstructionOptions<INamedObject>)
    {
        super(options);

        if (
            (options.ObjectsToDelete !== null) &&
            (options.ObjectsToDelete !== undefined))
        {
            this.ObjectsToDelete.push(...options.ObjectsToDelete);
        }
    }

    /**
     * @inheritdoc
     */
    public get ObjectsToDelete(): INamedObject[]
    {
        return this.objectsToDelete;
    }
}
