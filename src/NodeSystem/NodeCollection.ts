import { BidirectionalCollection } from "../Collections/BidirectionalCollection";
import { INode } from "./Generic/INode";
import { NodeItem } from "./NodeItem";

/**
 * Represents a collection of items.
 */
export class NodeCollection<T extends INode<TItem>, TItem extends NodeItem> extends BidirectionalCollection<INode<TItem>, T>
{
    /**
     * Initializes a new instance of the {@link NodeCollection `NodeCollection<T, TItem>`} class.
     *
     * @param owner
     * The owner of the collection.
     */
    public constructor(owner: T)
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
     * The parent of the `child`.
     */
    protected GetParent(child: T): INode<TItem>
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
    protected SetParent(child: INode<TItem>, parent: T): void
    {
        child.Parent = parent;
    }
}
