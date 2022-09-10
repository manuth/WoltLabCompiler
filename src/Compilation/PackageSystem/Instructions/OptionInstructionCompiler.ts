import { ICategory } from "../../../Options/Generic/ICategory.js";
import { Option } from "../../../Options/Option.js";
import { IOptionInstruction } from "../../../PackageSystem/Instructions/Options/IOptionInstruction.js";
import { Compiler } from "../../Compiler.js";
import { LocalizationProviderCompiler } from "./LocalizationProviderCompiler.js";

/**
 * Provides the functionality to compile instructions which provide options for the control-panel.
 *
 * @template TInstruction
 * The type of the instruction which can be compiled by this compiler.
 *
 * @template TCategory
 * The type of the option-categories.
 *
 * @template TOption
 * The type of the options.
 */
export abstract class OptionInstructionCompiler<TInstruction extends IOptionInstruction<TCategory, TOption>, TCategory extends ICategory<TOption>, TOption extends Option> extends LocalizationProviderCompiler<TInstruction>
{
    /**
     * Initializes a new instance of the {@link OptionInstructionCompiler `OptionInstructionCompiler<TInstruction, TCategory, TOption>`} class.
     *
     * @param instruction
     * The instruction to compile.
     */
    public constructor(instruction: TInstruction)
    {
        super(instruction);
    }

    /**
     * Gets a component for compiling the option-file.
     */
    protected abstract get OptionFileCompiler(): Compiler<TInstruction>;

    /**
     * @inheritdoc
     */
    protected override async Compile(): Promise<void>
    {
        await super.Compile();
        let compiler: Compiler<TInstruction> = this.OptionFileCompiler;
        compiler.DestinationPath = this.DestinationFileName;
        await compiler.Execute();
    }
}
