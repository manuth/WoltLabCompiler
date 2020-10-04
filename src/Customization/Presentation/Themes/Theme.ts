import { EOL } from "os";
import { get } from "colornames";
import { readFileSync } from "fs-extra";
import hexToRgba = require("hex-to-rgba");
import { isAbsolute, join } from "upath";
import { Component } from "../../../PackageSystem/Component";
import { FileDescriptor } from "../../../PackageSystem/FileDescriptor";
import { ThemeInstruction } from "../../../PackageSystem/Instructions/Customization/Presentation/ThemeInstruction";
import { Person } from "../../../PackageSystem/Person";
import { ImageDirectoryDescriptor } from "./ImageDirectoryDescriptor";
import { IThemeOptions } from "./IThemeOptions";
import { SassVariableParser } from "./SassVariableParser";

/**
 * Represents a theme.
 */
export class Theme extends Component
{
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
     * The `scss`-code of the theme.
     */
    private customSCSS: string = null;

    /**
     * The variable-overrides of special `scss`-variables.
     */
    private scssOverride: string = null;

    /**
     * The variables of the theme.
     */
    private variables: Record<string, string> = {};

    /**
     * The image-directory provided by the theme.
     */
    private images: ImageDirectoryDescriptor = null;

    /**
     * Initializes a new instance of the `Theme` class.
     *
     * @param instruction
     * The instruction of the theme.
     *
     * @param options
     * The options of the theme.
     */
    public constructor(instruction: ThemeInstruction, options: IThemeOptions)
    {
        super({
            Name: options.Name,
            DisplayName: options.DisplayName,
            Version: options.Version,
            Author: options.Author,
            CreationDate: options.CreationDate,
            Description: options.Description,
            License: options.License
        });

        let variables: Record<string, string> = {};
        this.instruction = instruction;

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
            (options.CustomScssFileName !== null) &&
            (options.CustomScssFileName !== undefined))
        {
            this.CustomScss = readFileSync(options.CustomScssFileName).toString();
        }

        if (
            (options.ScssOverrideFileName !== null) &&
            (options.ScssOverrideFileName !== undefined))
        {
            Object.assign(variables, new SassVariableParser(options.ScssOverrideFileName).Parse());
        }

        if (
            (options.VariableFileName !== null) &&
            (options.VariableFileName !== undefined))
        {
            Object.assign(
                variables,
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                require(
                    join(
                        ...(isAbsolute(options.VariableFileName) ? [options.VariableFileName] : [process.cwd(), options.VariableFileName]))));
        }

        if (
            (options.Images !== null) &&
            (options.Images !== undefined))
        {
            this.images = new ImageDirectoryDescriptor(options.Images);
        }

