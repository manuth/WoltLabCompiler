import { INode } from "./Generic/INode";
import { INodeOptions } from "./INodeOptions";
import { NodeCollection } from "./NodeCollection";
import { NodeItem } from "./NodeItem";

/**
 * Represents a node.
 *
 * @template TItem
 * The type of the node-item.
 *
 * @template TOptions
 * The type of the options for generating nodes.
 */
export class Node<TItem extends NodeItem, TOptions> implements INode<TItem>
{
    /**
     * The id of the node.
     */
    private id: string = null;

    /**
     * The name of the node.
     */
    private name: string;

    /**
     * The item of the node.
     */
    private item: TItem = null;

    /**
     * The parent of the node.
     */
    private parent: Node<TItem, TOptions> = null;

    /**
     * The children of the node.
     */
    private nodes: Array<Node<TItem, TOptions>> = new NodeCollection(this);

    /**
     * Initializes a new instance of the {@link Node `Node<TItem, TOptions>`} class.
     *
     * @param options
     * The options for generating the object.
     *
     * @param generator
     * The generator-function for generating sub-nodes.
     */
    public constructor(options: INodeOptions<TOptions>, generator: (node: Node<TItem, TOptions>, options: TOptions) => TItem)
    {
        if (
            (options.ID !== null) &&
            (options.ID !== undefined))
        {
            this.ID = options.ID;
        }

        this.Name = options.Name;

        if (
            (options.Item !== null) &&
            (options.Item !== undefined))
        {
            this.item = generator(this, options.Item);
        }

        if (
            (options.Parent !== null) &&
            (options.Parent !== undefined))
        {
            this.Parent = new Node(options.Parent, generator);
        }

        if (
            (options.Nodes !== null) &&
            (options.Nodes !== undefined))
        {
            for (let node of options.Nodes)
            {
                this.Nodes.push(new Node(node, generator));
            }
        }
    }

    /**
     * Gets the parents of the node.
     */
    protected get Parents(): Array<Node<TItem, TOptions>>
    {
        let result: Array<Node<TItem, TOptions>> = [];

        for (let node: Node<TItem, TOptions> = this.Parent; node !== null; node = node.Parent)
        {
            result.push(node);
        }

        return result;
    }

    /**
     * Gets or sets the id of the node.
     */
    public get ID(): string
    {
        return this.id;
    }

    /**
     * @inheritdoc
     */
    public set ID(value: string)
    {
        this.id = value;
    }

    /**
     * Gets or sets the name of the node.
     */
    public get Name(): string
    {
        return this.name;
    }

    /**
     * @inheritdoc
     */
    public set Name(value: string)
    {
        this.name = value;
    }

    /**
     * Gets the full name of the node.
     */
    public get FullName(): string
    {
        return this.Parents.reverse().concat([this]).map((node: Node<TItem, TOptions>) => node.Name).join(".");
    }

    /**
     * @inheritdoc
     */
    public get Item(): TItem
    {
        return this.item;
    }

    /**
     * @inheritdoc
     */
    public get Parent(): Node<TItem, TOptions>
    {
        return this.parent;
    }

    /**
     * @inheritdoc
     */
    public set Parent(value: Node<TItem, TOptions>)
    {
        if (this.Parent !== value)
        {
            if (this.Parent?.Nodes.includes(this))
            {
                this.Parent.Nodes.splice(this.Parent.Nodes.indexOf(this), 1);
            }

            if (value?.Nodes.includes(this))
            {
                this.parent = value;
            }
            else
            {
                value.Nodes.push(this);
            }
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
     *
     * @returns
     * All nodes inside this node.
     */
    public GetAllNodes(): Array<Node<TItem, TOptions>>
    {
        let result: Array<Node<TItem, TOptions>> = [];
        result.push(this);

        for (let node of this.Nodes)
        {
            result.push(...node.GetAllNodes());
        }

        return result;
    }

    /**
     * @inheritdoc
     *
     * @returns
     * The objects of the node.
     */
    public GetObjects(): Record<string, unknown>
    {
        let result: Record<string, unknown> = {};

        if (this.ID)
        {
            result[this.ID] = this;
        }

        if (this.Item)
        {
            Object.assign(result, this.Item.GetObjects());
        }

        for (let node of this.Nodes)
        {
            Object.assign(result, node.GetObjects());
        }

        return result;
    }

    /**
     * Returns a string which represents the current object.
     *
     * @returns
     * A string which represents the object.
     */
    public toString(): string
    {
        return this.FullName;
    }
}
