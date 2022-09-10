import { INamedObject } from "../../../INamedObject.js";
import { ILocalizationInstructionOptions } from "../Globalization/ILocalizationInstructionOptions.js";
import { INodeSystemInstructionOptions } from "../NodeSystem/INodeSystemInstructionOptions.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { OptionInstruction } from "./OptionInstruction.js";

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
