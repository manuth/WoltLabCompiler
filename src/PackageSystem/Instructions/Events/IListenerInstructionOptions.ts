import { INamedObject } from "../../../INamedObject.js";
import { IDeleteInstructionOptions } from "../IDeleteInstructionOptions.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ListenerInstruction } from "./ListenerInstruction.js";

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
