import { Instruction } from "./Instruction";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InstructionSet } from "./InstructionSet";

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
