import { IThemeLoaderOptions } from "../../../../Customization/Presentation/Themes/IThemeLoaderOptions";
import { IInstructionOptions } from "../../IInstructionOptions";

/**
 * Provides options for the `ThemeInstruction` class.
 */
export interface IThemeInstructionOptions extends Partial<IInstructionOptions>
{
    /**
     * The theme provided by the instruction.
     */
    Theme: IThemeLoaderOptions;
}
