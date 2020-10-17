import { InstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/InstructionCompiler";
import { ThemeInstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/ThemeInstructionCompiler";
import { Theme } from "../../../../Customization/Presentation/Themes/Theme";
import { Instruction } from "../../Instruction";
import { IThemeInstructionOptions } from "./IThemeInstructionOptions";

/**
 * Represents an instruction which provides a theme.
 */
export class ThemeInstruction extends Instruction
{
    /**
     * The theme provided by the instruction.
     */
    private theme: Theme;

    /**
     * Initializes a new instance of the `ThemeInstruction` class.
     *
     * @param options
     * The options for the theme-instruction.
     */
    public constructor(options: IThemeInstructionOptions)
    {
        super(
            {
                FileName: options.FileName || `${options.Theme.Name}.tar`
            });

        this.theme = new Theme(this, options.Theme);
    }

    /**
     * @inheritdoc
     */
    public get Type(): string
    {
        return "style";
    }

    /**
     * Gets the theme provided by the instruction.
     */
    public get Theme(): Theme
    {
        return this.theme;
    }

    /**
     * @inheritdoc
     */
    public get Compiler(): InstructionCompiler<ThemeInstruction>
    {
        return new ThemeInstructionCompiler(this);
    }
}
