import { Listener } from "../../../Events/Listener.js";
import { NamedDeleteInstruction } from "../NamedDeleteInstruction.js";
import { IListenerInstruction } from "./IListenerInstruction.js";
import { IListenerInstructionOptions } from "./IListenerInstructionOptions.js";

/**
 * Represents an instruction which provides listeners.
 *
 * @template TListener
 * The type of the listeners.
 *
 * @template TOptions
 * The type of the options for generating listeners.
 */
export abstract class ListenerInstruction<TListener extends Listener, TOptions> extends NamedDeleteInstruction implements IListenerInstruction<TListener>
{
    /**
     * The listeners provided by the instruction.
     */
    private listeners: TListener[] = [];

    /**
     * Initializes a new instance of the {@link ListenerInstruction `ListenerInstruction<TListener, TOptions>`} class.
     *
     * @param options
     * The options of the listener-instruction.
     *
     * @param generator
     * A component for generating listeners.
     */
    public constructor(options: IListenerInstructionOptions<TOptions>, generator: (opts: TOptions) => TListener)
    {
        super(options);

        for (let listener of options.Listeners)
        {
            this.Listeners.push(generator(listener));
        }
    }

    /**
     * @inheritdoc
     */
    public get Listeners(): TListener[]
    {
        return this.listeners;
    }
}
