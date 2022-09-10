import { EOL } from "os";
import { get } from "colornames";
import { readFile, readJSON } from "fs-extra";
import hexToRgba = require("hex-to-rgba");
import parseSassValue = require("parse-sass-value");
import { isAbsolute, join } from "upath";
import { Component } from "../../../PackageSystem/Component";
import { FileDescriptor } from "../../../PackageSystem/FileDescriptor";
import { IFileDescriptorOptions } from "../../../PackageSystem/IFileDescriptorOptions";
import { ThemeInstruction } from "../../../PackageSystem/Instructions/Customization/Presentation/ThemeInstruction";
import { Person } from "../../../PackageSystem/Person";
import { ImageDirectoryDescriptor } from "./ImageDirectoryDescriptor";
import { IThemeLoaderOptions } from "./IThemeLoaderOptions";
import { IThemeOptions } from "./IThemeOptions";
import { SassVariableParser } from "./SassVariableParser";
import { Theme } from "./Theme";
import { ThemeVariables } from "./ThemeVariables";

/**
 * Provides the functionality to load themes from files.
 */
export class ThemeLoader extends Component
{
    /**
     * The instruction of the theme-loader.
     */
    private instruction: ThemeInstruction;

    /**
     * The name of the theme to load.
     */
    private name: string;

    /**
     * The thumbnail of the theme to load.
     */
    private thumbnail: FileDescriptor;

    /**
     * The high-resolution version of the thumbnail of the theme to load.
     */
    private highResThumbnail: FileDescriptor;

    /**
     * The cover-photo of the theme to load.
     */
    private coverPhoto: FileDescriptor = null;

    /**
     * The path to the file containing custom `scss`-code of the theme to load.
     */
    private customScssFileName: string = null;

    /**
     * The path to the file containing special `scss`-variables of the theme to load.
     */
    private scssOverrideFileName: string = null;

    /**
     * The name of the file containing variables of the theme to load.
     */
    private variableFileName: string = null;

    /**
     * The variables of the theme to load.
     */
    private variables: Map<string, string> = new Map();

    /**
     * The image-directory of the theme to load.
     */
    private images: ImageDirectoryDescriptor = null;

    /**
     * Initializes a new instance of the {@link ThemeLoader `ThemeLoader`} class.
     *
     * @param instruction
     * The instruction of the theme-loader.
     *
     * @param options
     * The options of the theme-loader.
     */
    public constructor(instruction: ThemeInstruction, options: IThemeLoaderOptions)
    {
        super(
            {
                DisplayName: options.DisplayName,
                Author: options.Author,
                Version: options.Version,
                CreationDate: options.CreationDate,
                Description: options.Description,
                License: options.License
            });

        this.instruction = instruction;
        this.Name = options.Name;

        if (
            (options.Thumbnail !== null) &&
            (options.Thumbnail !== undefined))
        {
            this.Thumbnail = this.LoadFileDescriptor(options.Thumbnail);
        }

        if (
            (options.HighResThumbnail !== null) &&
            (options.HighResThumbnail !== undefined))
        {
            this.HighResThumbnail = this.LoadFileDescriptor(options.HighResThumbnail);
        }

        if (
            (options.CoverPhoto !== null) &&
            (options.CoverPhoto !== undefined))
        {
            this.CoverPhoto = this.LoadFileDescriptor(options.CoverPhoto);
        }

        if (
            (options.Images !== null) &&
            (options.Images !== undefined))
        {
            this.Images = new ImageDirectoryDescriptor(options.Images);
        }

        if (
            (options.CustomScssFileName !== null) &&
            (options.CustomScssFileName !== undefined))
        {
            this.CustomScssFileName = options.CustomScssFileName;
        }

        if (
            (options.ScssOverrideFileName !== null) &&
            (options.ScssOverrideFileName !== undefined))
        {
            this.ScssOverrideFileName = options.ScssOverrideFileName;
        }

        if (
            (options.VariableFileName !== null) &&
            (options.VariableFileName !== undefined))
        {
            this.VariableFileName = options.VariableFileName;
        }
    }

    /**
     * Gets the instruction of the theme-loader.
     */
    public get Instruction(): ThemeInstruction
    {
        return this.instruction;
    }

    /**
     * Gets or sets the name of the theme to load.
     */
    public get Name(): string
    {
        return this.name;
    }

    /**
     * @inheritdoc
     */
    public set Name(value: string)
    {
        this.name = value;
    }

    /**
     * @inheritdoc
     */
    public override get Author(): Person
    {
        return super.Author;
    }

    /**
     * Gets or sets the thumbnail of the theme to load.
     */
    public get Thumbnail(): FileDescriptor
    {
        return this.thumbnail;
    }

    /**
     * @inheritdoc
     */
    public set Thumbnail(value: FileDescriptor)
    {
        this.thumbnail = value;
    }

