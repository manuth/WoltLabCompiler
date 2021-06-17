import { ACPOptionInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/ACPOptionInstructionCompiler";
import { InstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/InstructionCompiler";
import { Node } from "../../../NodeSystem/Node";
import { ACPCategory } from "../../../Options/ControlPanel/ACPCategory";
import { ACPOption } from "../../../Options/ControlPanel/ACPOption";
import { IACPOptionOptions } from "../../../Options/ControlPanel/IACPOptionOptions";
import { ICategoryOptions } from "../../../Options/ICategoryOptions";
import { IOptionInstructionOptions } from "./IOptionInstructionOptions";
import { OptionInstruction } from "./OptionInstruction";

/**
 * Represents an instruction which provides options for the control-panel.
 */
export class ACPOptionInstruction extends OptionInstruction<ACPCategory, ICategoryOptions<IACPOptionOptions>, ACPOption, IACPOptionOptions>
{
    /**
     * Initializes a new instance of the {@link ACPOptionInstruction `ACPOptionInstruction`} class.
     *
     * @param options
     * The options for the acp-option instruction.
     */
    public constructor(options: IOptionInstructionOptions<ICategoryOptions<IACPOptionOptions>>)
    {
        super(
            options,
            (node: Node<ACPCategory, ICategoryOptions<IACPOptionOptions>>, opts: ICategoryOptions<IACPOptionOptions>): ACPCategory =>
            {
                return new ACPCategory(node, opts);
            });
    }

    /**
     * @inheritdoc
     */
    public get Type(): string
    {
        return "option";
    }

    /**
     * @inheritdoc
     */
    public get RootCategory(): string
    {
        return "wcf.acp.option";
    }

    /**
     * @inheritdoc
     */
    public override get Compiler(): InstructionCompiler<ACPOptionInstruction>
    {
        return new ACPOptionInstructionCompiler(this);
    }
}
