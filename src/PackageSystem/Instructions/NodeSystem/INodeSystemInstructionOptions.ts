import { INodeOptions } from "../../../NodeSystem/INodeOptions.js";
import { IInstructionOptions } from "../IInstructionOptions.js";

/**
 * Represents an instruction which provides nodes.
 */
export interface INodeSystemInstructionOptions<T> extends IInstructionOptions
{
    /**
     * The nodes provided by the instruction.
     */
    Nodes: Array<INodeOptions<T>>;
}
