/**
 * Represents a collection which is bidirectional.
 */
export abstract class BidirectionalCollection<TParent, TChild> extends Array<TChild>
{
    /**
     * The owner of the collection.
     */
    private owner: TParent;

    /**
     * Initializes a new instance of the `BidirectionalCollection<TParent, TChild>` class.
     *
     * @param owner
     * The owner of the collection.
     */
    public constructor(owner: TParent)
    {
        super();
        this.owner = owner;
    }

    /**
     * Gets the owner of the collection.
     */
    public get Owner(): TParent
    {
        return this.owner;
    }

    /**
     * @inheritdoc
     *
     * @param items
     * The new elements of the Array.
     *
     * @returns
     * The new length of the array.
     */
    public override push(...items: TChild[]): number
    {
        for (let item of items)
        {
            this.Add(item);
        }

        return this.length;
    }

    /**
     * @inheritdoc
     *
     * @returns
     * The removed item.
     */
    public override pop(): TChild
    {
        let index = this.length - 1;
        let result = this[index];
        return this.Remove(index) ? result : undefined;
    }

    /**
     * @inheritdoc
     *
     * @returns
     * The removed element.
     */
    public override shift(): TChild
    {
        let index = 0;
        let result = this[index];
        return this.Remove(index) ? result : undefined;
    }

    /**
     * @inheritdoc
     *
     * @param items
     * Elements to insert at the start of the Array.
     *
     * @returns
     * The new length of the array.
     */
    public override unshift(...items: TChild[]): number
    {
        for (let item of items)
        {
            this.Add(item);
        }

        return this.length;
    }

    /**
     * Gets the parent of a child.
     *
     * @param child
     * The child whose parent to return.
     *
     * @returns
     * The parent of the `child`.
     */
    protected abstract GetParent(child: TChild): TParent;

    /**
     * Sets the parent of a child.
     *
     * @param child
     * The child whose parent is to be set.
     *
     * @param parent
     * The parent to set.
     */
    protected abstract SetParent(child: TChild, parent: TParent): void;

    /**
     * Securely adds an item.
     *
     * @param item
     * The item to add.
     *
     * @returns
     * A value indicating whether the item could be added.
     */
    protected Add(item: TChild): boolean
    {
        if (this.GetParent(item) !== this.Owner)
        {
            super.push(item);

            if (item)
            {
                this.SetParent(item, this.Owner);
            }

            return true;
        }
        else
        {
            return false;
        }
    }

    /**
     * Securely removes an item.
     *
     * @param index
     * The index of the item to remove.
     *
     * @returns
     * A value indicating whether the element could be removed.
     */
    protected Remove(index: number): boolean
    {
        let item = this[index];

        if (this.GetParent(item) === this.Owner)
        {
            super.splice(index, 1);

            if (item)
            {
                this.SetParent(item, null);
            }

            return true;
        }
        else
        {
            return false;
        }
    }
}
