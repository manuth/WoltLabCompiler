import { IThemeLoaderOptions } from "../../../../Customization/Presentation/Themes/IThemeLoaderOptions.js";
import { IInstructionOptions } from "../../IInstructionOptions.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ThemeInstruction } from "./ThemeInstruction.js";

/**
 * Provides options for the {@link ThemeInstruction `ThemeInstruction`} class.
 */
export interface IThemeInstructionOptions extends Partial<IInstructionOptions>
{
    /**
     * The theme provided by the instruction.
     */
    Theme: IThemeLoaderOptions;
}
