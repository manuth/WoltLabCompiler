// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Instruction } from "./Instruction.js";

/**
 * Provides options for the {@link Instruction `Instruction`} class.
 */
export interface IInstructionOptions
{
    /**
     * The name of the file to save the compiled instruction to.
     */
    FileName: string;

    /**
     * A value indicating whether the instruction should be executed in standalone-mode.
     */
    Standalone?: boolean;
}
