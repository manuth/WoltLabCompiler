import { InstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/InstructionCompiler";
import { ThemeInstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/ThemeInstructionCompiler";
import { ThemeLoader } from "../../../../Customization/Presentation/Themes/ThemeLoader";
import { Instruction } from "../../Instruction";
import { IThemeInstructionOptions } from "./IThemeInstructionOptions";

/**
 * Represents an instruction which provides a theme.
 */
export class ThemeInstruction extends Instruction
{
    /**
     * The theme-loader provided by the instruction.
     */
    private themeLoader: ThemeLoader;

    /**
     * Initializes a new instance of the {@link ThemeInstruction `ThemeInstruction`} class.
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

        this.themeLoader = new ThemeLoader(this, options.Theme);
    }

    /**
     * @inheritdoc
     */
    public get Type(): string
    {
        return "style";
    }

    /**
     * Gets the theme-loader provided by the instruction.
     */
    public get ThemeLoader(): ThemeLoader
    {
        return this.themeLoader;
    }

    /**
     * @inheritdoc
     */
    public override get Compiler(): InstructionCompiler<ThemeInstruction>
    {
        return new ThemeInstructionCompiler(this);
    }
}
