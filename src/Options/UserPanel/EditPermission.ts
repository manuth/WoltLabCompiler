/**
 * Specifies a permission-requirement for editing an option.
 */
export enum EditPermission
{
    /**
     * Indicates owners of the user the option is assigned to.
     */
    Owner = 1 << 0,

    /**
     * Indicates users with administrator-privileges.
     */
    Admin = 1 << 1,

    /**
     * Indicates owners during their registration.
     */
    OwnerOnRegistration = 1 << 2,

    /**
     * Indicates that all visitors have permissions.
     */
    All = Owner | Admin
}
