import { EventListenerInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/EventListenerInstructionCompiler.js";
import { InstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/InstructionCompiler.js";
import { EventListener } from "../../../Events/EventListener.js";
import { IEventListenerOptions } from "../../../Events/IEventListenerOptions.js";
import { IListenerInstructionOptions } from "./IListenerInstructionOptions.js";
import { ListenerInstruction } from "./ListenerInstruction.js";

/**
 * Represents an instruction which provides event-listeners.
 */
export class EventListenerInstruction extends ListenerInstruction<EventListener, IEventListenerOptions>
{
    /**
     * Initializes a new instance of the {@link EventListenerInstruction `EventListenerInstruction`} class.
     *
     * @param options
     * The options of the event-listener instruction.
     */
    public constructor(options: IListenerInstructionOptions<IEventListenerOptions>)
    {
        super(
            options,
            (opts: IEventListenerOptions) =>
            {
                return new EventListener(opts);
            });
    }

    /**
     * @inheritdoc
     */
    public get Type(): string
    {
        return "eventListener";
    }

    /**
     * @inheritdoc
     */
    public override get Compiler(): InstructionCompiler<EventListenerInstruction>
    {
        return new EventListenerInstructionCompiler(this);
    }
}
