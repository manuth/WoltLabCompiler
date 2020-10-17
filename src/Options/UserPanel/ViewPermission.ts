/**
 * Specifies a permission-requirement for viewing an option.
 */
export enum ViewPermission
{
    /**
     * Indicates the owner of the user the option is assigned to.
     */
    Owner = 1 << 0,

    /**
     * Indicates users with administrator-privileges.
     */
    Admin = 1 << 1,

    /**
     * Indicates registeres users.
     */
    RegisteredUser = 1 << 2,

    /**
     * Indicates visitors which are not registered.
     */
    Guest = 1 << 3,

    /**
     * Indicates that all visitors have view permissions.
     */
    All = Owner | Admin | RegisteredUser | Guest
}
