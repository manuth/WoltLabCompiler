import { IInstructionSetOptions } from "./IInstructionSetOptions.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { UpdateInstructionSet } from "./UpdateInstructionSet.js";

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
