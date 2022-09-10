import { Localization } from "../Globalization/Localization.js";
import { IOptionItemOptions } from "./IOptionItemOptions.js";
import { Option } from "./Option.js";

/**
 * Represents an item of an option.
 */
export class OptionItem
{
    /**
     * The name of the item.
     */
    private name: string;

    /**
     * The human-readable name of the item.
     */
    private displayName: Localization = new Localization();

    /**
     * The value of the item.
     */
    private value: any;

    /**
     * The option of the item.
     */
    private option: Option;

    /**
     * Initializes a new instance of the {@link OptionItem `OptionItem`} class.
     *
     * @param option
     * The option of the item.
     *
     * @param options
     * The options of the item.
     */
    public constructor(option: Option, options: IOptionItemOptions)
    {
        this.option = option;
        this.Name = options.Name;

        if (
            (options.DisplayName !== null) &&
            (options.DisplayName !== undefined))
        {
            this.DisplayName.Load(options.DisplayName);
        }

        this.Value = options.Value;
    }

    /**
     * Gets or sets the name of the item.
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
     * Gets the human-readable name of the item.
     */
    public get DisplayName(): Localization
    {
        return this.displayName;
    }

    /**
     * Gets the value of the item.
     */
    public get Value(): unknown
    {
        return this.value;
    }

    /**
     * @inheritdoc
     */
    public set Value(value: unknown)
    {
        this.value = value;
    }

    /**
     * Gets the option of the item.
     */
    public get Option(): Option
    {
        return this.option;
    }
}
