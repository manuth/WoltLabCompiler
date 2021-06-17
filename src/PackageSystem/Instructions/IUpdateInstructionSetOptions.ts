import { IInstructionSetOptions } from "./IInstructionSetOptions";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UpdateInstructionSet } from "./UpdateInstructionSet";

/**
 * Provides options for the {@link UpdateInstructionSet `UpdateInstructionSet`} class.
 */
export interface IUpdateInstructionSetOptions extends IInstructionSetOptions
{
    /**
     * The version to update the package from.
     */
    FromVersion: string;
}
