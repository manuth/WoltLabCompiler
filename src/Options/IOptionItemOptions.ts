import { ILocalization } from "../Globalization/ILocalization";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { OptionItem } from "./OptionItem";

/**
 * Provides options for the {@link OptionItem `OptionItem`} class.
 */
export interface IOptionItemOptions
{
    /**
     * The name of the item.
     */
    Name: string;

    /**
     * The human-readable name of the item.
     */
    DisplayName?: ILocalization;

    /**
     * The value of the item.
     */
    Value: any;
}
