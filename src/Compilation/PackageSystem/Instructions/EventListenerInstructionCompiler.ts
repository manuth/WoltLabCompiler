import { EventListenerInstruction } from "../../../PackageSystem/Instructions/Events/EventListenerInstruction";
import { Compiler } from "../../Compiler";
import { EventListenerFileCompiler } from "../../Events/EventListenerFileCompiler";
import { InstructionCompiler } from "./InstructionCompiler";

/**
 * Provides the functionality to compile event-listener instructions.
 */
export class EventListenerInstructionCompiler extends InstructionCompiler<EventListenerInstruction>
{
    /**
     * Initializes a new instance of the {@link EventListenerInstructionCompiler `EventListenerInstructionCompiler`} class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: EventListenerInstruction)
    {
        super(item);
    }

    /**
     * @inheritdoc
     */
    protected get FileCompiler(): Compiler<EventListenerInstruction>
    {
        return new EventListenerFileCompiler(this.Item);
    }
}
