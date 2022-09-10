import fs from "fs-extra";
import { Theme } from "../../Customization/Presentation/Themes/Theme.js";
import { Compiler } from "../Compiler.js";
import { ThemeFileCompiler } from "./ThemeFileCompiler.js";
import { ThemeVariableCompiler } from "./ThemeVariableCompiler.js";

const { copy } = fs;

/**
 * Provides the functionality to compile themes.
 */
export class ThemeCompiler extends Compiler<Theme>
{
    /**
     * The name to save the variables to.
     */
    private variableFileName = "variables.xml";

    /**
     * Initializes a new instance of the {@link ThemeCompiler `ThemeCompiler`} class.
     *
     * @param item
     * The item to compile.
     *
     * @param variableFileName
     * The name of the variable-file.
     */
    public constructor(item: Theme, variableFileName?: string)
    {
        super(item);

        if (variableFileName)
        {
            this.VariableFileName = variableFileName;
        }
    }

    /**
     * Gets or sets the filename to save variables to.
     */
    public get VariableFileName(): string
    {
        return this.variableFileName;
    }

    /**
     * @inheritdoc
     */
    public set VariableFileName(value: string)
    {
        this.variableFileName = value;
    }

    /**
     * @inheritdoc
     */
    protected async Compile(): Promise<void>
    {
        let variables = new Map(this.Item.Variables);

        if (this.Item.CustomScss)
        {
            variables.set("individualScss", this.Item.CustomScss);
        }

        if (this.Item.ScssOverride)
        {
            variables.set("overrideScss", this.Item.ScssOverride);
        }

        let themeFileCompiler = new ThemeFileCompiler(this.Item, this.VariableFileName);
        themeFileCompiler.DestinationPath = this.MakeDestinationPath("style.xml");
        await themeFileCompiler.Execute();

        if (variables.size > 0)
        {
            let variableCompiler = new ThemeVariableCompiler(variables);
            variableCompiler.DestinationPath = this.MakeDestinationPath(this.VariableFileName);
            await variableCompiler.Execute();
        }

        if (this.Item.Thumbnail)
        {
            await copy(this.Item.Thumbnail.Source, this.MakeDestinationPath(this.Item.Thumbnail.FileName));
        }

        if (this.Item.HighResThumbnail)
        {
            await copy(this.Item.HighResThumbnail.Source, this.MakeDestinationPath(this.Item.HighResThumbnail.FileName));
        }

        if (this.Item.CoverPhoto)
        {
            await copy(this.Item.CoverPhoto.Source, this.MakeDestinationPath(this.Item.CoverPhoto.FileName));
        }

        if (this.Item.Images)
        {
            await this.Compress(this.Item.Images.Source, this.MakeDestinationPath(this.Item.Images.FileName));
        }
    }
}
