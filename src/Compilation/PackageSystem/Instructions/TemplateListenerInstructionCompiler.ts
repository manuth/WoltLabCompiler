import { TemplateListenerInstruction } from "../../../PackageSystem/Instructions/Events/TemplateListenerInstruction";
import { Compiler } from "../../Compiler";
import { TemplateListenerFileCompiler } from "../../Events/TemplateListenerFileCompiler";
import { InstructionFileCompiler } from "./InstructionFileCompiler";

/**
 * Provides the functionality to compile event-listener instructions.
 */
export class TemplateListenerInstructionCompiler extends InstructionFileCompiler<TemplateListenerInstruction>
{
    /**
     * Initializes a new instance of the {@link TemplateListenerInstructionCompiler `TemplateListenerInstructionCompiler`} class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: TemplateListenerInstruction)
    {
        super(item);
    }

    /**
     * @inheritdoc
     */
    protected get FileCompiler(): Compiler<TemplateListenerInstruction>
    {
        return new TemplateListenerFileCompiler(this.Item);
    }
}
