import { Listener } from "../../../Events/Listener";
import { NamedDeleteInstruction } from "../NamedDeleteInstruction";
import { IListenerInstruction } from "./IListenerInstruction";
import { IListenerInstructionOptions } from "./IListenerInstructionOptions";

/**
 * Represents an instruction which provides listeners.
 *
 * @template T
 * The type of the listeners.
 *
 * @template TOptions
 * The type of the options for generating listeners.
 */
export abstract class ListenerInstruction<T extends Listener, TOptions> extends NamedDeleteInstruction implements IListenerInstruction<T>
{
    /**
     * The listeners provided by the instruction.
     */
    private listeners: T[] = [];

    /**
     * Initializes a new instance of the {@link ListenerInstruction `ListenerInstruction<T, TOptions>`} class.
     *
     * @param options
     * The options of the listener-instruction.
     *
     * @param generator
     * A component for generating listeners.
     */
    public constructor(options: IListenerInstructionOptions<TOptions>, generator: (opts: TOptions) => T)
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
    public get Listeners(): T[]
    {
        return this.listeners;
    }
}