        this.ParseVariables(variables);
    }

    /**
     * @inheritdoc
     */
    public get Author(): Person
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
    public get Variables(): Record<string, string>
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

    /**
     * Parses the variables and adds them either to the override scss-code or the variables-property.
     *
     * @param variables
     * The variables to parse.
     */
    protected ParseVariables(variables: Record<string, string>): void
    {
        let normalVariables: Record<string, string> = {};
        let specialVariables: Record<string, string> = {};

        for (let name in variables)
        {
            switch (name)
            {
                // Common variables
                case "wcfLayoutMinWidth":
                case "wcfLayoutMaxWidth":
                case "pageLogo":
                case "pageLogoWidth":
                case "pageLogoHeight":
                case "pageLogoMobile":
                case "wcfFontSizeDefault":
                case "wcfFontSizeSmall":
                case "wcfFontSizeHeadline":
                case "wcfFontSizeSection":
                case "wcfFontSizeTitle":
                case "useGoogleFont":
                case "wcfFontFamilyGoogle":
                case "wcfFontFamilyFallback":
                case "wcfHeaderBackground":
                case "wcfHeaderText":
                case "wcfHeaderLink":
                case "wcfHeaderLinkActive":
                case "wcfHeaderSearchBoxBackground":
                case "wcfHeaderSearchBoxText":
                case "wcfHeaderSearchBoxPlaceholder":
                case "wcfHeaderSearchBoxPlaceholderActive":
                case "wcfHeaderSearchBoxBackgroundActive":
                case "wcfHeaderSearchBoxTextActive":
                case "wcfHeaderMenuBackground":
                case "wcfHeaderMenuLinkBackground":
                case "wcfHeaderMenuLinkBackgroundActive":
                case "wcfHeaderMenuLink":
                case "wcfHeaderMenuLinkActive":
                case "wcfHeaderMenuDropdownBackground":
                case "wcfHeaderMenuDropdownLink":
                case "wcfHeaderMenuDropdownBackgroundActive":
                case "wcfHeaderMenuDropdownLinkActive":
                case "wcfNavigationBackground":
                case "wcfNavigationText":
                case "wcfNavigationLink":
                case "wcfNavigationLinkActive":
                case "wcfSidebarBackground":
                case "wcfSidebarText":
                case "wcfSidebarLink":
                case "wcfSidebarLinkActive":
                case "wcfSidebarDimmedText":
                case "wcfSidebarDimmedLink":
                case "$wcfSidebarDimmedLinkActive":
                case "wcfSidebarHeadlineText":
                case "wcfSidebarHeadlineLink":
                case "wcfSidebarHeadlineLinkActive":
                case "wcfContentBackground":
                case "wcfContentBorder":
                case "wcfContentBorderInner":
                case "wcfContentText":
                case "wcfContentLink":
                case "wcfContentLinkActive":
                case "wcfContentContainerBackground":
                case "wcfContentContainerBorder":
                case "wcfContentDimmedText":
                case "wcfContentDimmedLink":
                case "wcfContentDimmedLinkActive":
                case "wcfContentHeadlineBorder":
                case "wcfContentHeadlineText":
                case "wcfContentHeadlineLink":
                case "wcfContentHeadlineLinkActive":
                case "wcfTabularBoxBorderInner":
                case "wcfTabularBoxHeadline":
                case "wcfTabularBoxBackgroundActive":
                case "wcfTabularBoxHeadlineActive":
                case "wcfInputLabel":
                case "wcfInputBackground":
                case "wcfInputBorder":
                case "wcfInputText":
                case "wcfInputPlaceholder":
                case "wcfInputPlaceholderActive":
                case "wcfInputBackgroundActive":
                case "wcfInputBorderActive":
                case "wcfInputTextActive":
                case "wcfInputDisabledBackground":
                case "wcfInputDisabledBorder":
                case "wcfInputDisabledText":
                case "wcfButtonBackground":
                case "wcfButtonText":
                case "wcfButtonBackgroundActive":
                case "wcfButtonTextActive":
                case "wcfButtonPrimaryBackground":
                case "wcfButtonPrimaryText":
                case "wcfButtonPrimaryBackgroundActive":
                case "wcfButtonPrimaryTextActive":
                case "wcfButtonDisabledBackground":
                case "wcfButtonDisabledText":
                case "wcfEditorButtonBackground":
                case "wcfEditorButtonBackgroundActive":
                case "wcfEditorButtonText":
                case "wcfEditorButtonTextActive":
                case "wcfEditorButtonTextDisabled":
                case "wcfDropdownBackground":
                case "wcfDropdownBorderInner":
                case "wcfDropdownText":
                case "wcfDropdownLink":
                case "wcfDropdownBackgroundActive":
                case "wcfDropdownLinkActive":
                case "wcfStatusInfoBackground":
                case "wcfStatusInfoBorder":
                case "wcfStatusInfoText":
                case "wcfStatusInfoLink":
                case "wcfStatusInfoLinkActive":
                case "wcfStatusSuccessBackground":
                case "wcfStatusSuccessBorder":
                case "wcfStatusSuccessText":
                case "wcfStatusSuccessLink":
                case "wcfStatusSuccessLinkActive":
                case "wcfStatusWarningBackground":
                case "wcfStatusWarningBorder":
                case "wcfStatusWarningText":
                case "wcfStatusWarningLink":
                case "wcfStatusWarningLinkActive":
                case "wcfStatusErrorBackground":
                case "wcfStatusErrorBorder":
                case "wcfStatusErrorText":
                case "wcfStatusErrorLink":
                case "wcfStatusErrorLinkActive":
                case "wcfFooterBoxBackground":
                case "wcfFooterBoxText":
                case "wcfFooterBoxLink":
                case "wcfFooterBoxLinkActive":
                case "wcfFooterBoxHeadlineText":
                case "wcfFooterBoxHeadlineLink":
                case "wcfFooterBoxHeadlineLinkActive":
                case "wcfFooterBackground":
                case "wcfFooterText":
                case "wcfFooterLink":
                case "wcfFooterLinkActive":
                case "wcfFooterHeadlineText":
                case "wcfFooterHeadlineLink":
                case "wcfFooterHeadlineLinkActive":
                case "wcfFooterCopyrightBackground":
                case "wcfFooterCopyrightText":
                case "wcfFooterCopyrightLink":
                case "wcfFooterCopyrightLinkActive":
                    if (/#(([0-9a-fA-F]{3}){1,2}|([0-9a-fA-F]{4}){1,2})/.test(variables[name]))
                    {
                        normalVariables[name] = hexToRgba(variables[name]);
                    }
                    else if (get.css(variables[name]))
                    {
                        normalVariables[name] = hexToRgba(get.css(variables[name]).value);
                    }
                    else if (variables[name] === "transparent")
                    {
                        normalVariables[name] = hexToRgba("#0000");
                    }
                    else
                    {
                        normalVariables[name] = variables[name];
                    }
                    break;

                default:
                    specialVariables[name] = variables[name];
                    break;
            }
        }

        this.variables = normalVariables;

        if (Object.keys(specialVariables).length > 0)
        {
            this.ScssOverride = Object.keys(specialVariables).map(
                (name: string) =>
                {
                    return `$${name}: ${specialVariables[name]};`;
                }).join(EOL);
        }
    }
}