    /**
     * Gets or sets the high resolution version of the thumbnail of the theme to load.
     */
    public get HighResThumbnail(): FileDescriptor
    {
        return this.highResThumbnail;
    }

    /**
     * @inheritdoc
     */
    public set HighResThumbnail(value: FileDescriptor)
    {
        this.highResThumbnail = value;
    }

    /**
     * Gets or sets the path to the default cover-photo for user-profiles of the theme to load.
     */
    public get CoverPhoto(): FileDescriptor
    {
        return this.coverPhoto;
    }

    /**
     * @inheritdoc
     */
    public set CoverPhoto(value: FileDescriptor)
    {
        this.coverPhoto = value;
    }

    /**
     * Gets or sets the path to the file containing custom `scss`-code of the theme to load.
     */
    public get CustomScssFileName(): string
    {
        return this.customScssFileName;
    }

    /**
     * @inheritdoc
     */
    public set CustomScssFileName(value: string)
    {
        this.customScssFileName = value;
    }

    /**
     * Gets or sets the path to the file containing special `scss`-variables of the theme to load.
     */
    public get ScssOverrideFileName(): string
    {
        return this.scssOverrideFileName;
    }

    /**
     * @inheritdoc
     */
    public set ScssOverrideFileName(value: string)
    {
        this.scssOverrideFileName = value;
    }

    /**
     * Gets or sets the name of the file containing variables of the theme to load.
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
     * Gets or sets the variables of the theme to load.
     */
    public get Variables(): Map<string, string>
    {
        return this.variables;
    }

    /**
     * Gets or sets the image-directory of the theme to load.
     */
    public get Images(): ImageDirectoryDescriptor
    {
        return this.images;
    }

    /**
     * @inheritdoc
     */
    public set Images(value: ImageDirectoryDescriptor)
    {
        this.images = value;
    }

    /**
     * Loads the theme.
     *
     * @returns
     * The newly loaded theme.
     */
    public async Load(): Promise<Theme>
    {
        let scssOverrides: Map<string, string> = new Map();
        let variables: Record<string, string> = Object.fromEntries(this.Variables.entries());

        let themeOptions: IThemeOptions = {
            Name: this.Name,
            DisplayName: Object.fromEntries(this.DisplayName.Data.entries()),
            Description: Object.fromEntries(this.Description.Data.entries()),
            Version: this.Version,
            Author: this.Author,
            CreationDate: this.CreationDate,
            Thumbnail: this.Thumbnail,
            HighResThumbnail: this.HighResThumbnail,
            CoverPhoto: this.CoverPhoto,
            Images: this.Images,
            License: this.License,
            Variables: {}
        };

        if (this.CustomScssFileName)
        {
            themeOptions.CustomScss = (await readFile(this.CustomScssFileName)).toString();
        }

        if (this.ScssOverrideFileName)
        {
            Object.assign(variables, await new SassVariableParser(this.ScssOverrideFileName).Parse());
        }

        if (this.VariableFileName)
        {
            let fileName = join(...(isAbsolute(this.VariableFileName) ? [this.VariableFileName] : [process.cwd(), this.VariableFileName]));
            Object.assign(variables, await readJSON(fileName));
        }

        for (let name in variables)
        {
            let value = variables[name];

            if (ThemeVariables.Names.includes(name))
            {
                if (/#(([0-9a-fA-F]{3}){1,2}|(0-9a-fA-F]{4}){1,2})/.test(value))
                {
                    themeOptions.Variables[name] = hexToRgba(value);
                }
                else if (
                    typeof value === "string" &&
                    get.css(value))
                {
                    themeOptions.Variables[name] = hexToRgba(get.css(value).value);
                }
                else if (value === "transparent")
                {
                    themeOptions.Variables[name] = hexToRgba("#0000");
                }
                else
                {
                    themeOptions.Variables[name] = value;
                }
            }
            else
            {
                scssOverrides.set(name, value);
            }
        }

        if (scssOverrides.size > 0)
        {
            themeOptions.ScssOverride = Array.from(scssOverrides).map(
                (overrideEntry) =>
                {
                    return `$${overrideEntry[0]}: ${(parseSassValue as any as typeof parseSassValue.default)(overrideEntry[1], { quote: "double" })};`;
                }).join(EOL);
        }

        return new Theme(this.Instruction, themeOptions);
    }

    /**
     * Loads the file-descriptor from the specified {@link options `options`}.
     *
     * @param options
     * The options for creating the {@link FileDescriptor `FileDescriptor`}.
     *
     * @returns
     * The newly created {@link FileDescriptor `FileDescriptor`}.
     */
    protected LoadFileDescriptor(options: string | IFileDescriptorOptions): FileDescriptor
    {
        let fileOptions: IFileDescriptorOptions;

        if (typeof options === "string")
        {
            fileOptions = {
                Source: options
            };
        }
        else
        {
            fileOptions = options;
        }

        return new FileDescriptor(fileOptions);
    }
}
