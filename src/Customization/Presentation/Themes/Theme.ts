import { Component } from "../../../PackageSystem/Component.js";
import { FileDescriptor } from "../../../PackageSystem/FileDescriptor.js";
import { ThemeInstruction } from "../../../PackageSystem/Instructions/Customization/Presentation/ThemeInstruction.js";
import { Person } from "../../../PackageSystem/Person.js";
import { VersionNumber } from "../../../PackageSystem/VersionNumber.js";
import { ImageDirectoryDescriptor } from "./ImageDirectoryDescriptor.js";
import { IThemeOptions } from "./IThemeOptions.js";

/**
 * Represents a theme.
 */
export class Theme extends Component
{
    /**
     * The name of the theme.
     */
    private name: string;

    /**
     * The thumbnail of the theme.
     */
    private thumbnail: FileDescriptor = null;

    /**
     * The high resolution version of the thumbnail.
     */
    private highResThumbnail: FileDescriptor = null;

    /**
     * The instruction which contains this theme.
     */
    private instruction: ThemeInstruction;

    /**
     * The path to the default cover-photo for user-profiles.
     */
    private coverPhoto: FileDescriptor = null;

    /**
     * The custom `scss`-code of the theme.
     */
    private customSCSS: string = null;

    /**
     * The variable-overrides of special `scss`-variables.
     */
    private scssOverride: string = null;

    /**
     * The variables of the theme.
     */
    private variables: Map<string, string> = new Map();

    /**
     * The image-directory provided by the theme.
     */
    private images: ImageDirectoryDescriptor = null;

    /**
     * Initializes a new instance of the {@link Theme `Theme`} class.
     *
     * @param instruction
     * The instruction of the theme.
     *
     * @param options
     * The options of the theme.
     */
    public constructor(instruction: ThemeInstruction, options: IThemeOptions)
    {
        super(
            {
                DisplayName: options.DisplayName,
                Version: options.Version,
                Author: options.Author,
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
            this.Thumbnail = new FileDescriptor(typeof options.Thumbnail === "string" ? { Source: options.Thumbnail } : options.Thumbnail);
        }

        if (
            (options.HighResThumbnail !== null) &&
            (options.HighResThumbnail !== undefined))
        {
            this.HighResThumbnail = new FileDescriptor(typeof options.HighResThumbnail === "string" ? { Source: options.HighResThumbnail } : options.HighResThumbnail);
        }

        if (
            (options.CoverPhoto !== null) &&
            (options.CoverPhoto !== undefined))
        {
            this.CoverPhoto = new FileDescriptor(typeof options.CoverPhoto === "string" ? { Source: options.CoverPhoto } : options.CoverPhoto);
        }

        if (
            (options.CustomScss !== null) &&
            (options.CustomScss !== undefined))
        {
            this.CustomScss = options.CustomScss;
        }

        if (
            (options.ScssOverride !== null) &&
            (options.ScssOverride !== undefined))
        {
            this.ScssOverride = options.ScssOverride;
        }

        if (
            (options.Variables !== null) &&
            (options.Variables !== undefined))
        {
            for (let entry of Object.entries(options.Variables))
            {
                this.Variables.set(entry[0], entry[1]);
            }
        }

        if (
            (options.Images !== null) &&
            (options.Images !== undefined))
        {
            this.images = new ImageDirectoryDescriptor(options.Images);
        }
    }

    /**
     * Gets or sets the name of the theme.
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
    public override get Version(): VersionNumber
    {
        return super.Version;
    }

    /**
     * @inheritdoc
     */
    public override set Version(value: VersionNumber)
    {
        super.Version = value;
    }

    /**
     * @inheritdoc
     */
    public override get Author(): Person
    {
        return super.Author ?? this.Instruction?.Collection?.Package?.Author ?? null;
    }

    /**
     * Gets or sets the thumbnail of the theme.
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
     * Gets or sets the high resolution version of the thumbnail.
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
     * Gets the instruction which contains this theme.
     */
    public get Instruction(): ThemeInstruction
    {
        return this.instruction;
    }

    /**
     * Gets or sets the path to the default cover-photo for user-profiles.
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
     * Gets or sets the `scss`-code of the theme.
     */
    public get CustomScss(): string
    {
        return this.customSCSS;
    }

    /**
     * @inheritdoc
     */
    public set CustomScss(value: string)
    {
        this.customSCSS = value;
    }

    /**
     * Gets or sets the variable-overrides of special `scss`-variables.
     */
    public get ScssOverride(): string
    {
        return this.scssOverride;
    }

    /**
     * @inheritdoc
     */
    public set ScssOverride(value: string)
    {
        this.scssOverride = value;
    }

    /**
     * Gets the variables of the theme.
     */
    public get Variables(): Map<string, string>
    {
        return this.variables;
    }

    /**
     * Gets the image-directory of the theme.
     */
    public get Images(): ImageDirectoryDescriptor
    {
        return this.images;
    }
}
