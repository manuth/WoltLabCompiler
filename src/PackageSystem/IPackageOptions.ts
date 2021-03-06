import { ILocalization } from "../Globalization/ILocalization";
import { IComponentOptions } from "./IComponentOptions";
import { IConflictingPackageDescriptorOptions } from "./IConflictingPackageDescriptorOptions";
import { IFileDescriptorOptions } from "./IFileDescriptorOptions";
import { IInstructionSetOptions } from "./Instructions/IInstructionSetOptions";
import { IUpdateInstructionSetOptions } from "./Instructions/IUpdateInstructionSetOptions";
import { IPackageFileDescriptorOptions } from "./IPackageFileDescriptorOptions";
import { IRequiredPackageDescriptorOptions } from "./IRequiredPackageDescriptorOptions";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Package } from "./Package";

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
