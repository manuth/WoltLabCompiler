import { ICategory } from "../ICategory.js";
import { Option } from "../Option.js";
import { IACPOptionOptions } from "./IACPOptionOptions.js";

/**
 * Represents an option for the control-panel.
 */
export class ACPOption extends Option
{
    /**
     * A value indicating whether the option is visible.
     */
    private visible = true;

    /**
     * A value indicating whether the option is localizable.
     */
    private localizable = false;

    /**
     * A value indicating whether to force localization.
     */
    private forceLocalization = false;

    /**
     * Initializes a new instance of the {@link ACPOption `ACPOption`} class.
     *
     * @param category
     * The category of the option.
     *
     * @param options
     * The options of the acp-option.
     */
    public constructor(category: ICategory, options: IACPOptionOptions)
    {
        super(category, options);

        if (
            (options.Visible !== null) &&
            (options.Visible !== undefined))
        {
            this.Visible = options.Visible;
        }

        if (
            (options.Localizable !== null) &&
            (options.Localizable !== undefined))
        {
            this.Localizable = options.Localizable;
        }

        if (
            (options.ForceLocalization !== null) &&
            (options.ForceLocalization !== undefined))
        {
            this.ForceLocalization = options.ForceLocalization;
        }
    }

    /**
     * Gets or sets a value indicating whether the option is visible.
     */
    public get Visible(): boolean
    {
        return this.visible;
    }

    /**
     * @inheritdoc
     */
    public set Visible(value: boolean)
    {
        this.visible = value;
    }

    /**
     * Gets or sets a value indicating whether the option is localizable.
     */
    public get Localizable(): boolean
    {
        return this.localizable;
    }

    /**
     * @inheritdoc
     */
    public set Localizable(value: boolean)
    {
        this.localizable = value;
    }

    /**
     * Gets or sets a value indicating whether to force localization.
     */
    public get ForceLocalization(): boolean
    {
        return this.forceLocalization;
    }

    /**
     * @inheritdoc
     */
    public set ForceLocalization(value: boolean)
    {
        this.forceLocalization = value;
    }
}
