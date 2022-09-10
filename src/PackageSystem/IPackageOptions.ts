import { ILocalization } from "../Globalization/ILocalization.js";
import { IComponentOptions } from "./IComponentOptions.js";
import { IConflictingPackageDescriptorOptions } from "./IConflictingPackageDescriptorOptions.js";
import { IFileDescriptorOptions } from "./IFileDescriptorOptions.js";
import { IInstructionSetOptions } from "./Instructions/IInstructionSetOptions.js";
import { IUpdateInstructionSetOptions } from "./Instructions/IUpdateInstructionSetOptions.js";
import { IPackageFileDescriptorOptions } from "./IPackageFileDescriptorOptions.js";
import { IRequiredPackageDescriptorOptions } from "./IRequiredPackageDescriptorOptions.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Package } from "./Package.js";
import { VersionNumber } from "./VersionNumber.js";

/**
 * Provides options for the {@link Package `Package`} class.
 */
export interface IPackageOptions extends Partial<IComponentOptions>
{
    /**
     * The identifier of the package.
     */
    Identifier: string;

    /**
     * @inheritdoc
     */
    DisplayName: ILocalization;

    /**
     * @inheritdoc
     */
    Version: VersionNumber;

    /**
     * The API-Version of the package.
     *
     * @deprecated
     */
    APIVersion?: string;

    /**
     * A set of files which will be added to the package.
     */
    AdditionalFiles?: IFileDescriptorOptions[];

    /**
     * A set of packages which are required by this package.
     */
    RequiredPackages?: IRequiredPackageDescriptorOptions[];

    /**
     * A set of packages which cause a conflict with this package.
     */
    ConflictingPackages?: IConflictingPackageDescriptorOptions[];

    /**
     * A set of packages which can be installed additionally.
     */
    OptionalPackages?: Array<Required<IPackageFileDescriptorOptions>>;

    /**
     * A set of instructions for installing the package.
     */
    InstallSet: IInstructionSetOptions;

    /**
     * A set of instructions to execute when updating from a specific version.
     */
    UpdateSets?: IUpdateInstructionSetOptions[];
}
