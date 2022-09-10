import { INamedObject } from "../../../INamedObject.js";
import { ICategory } from "../../../Options/Generic/ICategory.js";
import { Option } from "../../../Options/Option.js";
import { ILocalizationInstruction } from "../Globalization/ILocalizationInstruction.js";
import { INodeSystemInstruction } from "../NodeSystem/INodeSystemInstruction.js";

/**
 * Represents an instruction which provides options for the control-panel.
 */
export interface IOptionInstruction<T extends ICategory<TOption>, TOption extends Option> extends INodeSystemInstruction<T>, ILocalizationInstruction
{
    /**
     * Gets the category of the translations.
     */
    RootCategory: string;

    /**
     * Gets the category of the translations of the options.
     */
    OptionCategory: string;

    /**
     * Gets the category of the translations of the categories.
     */
    CategoryCategory: string;

    /**
     * Gets the categories to delete.
     */
    CategoriesToDelete: INamedObject[];

    /**
     * Gets the options to delete.
     */
    OptionsToDelete: INamedObject[];
}
