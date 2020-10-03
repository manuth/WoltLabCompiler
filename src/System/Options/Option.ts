import { Localization } from "../Globalization/Localization";
import { ICategory } from "./ICategory";
import { IOptionOptions } from "./IOptionOptions";
import { OptionItem } from "./OptionItem";
import { OptionType } from "./OptionType";

/**
 * Represents an option.
 */
export abstract class Option
{
    /**
     * The id of the option.
     */
    private id: string = null;

    /**
     * The name of the option.
     */
    private name: string;

    /**
     * The human-readable name of the option.
     */
    private displayName: Localization = new Localization();

    /**
     * The description of the option.
     */
    private description: Localization = new Localization();

    /**
     * The category of the option.
     */
    private category: ICategory = null;

    /**
     * The type of the option.
     */
    private type: OptionType | string = OptionType.TextBox;

    /**
     * The default value of the option.
     */
    private defaultValue: unknown = null;

    /**
     * The show-order of the option.
     */
    private showOrder: number = null;

    /**
     * The validation-pattern of the option.
     */
    private validationPattern: RegExp = null;

    /**
     * The items of the option.
     */
    private items: OptionItem[] = [];

    /**
     * A list of options of which at least one needs to be enabled for the option to be shown.
     */
    private options: string[] = [];

    /**
     * A list of options which should be visually enabled when this option is enabled.
     *
     * A leading exclamation mark (`!`, `U+0021`) will disable the specified option when this option is enabled.
     * For `ComboBox` and `RadioButton` types the list should be prefixed by the name of the `selectoption`s followed by a colon (`:`, `U+003A`).
     *
     * This setting is a visual helper for the administrator only.
     * It does not have an effect on the server side processing of the option.
     */
    private enableOptions: string[] = [];

    /**
     * A set of additional properties of the option.
     */
    private additionalProperties: Record<string, unknown> = {};

    /**
     * Initializes a new instance of the `Option` class.
     *
     * @param category
     * The category of the option.
     *
     * @param options
     * The options of the option.
     */
    public constructor(category: ICategory, options: IOptionOptions)
    {
        this.category = category;

        if (options.ID)
        {
            this.ID = options.ID;
        }

        this.Name = options.Name;

        if (options.DisplayName)
        {
            this.DisplayName.Data = options.DisplayName;
        }

        if (options.Description)
        {
            this.Description.Data = options.Description;
        }

        if (options.Type)
        {
            this.Type = options.Type;
        }

        if (options.DefaultValue)
        {
            this.DefaultValue = options.DefaultValue;
        }

        if (options.ShowOrder)
        {
            this.ShowOrder = options.ShowOrder;
        }

        if (options.ValidationPattern)
        {
            this.ValidationPattern = options.ValidationPattern;
        }

        if (options.Items)
        {
            for (let item of options.Items)
            {
                this.Items.push(new OptionItem(this, item));
            }
        }

        if (options.Options)
        {
            this.Options = options.Options;
        }

        if (options.EnableOptions)
        {
            this.EnableOptions = options.EnableOptions;
        }

        if (options.AdditionalProperties)
        {
            this.AdditionalProperties = options.AdditionalProperties;
        }
    }

    /**
     * Gets or sets the id of the option.
     */
    public get ID(): string
    {
        return this.id;
    }

    /**
     * @inheritdoc
     */
    public set ID(value: string)
    {
        this.id = value;
    }

    /**
     * Gets or sets the name of the option.
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
     * Gets the human-readable name of the option.
     */
    public get DisplayName(): Localization
    {
        return this.displayName;
    }

    /**
     * Gets the description of the option.
     */
    public get Description(): Localization
    {
        return this.description;
    }

    /**
     * Gets the category of the option.
     */
    public get Category(): ICategory
    {
        return this.category;
    }

    /**
     * Gets or sets the type of the option.
     */
    public get Type(): OptionType | string
    {
        return this.type;
    }

    /**
     * @inheritdoc
     */
    public set Type(value: OptionType | string)
    {
        this.type = value;
    }

    /**
     * Gets or sets the default value of the option.
     */
    public get DefaultValue(): unknown
    {
        return this.defaultValue;
    }

    /**
     * @inheritdoc
     */
    public set DefaultValue(value: unknown)
    {
        this.defaultValue = value;
    }

    /**
     * Gets or sets the show-order of the option.
     */
    public get ShowOrder(): number
    {
        return this.showOrder;
    }

    /**
     * @inheritdoc
     */
    public set ShowOrder(value: number)
    {
        this.showOrder = value;
    }

    /**
     * Gets or sets the validation-pattern of the option.
     */
    public get ValidationPattern(): RegExp
    {
        return this.validationPattern;
    }

    /**
     * @inheritdoc
     */
    public set ValidationPattern(value: RegExp)
    {
        this.validationPattern = value;
    }

    /**
     * Gets the items of the option.
     */
    public get Items(): OptionItem[]
    {
        return this.items;
    }

    /**
     * Gets or sets a list of options of which at least one needs to be enabled for the option to be shown.
     */
    public get Options(): string[]
    {
        return this.options;
    }

    /**
     * @inheritdoc
     */
    public set Options(value: string[])
    {
        this.options = value;
    }

    /**
     * Gets or sets a list of options which should be visually enabled when this option is enabled.
     *
     * A leading exclamation mark (`!`, `U+0021`) will disable the specified option when this option is enabled.
     * For `ComboBox` and `RadioButton` types the list should be prefixed by the name of the `selectoption`s followed by a colon (`:`, `U+003A`).
     *
     * This setting is a visual helper for the administrator only.
     * It does not have an effect on the server side processing of the option.
     */
    public get EnableOptions(): string[]
    {
        return this.enableOptions;
    }

    /**
     * @inheritdoc
     */
    public set EnableOptions(value: string[])
    {
        this.enableOptions = value;
    }

    /**
     * Gets or sets a set of additional properties of the option.
     */
    public get AdditionalProperties(): Record<string, unknown>
    {
        return this.additionalProperties;
    }

    /**
     * @inheritdoc
     */
    public set AdditionalProperties(value: Record<string, unknown>)
    {
        this.additionalProperties = value;
    }
}
