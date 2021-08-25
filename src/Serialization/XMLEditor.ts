/**
 * Provides the functionality to edit xml-files.
 */
export class XMLEditor
{
    /**
     * The element to edit.
     */
    private element: Element;

    /**
     * Initializes a new instance of the {@link XMLEditor `XMLEditor`} class.
     *
     * @param element
     * The element to edit.
     */
    public constructor(element: Element)
    {
        this.element = element;
    }

    /**
     * Gets the name of the tag of the element.
     */
    public get TagName(): string
    {
        return this.Element.tagName;
    }

    /**
     * Gets the element to edit.
     */
    public get Element(): Element
    {
        return this.element;
    }

    /**
     * Gets or sets the text of the element.
     */
    public get TextContent(): string
    {
        return this.Element.textContent;
    }

    /**
     * @inheritdoc
     */
    public set TextContent(value: string)
    {
        this.Element.textContent = value;
    }

    /**
     * Gets the parent of the element.
     */
    public get ParentNode(): Node & ParentNode
    {
        return this.Element.parentNode;
    }

    /**
     * Gets the document of the element.
     */
    public get Document(): Document
    {
        return this.Element.ownerDocument;
    }

    /**
     * Gets the child-nodes of the element.
     */
    public get ChildNodes(): Node[]
    {
        return XMLEditor.ToArray(this.Element.childNodes);
    }

    /**
     * Creates a new element.
     *
     * @param tag
     * The tag of the element to create.
     *
     * @returns
     * The editor for the newly created element.
     */
    public CreateElement(tag: string): XMLEditor
    {
        return new XMLEditor(this.Document.createElement(tag));
    }

    /**
     * Creates a new element with the specified {@link textContent `textContent`} wrapped by a CDATA-section.
     *
     * @param tag
     * The tag of the element to create.
     *
     * @param textContent
     * The text to insert into the element.
     *
     * @returns
     * The editor for the newly created element.
     */
    public CreateCDATAElement(tag: string, textContent: string): XMLEditor
    {
        let result = this.CreateElement(tag);
        result.Add(this.Document.createCDATASection(textContent));
        return result;
    }

    /**
     * Creates a new element with the specified {@link textContent `textContent`}.
     *
     * @param tag
     * The tag of the element to create.
     *
     * @param textContent
     * The text to insert into the element.
     *
     * @returns
     * The editor for the newly created element.
     */
    public CreateTextElement(tag: string, textContent: string): XMLEditor
    {
        let result = this.CreateElement(tag);
        result.TextContent = textContent;
        return result;
    }

    /**
     * Adds a node.
     *
     * @template T
     * The type of the node to add.
     *
     * @param node
     * The node to add.
     */
    public Add<T extends Node | XMLEditor>(node: T): void
    {
        let element: Node;

        if (node instanceof XMLEditor)
        {
            element = node.Element;
        }
        else
        {
            element = node;
        }

        this.Element.appendChild(element);
    }

    /**
     * Inserts an element at a specific position.
     *
     * @param index
     * The index to insert the element.
     *
     * @param element
     * The element to insert.
     */
    public Insert(index: number, element: XMLEditor | Node): void
    {
        let node: Node;

        if (element instanceof XMLEditor)
        {
            node = element.Element;
        }
        else
        {
            node = element;
        }

        if (index === this.ChildNodes.length)
        {
            this.Add(node);
        }
        else if (index < this.ChildNodes.length)
        {
            this.Element.insertBefore(node, this.ChildNodes[index]);
        }
        else
        {
            throw new RangeError();
        }
    }

    /**
     * Gets all children of the element with a specified tag.
     *
     * @param tag
     * The tag to look for.
     *
     * @returns
     * The xml-editor of the children which were found.
     */
    public GetChildrenByTag(tag: string): XMLEditor[]
    {
        return XMLEditor.ToArray(this.Element.childNodes).filter(
            (childNode) => childNode.nodeType === this.Element.ELEMENT_NODE).map(
                (childNode) => new XMLEditor(childNode as Element)).filter(
                    (node: XMLEditor) => node.TagName === tag);
    }

    /**
     * Gets all elements with a specified tag.
     *
     * @param tag
     * The tag to look for.
     *
     * @returns
     * The xml-editor of the children which were found.
     */
    public GetElementsByTag(tag: string): XMLEditor[]
    {
        return XMLEditor.ToArray(this.Element.getElementsByTagName(tag)).map((element: Element) => new XMLEditor(element));
    }

    /**
     * Gets the value of an attribute.
     *
     * @param name
     * The name of the attribute to get.
     *
     * @returns
     * The value of the attribute.
     */
    public GetAttribute(name: string): string
    {
        if (this.HasAttribute(name))
        {
            return this.Element.getAttribute(name);
        }
        else
        {
            throw new RangeError(`The attribute "${name}" does not exist.`);
        }
    }

    /**
     * Sets the value of an attribute.
     *
     * @param name
     * The name of the attribute to set.
     *
     * @param value
     * The value to set.
     */
    public SetAttribute(name: string, value: string): void
    {
        this.Element.setAttribute(name, value);
    }

    /**
     * Gets a value indicating whether an attribute with the specified name exists.
     *
     * @param name
     * The name to look for.
     *
     * @returns
     * A value indicating whether an attribute with the specified {@link name `name`} exists.
     */
    public HasAttribute(name: string): boolean
    {
        return this.Element.hasAttribute(name);
    }

    /**
     * Converts a node-list to an array.
     *
     * @param nodeList
     * The node-list to convert.
     *
     * @template T
     * The type of the nodes.
     *
     * @returns
     * An array representing the specified {@link nodeList `nodeList`}.
     */
    protected static ToArray<T extends Node>(nodeList: Pick<NodeListOf<T>, "length" | "item">): T[]
    {
        let result: T[] = [];

        for (let i = 0; i < nodeList.length; i++)
        {
            result.push(nodeList.item(i));
        }

        return result;
    }
}
