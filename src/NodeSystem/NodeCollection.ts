import { BidirectionalCollection } from "../Collections/BidirectionalCollection";
import { INode } from "./Generic/INode";
import { NodeItem } from "./NodeItem";

/**
 * Represents a collection of items.
 *
 * @template TNode
 * The type of the nodes.
 *
 * @template TItem
 * The type of the item provided by the nodes.
 */
export class NodeCollection<TNode extends INode<TItem>, TItem extends NodeItem> extends BidirectionalCollection<INode<TItem>, TNode>
{
    /**
     * Initializes a new instance of the {@link NodeCollection `NodeCollection<TNode, TItem>`} class.
     *
     * @param owner
     * The owner of the collection.
     */
    public constructor(owner: TNode)
    {
        super(owner);
    }

    /**
     * @inheritdoc
     *
     * @param child
     * The child whose parent to return.
     *
     * @returns
     * The parent of the {@link child `child`}.
     */
    protected GetParent(child: TNode): INode<TItem>
    {
        return child?.Parent;
    }

    /**
     * @inheritdoc
     *
     * @param child
     * The child whose parent is to be set.
     *
     * @param parent
     * The parent to set.
     */
    protected SetParent(child: INode<TItem>, parent: TNode): void
    {
        child.Parent = parent;
    }
}
