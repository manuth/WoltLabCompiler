import path from "upath";
import { InstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/InstructionCompiler.js";
import { ThemeInstructionCompiler } from "../../../../Compilation/PackageSystem/Instructions/ThemeInstructionCompiler.js";
import { ThemeLoader } from "../../../../Customization/Presentation/Themes/ThemeLoader.js";
import { Instruction } from "../../Instruction.js";
import { IThemeInstructionOptions } from "./IThemeInstructionOptions.js";

const { join } = path;

/**
 * The name of the {@link ThemeInstruction `ThemeInstruction`}-type.
 */
const STYLE_TYPENAME = "style";

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
                FileName: options.FileName || join(STYLE_TYPENAME, `${options.Theme.Name}.tar`)
            });

        this.themeLoader = new ThemeLoader(this, options.Theme);
    }

    /**
     * @inheritdoc
     */
    public get Type(): string
    {
        return STYLE_TYPENAME;
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
