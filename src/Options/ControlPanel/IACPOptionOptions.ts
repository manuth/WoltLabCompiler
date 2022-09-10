import { IOptionOptions } from "../IOptionOptions.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ACPOption } from "./ACPOption.js";

/**
 * Provides options for the {@link ACPOption `ACPOption`} class.
 */
export interface IACPOptionOptions extends IOptionOptions
{
    /**
     * A value indicating whether the option is visible.
     */
    Visible?: boolean;

    /**
     * A value indicating whether the option is localizable.
     */
    Localizable?: boolean;

    /**
     * A value indicating whether to force localization.
     */
    ForceLocalization?: boolean;
}
