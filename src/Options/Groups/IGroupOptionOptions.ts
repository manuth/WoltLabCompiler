import { IOptionOptions } from "../IOptionOptions.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { GroupOption } from "./GroupOption.js";

/**
 * Provides options for the {@link GroupOption `GroupOption`} class.
 */
export interface IGroupOptionOptions extends IOptionOptions
{
    /**
     * The default value for groups which apply to registered users.
     */
    UserDefaultValue?: any;

    /**
     * The default value for groups which have access to the moderation-section.
     */
    ModDefaultValue?: any;

    /**
     * The default value for groups with administrator permissions.
     */
    AdminDefaultValue?: any;

    /**
     * A value indicating whether the option can not be set for guests.
     */
    RegisteredOnly?: boolean;
}
