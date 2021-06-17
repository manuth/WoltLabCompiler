import { INamedObject } from "../../../INamedObject";
import { IDeleteInstructionOptions } from "../IDeleteInstructionOptions";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ListenerInstruction } from "./ListenerInstruction";

/**
 * Provides options for the {@link ListenerInstruction `ListenerInstruction<T, TOptions>`} class.
 */
export interface IListenerInstructionOptions<T> extends IDeleteInstructionOptions<INamedObject>
{
    /**
     * The listeners provided by the instruction.
     */
    Listeners: T[];
}
