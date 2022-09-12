import { EventListenerInstruction } from "../../../PackageSystem/Instructions/Events/EventListenerInstruction.js";
import { Compiler } from "../../Compiler.js";
import { EventListenerFileCompiler } from "../../Events/EventListenerFileCompiler.js";
import { InstructionFileCompiler } from "./InstructionFileCompiler.js";

/**
 * Provides the functionality to compile event-listener instructions.
 */
export class EventListenerInstructionCompiler extends InstructionFileCompiler<EventListenerInstruction>
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
