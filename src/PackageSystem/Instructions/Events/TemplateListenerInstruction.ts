import { InstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/InstructionCompiler.js";
import { TemplateListenerInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/TemplateListenerInstructionCompiler.js";
import { ITemplateListenerOptions } from "../../../Customization/Presentation/ITemplateListenerOptions.js";
import { TemplateListener } from "../../../Customization/Presentation/TemplateListener.js";
import { IListenerInstructionOptions } from "./IListenerInstructionOptions.js";
import { ListenerInstruction } from "./ListenerInstruction.js";

/**
 * Represents an instruction which provides template-listeners.
 */
export class TemplateListenerInstruction extends ListenerInstruction<TemplateListener, ITemplateListenerOptions>
{
    /**
     * Initializes a new instance of the {@link TemplateListenerInstruction `TemplateListenerInstruction`} class.
     *
     * @param options
     * The options of the template-listener instruction.
     */
    public constructor(options: IListenerInstructionOptions<ITemplateListenerOptions>)
    {
        super(
            options,
            (opts: ITemplateListenerOptions) =>
            {
                return new TemplateListener(opts);
            });
    }

    /**
     * @inheritdoc
     */
    public get Type(): string
    {
        return "templateListener";
    }

    /**
     * @inheritdoc
     */
    public override get Compiler(): InstructionCompiler<TemplateListenerInstruction>
    {
        return new TemplateListenerInstructionCompiler(this);
    }
}
