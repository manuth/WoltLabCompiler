import { EventListenerInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/EventListenerInstructionCompiler";
import { InstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/InstructionCompiler";
import { EventListener } from "../../../Events/EventListener";
import { IEventListenerOptions } from "../../../Events/IEventListenerOptions";
import { IListenerInstructionOptions } from "./IListenerInstructionOptions";
import { ListenerInstruction } from "./ListenerInstruction";

/**
 * Represents an instruction which provides event-listeners.
 */
export class EventListenerInstruction extends ListenerInstruction<EventListener, IEventListenerOptions>
{
    /**
     * Initializes a new instance of the `EventListenerInstruction` class.
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
