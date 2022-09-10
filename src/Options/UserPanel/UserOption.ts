import { ICategory } from "../ICategory.js";
import { Option } from "../Option.js";
import { EditPermission } from "./EditPermission.js";
import { IUserOptionOptions } from "./IUserOptionOptions.js";
import { ViewPermission } from "./ViewPermission.js";

/**
 * Represents an option for users.
 */
export class UserOption extends Option
{
    /**
     * A value indicating whether the option is required.
     */
    private required = false;

    /**
     * A value indicating whether users are ask for setting the option during registration.
     */
    private askOnRegistration = false;

    /**
     * The permissions which are required for editing the option.
     */
    private editPermissions: EditPermission;

    /**
     * The permissions which are required for viewing the option.
     */
    private viewPermissions: ViewPermission;

    /**
     * A value indicating whether users can be searched by the value of the option.
     */
    private searchable = false;

    /**
     * The php-class which formats the output of the option.
     *
     * The class must implement the `wcf\system\option\user\IUserOptionOutput` interface.
     */
    private outputClass: string = null;

    /**
     * Initializes a new instance of the {@link UserOption `UserOption`} class.
     *
     * @param category
     * The category of the option.
     *
     * @param options
     * The options of the user-option.
     */
    public constructor(category: ICategory, options: IUserOptionOptions)
    {
        super(category, options);

        if (
            (options.Required !== null) &&
            (options.Required !== undefined))
        {
            this.Required = options.Required;
        }

        if (
            (options.AskOnRegistration !== null) &&
            (options.AskOnRegistration !== undefined))
        {
            this.AskOnRegistration = options.AskOnRegistration;
        }

        this.EditPermissions = options.EditPermissions;
        this.ViewPermissions = options.ViewPermissions;

        if (
            (options.Searchable !== null) &&
            (options.Searchable !== undefined))
        {
            this.Searchable = options.Searchable;
        }

        if (
            (options.OutputClass !== null) &&
            (options.OutputClass !== undefined))
        {
            this.OutputClass = options.OutputClass;
        }
    }

    /**
     * Gets or sets a value indicating whether the option is required.
     */
    public get Required(): boolean
    {
        return this.required;
    }

    /**
     * @inheritdoc
     */
    public set Required(value: boolean)
    {
        this.required = value;
    }

    /**
     * Gets or sets a value indicating whether users are ask for setting the option during registration.
     */
    public get AskOnRegistration(): boolean
    {
        return this.askOnRegistration;
    }

    /**
     * @inheritdoc
     */
    public set AskOnRegistration(value: boolean)
    {
        this.askOnRegistration = value;
    }

    /**
     * Gets or sets the permissions which are required for editing the option.
     */
    public get EditPermissions(): EditPermission
    {
        return this.editPermissions;
    }

    /**
     * @inheritdoc
     */
    public set EditPermissions(value: EditPermission)
    {
        this.editPermissions = value;
    }

    /**
     * Gets or sets the permissions which are required for viewing the option.
     */
    public get ViewPermissions(): ViewPermission
    {
        return this.viewPermissions;
    }

    /**
     * @inheritdoc
     */
    public set ViewPermissions(value: ViewPermission)
    {
        this.viewPermissions = value;
    }

    /**
     * Gets or sets a value indicating whether users can be searched by the value of the option.
     */
    public get Searchable(): boolean
    {
        return this.searchable;
    }

    /**
     * @inheritdoc
     */
    public set Searchable(value: boolean)
    {
        this.searchable = value;
    }

    /**
     * Gets or sets the php-class which formats the output of the option.
     *
     * The class must implement the `wcf\system\option\user\IUserOptionOutput` interface.
     */
    public get OutputClass(): string
    {
        return this.outputClass;
    }

    /**
     * @inheritdoc
     */
    public set OutputClass(value: string)
    {
        this.outputClass = value;
    }
}
