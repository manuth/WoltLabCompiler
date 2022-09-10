import { Instruction } from "./Instruction.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { InstructionSet } from "./InstructionSet.js";

/**
 * Provides options for the {@link InstructionSet `InstructionSet`} class.
 */
export interface IInstructionSetOptions
{
    /**
     * The directory to save the components of this set.
     */
    Directory?: string;

    /**
     * The instructions of the instruction-set.
     */
    Instructions: Instruction[];
}
