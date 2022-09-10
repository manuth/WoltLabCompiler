import { Listener } from "../../../Events/Listener.js";
import { INamedDeleteInstruction } from "../INamedDeleteInstruction.js";

/**
 * Represents an instruction which provides listeners.
 */
export interface IListenerInstruction<T extends Listener> extends INamedDeleteInstruction
{
    /**
     * Gets the listeners provided by the instruction.
     */
    Listeners: T[];
}
