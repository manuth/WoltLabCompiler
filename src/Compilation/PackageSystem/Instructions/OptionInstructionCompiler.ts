import { ICategory } from "../../../Options/Generic/ICategory";
import { Option } from "../../../Options/Option";
import { IOptionInstruction } from "../../../PackageSystem/Instructions/Options/IOptionInstruction";
import { Compiler } from "../../Compiler";
import { LocalizationProviderCompiler } from "./LocalizationProviderCompiler";

/**
 * Provides the functionality to compile instructions which provide options for the control-panel.
 *
 * @template T
 * The type of the item which can be compiled by this compiler.
 *
 * @template TCategory
 * The type of the option-categories.
 *
 * @template TOption
 * The type of the options.
 */
export abstract class OptionInstructionCompiler<T extends IOptionInstruction<TCategory, TOption>, TCategory extends ICategory<TOption>, TOption extends Option> extends LocalizationProviderCompiler<T>
{
    /**
     * Initializes a new instance of the {@link OptionInstructionCompiler `OptionInstructionCompiler<T, TCategory, TOption>`} class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: T)
    {
        super(item);
    }

    /**
     * Gets a component for compiling the option-file.
     */
    protected abstract get OptionFileCompiler(): Compiler<T>;

    /**
     * @inheritdoc
     */
    protected override async Compile(): Promise<void>
    {
        await super.Compile();
        let compiler: Compiler<T> = this.OptionFileCompiler;
        compiler.DestinationPath = this.DestinationFileName;
        await compiler.Execute();
        await this.CopyTemplate(this.DestinationFileName, this.DestinationFileName);
    }
}
