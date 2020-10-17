import { ICategory } from "../ICategory";
import { Option } from "../Option";
import { IGroupOptionOptions } from "./IGroupOptionOptions";

/**
 * Represents an option which controls the permission of a user-group.
 */
export class GroupOption extends Option
{
    /**
     * The default value for groups which apply to registered users.
     */
    private userDefaultValue: unknown = null;

    /**
     * The default value for groups which have access to the moderation-section.
     */
    private modDefaultValue: unknown = null;

    /**
     * The default value for groups with administrator permissions.
     */
    private adminDefaultValue: unknown = null;

    /**
     * A value indicating whether the option only applies to groups for registered users.
     */
    private registeredOnly = false;

    /**
     * Initializes a new instance of the `GroupOption` class.
     *
     * @param category
     * The category of the group-option.
     *
     * @param options
     * The options of the group-option.
     */
    public constructor(category: ICategory, options: IGroupOptionOptions)
    {
        super(category, options);

        if (
            (options.UserDefaultValue !== null) &&
            (options.UserDefaultValue !== undefined))
        {
            this.UserDefaultValue = options.UserDefaultValue;
        }

        if (
            (options.ModDefaultValue !== null) &&
            (options.ModDefaultValue !== undefined))
        {
            this.ModDefaultValue = options.ModDefaultValue;
        }

        if (
            (options.AdminDefaultValue !== null) &&
            (options.AdminDefaultValue !== undefined))
        {
            this.AdminDefaultValue = options.AdminDefaultValue;
        }

        if (
            (options.RegisteredOnly !== null) &&
            (options.RegisteredOnly !== undefined))
        {
            this.RegisteredOnly = options.RegisteredOnly;
        }
    }

    /**
     * Gets or sets the default value for groups which apply to registered users.
     */
    public get UserDefaultValue(): unknown
    {
        return this.userDefaultValue;
    }

    /**
     * @inheritdoc
     */
    public set UserDefaultValue(value: unknown)
    {
        this.userDefaultValue = value;
    }

    /**
     * Gets or sets the default value for groups which have access to the moderation-section.
     */
    public get ModDefaultValue(): unknown
    {
        return this.modDefaultValue;
    }

    /**
     * @inheritdoc
     */
    public set ModDefaultValue(value: unknown)
    {
        this.modDefaultValue = value;
    }

    /**
     * Gets or sets the default value for groups with administrator permissions.
     */
    public get AdminDefaultValue(): unknown
    {
        return this.adminDefaultValue;
    }

    /**
     * @inheritdoc
     */
    public set AdminDefaultValue(value: unknown)
    {
        this.adminDefaultValue = value;
    }

    /**
     * Gets or sets a value indicating whether the option only applies to groups for registered users.
     */
    public get RegisteredOnly(): boolean
    {
        return this.registeredOnly;
    }

    /**
     * @inheritdoc
     */
    public set RegisteredOnly(value: boolean)
    {
        this.registeredOnly = value;
    }
}
