import { ILocalization } from "./ILocalization.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LocalizationItem } from "./LocalizationItem.js";

/**
 * Provides options for the {@link LocalizationItem `LocalizationItem`} class.
 */
export interface ILocalizationItemOptions
{
    /**
     * The translations of the node.
     */
    Translations?: ILocalization;
}
