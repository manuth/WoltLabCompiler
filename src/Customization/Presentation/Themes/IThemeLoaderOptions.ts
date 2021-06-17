import { IThemeOptionBase } from "./IThemeOptionBase";

/**
 * Provides options for the {@link ThemeLoader `ThemeLoader`}-class.
 */
export interface IThemeLoaderOptions extends IThemeOptionBase
{
    /**
     * The name of the file which contains the `scss`-code of the theme.
     */
    CustomScssFileName?: string;

    /**
     * The name of the file which contains `scss`-variables overrides.
     */
    ScssOverrideFileName?: string;

    /**
     * The name of the file which contains additional variables of the theme.
     */
    VariableFileName?: string;
}
