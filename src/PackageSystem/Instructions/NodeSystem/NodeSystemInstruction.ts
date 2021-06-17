import { Node } from "../../../NodeSystem/Node";
import { NodeItem } from "../../../NodeSystem/NodeItem";
import { Instruction } from "../Instruction";
import { INodeSystemInstruction } from "./INodeSystemInstruction";
import { INodeSystemInstructionOptions } from "./INodeSystemInstructionOptions";

/**
 * Represents an instruction which provides nodes.
 */
export abstract class NodeSystemInstruction<T extends NodeItem, TOptions> extends Instruction implements INodeSystemInstruction<T>
{
    /**
     * The nodes provides by the instruction.
     */
    private nodes: Array<Node<T, TOptions>> = [];

    /**
     * Initializes a new instance of the {@link NodeSystemInstruction `NodeSystemInstruction<T, TOptions>`} class.
     *
     * @param options
     * The options for generating the object.
     *
     * @param generator
     * The generator-function for generating sub-nodes.
     */
    public constructor(options: INodeSystemInstructionOptions<TOptions>, generator: (node: Node<T, TOptions>, options: TOptions) => T)
    {
        super(options);

        for (let node of options.Nodes)
        {
            this.nodes.push(new Node<T, TOptions>(node, generator));
        }
    }

    /**
     * @inheritdoc
     */
    public get Nodes(): Array<Node<T, TOptions>>
    {
        return this.nodes;
    }

    /**
     * @inheritdoc
     */
    public override get ObjectsByID(): Record<string, unknown>
    {
        let result: Record<string, unknown> = {};

        for (let node of this.Nodes)
        {
            Object.assign(result, node.GetObjects());
        }

        return result;
    }
}
