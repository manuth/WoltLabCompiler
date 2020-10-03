import { INode as INodeBase } from "../INode";

/**
 * Represents a node.
 */
export interface INode<T> extends INodeBase
{
    /**
     * Gets or sets the item of the node.
     */
    Item: T;

    /**
     * Gets or sets the parent of the node.
     */
    Parent: INode<T>;

    /**
     * Gets the children of the node.
     */
    Nodes: ReadonlyArray<INode<T>>;

    /**
     * Gets all nodes recursively.
     *
     * @returns
     * All nodes inside this node.
     */
    GetAllNodes(): ReadonlyArray<INode<T>>;
}
