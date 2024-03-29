import { IThemeOptionBase } from "./IThemeOptionBase.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Theme } from "./Theme.js";

/**
 * Provides options for the {@link Theme `Theme`}-class.
 */
export interface IThemeOptions extends IThemeOptionBase
{
    /**
     * The custom `scss`-code of the theme.
     */
    CustomScss?: string;

    /**
     * The custom `scss`-code containing variable-overrides of special `scss`-variables.
     */
    ScssOverride?: string;
}
