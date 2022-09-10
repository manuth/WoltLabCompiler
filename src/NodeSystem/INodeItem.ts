import { INode } from "./INode.js";

/**
 * Represents an item of a node.
 */
export interface INodeItem
{
    /**
     * The node of the item.
     */
    Node: INode;

    /**
     * Gets the identifiable objects of the node.
     */
    GetObjects(): Record<string, unknown>;
}
