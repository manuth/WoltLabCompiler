import { INamedObject } from "../../../INamedObject";
import { ILocalizationInstructionOptions } from "../Globalization/ILocalizationInstructionOptions";
import { INodeSystemInstructionOptions } from "../NodeSystem/INodeSystemInstructionOptions";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { OptionInstruction } from "./OptionInstruction";

/**
 * Provides options for the {@link OptionInstruction `OptionInstruction<TCategory, TCategoryOptions, TOption, TOptionOptions>`} class.
 */
export interface IOptionInstructionOptions<T> extends INodeSystemInstructionOptions<T>, ILocalizationInstructionOptions
{
    /**
     * The categories to delete.
     */
    CategoriesToDelete?: INamedObject[];

    /**
     * The options to delete.
     */
    OptionsToDelete?: INamedObject[];
}
