import { IThemeLoaderOptions } from "../../../../Customization/Presentation/Themes/IThemeLoaderOptions";
import { IInstructionOptions } from "../../IInstructionOptions";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ThemeInstruction } from "./ThemeInstruction";

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
