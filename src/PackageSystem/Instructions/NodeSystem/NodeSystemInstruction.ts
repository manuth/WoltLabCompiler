import { Node } from "../../../NodeSystem/Node";
import { NodeItem } from "../../../NodeSystem/NodeItem";
import { Instruction } from "../Instruction";
import { INodeSystemInstruction } from "./INodeSystemInstruction";
import { INodeSystemInstructionOptions } from "./INodeSystemInstructionOptions";

/**
 * Represents an instruction which provides nodes.
 *
 * @template TItem
 * The type of the nodes.
 *
 * @template TOptions
 * The type of the options for generating nodes.
 */
export abstract class NodeSystemInstruction<TItem extends NodeItem, TOptions> extends Instruction implements INodeSystemInstruction<TItem>
{
    /**
     * The nodes provides by the instruction.
     */
    private nodes: Array<Node<TItem, TOptions>> = [];

    /**
     * Initializes a new instance of the {@link NodeSystemInstruction `NodeSystemInstruction<TItem, TOptions>`} class.
     *
     * @param options
     * The options for generating the object.
     *
     * @param generator
     * The generator-function for generating sub-nodes.
     */
    public constructor(options: INodeSystemInstructionOptions<TOptions>, generator: (node: Node<TItem, TOptions>, options: TOptions) => TItem)
    {
        super(options);

        for (let node of options.Nodes)
        {
            this.nodes.push(new Node<TItem, TOptions>(node, generator));
        }
    }

    /**
     * @inheritdoc
     */
    public get Nodes(): Array<Node<TItem, TOptions>>
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
