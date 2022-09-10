import { IOptionOptions } from "../IOptionOptions.js";
import { EditPermission } from "./EditPermission.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserOption } from "./UserOption.js";
import { ViewPermission } from "./ViewPermission.js";

/**
 * Provides options for the {@link UserOption `UserOption`} class.
 */
export interface IUserOptionOptions extends IOptionOptions
{
    /**
     * A value indicating whether the option is required.
     */
    Required?: boolean;

    /**
     * A value indicating whether users are ask for setting the option during registration.
     */
    AskOnRegistration?: boolean;

    /**
     * The permissions which are required for editing the option.
     */
    EditPermissions: EditPermission;

    /**
     * The permissions which are required for viewing the option.
     */
    ViewPermissions: ViewPermission;

    /**
     * A value indicating whether users can be searched by the value of the option.
     */
    Searchable?: boolean;

    /**
     * The php-class which formats the output of the option.
     *
     * The class must implement the `wcf\system\option\user\IUserOptionOutput` interface.
     */
    OutputClass?: string;
}
