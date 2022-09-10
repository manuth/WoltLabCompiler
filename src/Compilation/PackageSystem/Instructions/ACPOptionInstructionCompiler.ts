import { ACPCategory } from "../../../Options/ControlPanel/ACPCategory.js";
import { ACPOption } from "../../../Options/ControlPanel/ACPOption.js";
import { ACPOptionInstruction } from "../../../PackageSystem/Instructions/Options/ACPOptionInstruction.js";
import { ACPOptionFileCompiler } from "../../Options/ACPOptionFileCompiler.js";
import { OptionInstructionCompiler } from "./OptionInstructionCompiler.js";

/**
 * Provides the functionality to compile instructions which provide options for the control-panel.
 */
export class ACPOptionInstructionCompiler extends OptionInstructionCompiler<ACPOptionInstruction, ACPCategory, ACPOption>
{
    /**
     * Initializes a new instance of the {@link ACPOptionInstructionCompiler `ACPOptionInstructionCompiler`} class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: ACPOptionInstruction)
    {
        super(item);
    }

    /**
     * @inheritdoc
     */
    protected get OptionFileCompiler(): ACPOptionFileCompiler
    {
        return new ACPOptionFileCompiler(this.Item);
    }
}
