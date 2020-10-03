import { INode } from "./INode";

/**
 * Represents an item of a node.
 */
export class NodeItem
{
    /**
     * The node of the item.
     */
    private node: INode;

    /**
     * Initializes a new instance of the `NodeItem` class.
     *
     * @param node
     * The node of the item.
     */
    public constructor(node: INode)
    {
        this.node = node;
    }

    /**
     * Gets or sets the node of the item.
     */
    public get Node(): INode
    {
        return this.node;
    }

    /**
     * Gets the identifiable objects of the node.
     *
     * @returns
     * The objects of the node.
     */
    public GetObjects(): Record<string, unknown>
    {
        return {};
    }
}
