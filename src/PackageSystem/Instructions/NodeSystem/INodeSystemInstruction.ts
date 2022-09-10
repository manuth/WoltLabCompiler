import { INode } from "../../../NodeSystem/Generic/INode.js";
import { IInstruction } from "../IInstruction.js";

/**
 * Represents an instruction which provides nodes.
 */
export interface INodeSystemInstruction<T> extends IInstruction
{
    /**
     * Gets the nodes provides by the instruction.
     */
    Nodes: ReadonlyArray<INode<T>>;
}
