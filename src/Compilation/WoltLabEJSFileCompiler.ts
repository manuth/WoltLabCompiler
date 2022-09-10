import { WoltLabXMLCompiler } from "./WoltLabXMLCompiler.js";

/**
 * Provides the functionality to compile `.xml`-files which contain `ejs`-strings.
 *
 * @template T
 * The type of the item which can be compiled by this compiler.
 */
export abstract class WoltLabEJSFileCompiler<T> extends WoltLabXMLCompiler<T>
{
    /**
     * Initializes a new instance of the {@link WoltLabEJSFileCompiler `WoltLabEJSFileCompiler<T>`} class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: T)
    {
        super(item);
    }

    /**
     * Gets the delimiter of the EJS-strings inside the document.
     */
    protected get Delimiter(): string
    {
        return "%";
    }

    /**
     * Gets the pattern to match against the document.
     */
    protected get Pattern(): RegExp
    {
        return new RegExp(`<${this.Delimiter}.*?${this.Delimiter}>`, "g");
    }

    /**
     * @inheritdoc
     */
    protected override get Document(): Document
    {
        let document = super.Document;
        this.FixEJSTags(document);
        return document;
    }

    /**
     * Fixes the ejs-tags inside the node.
     *
     * @param node
     * The node to fix.
     */
    protected FixEJSTags(node: Node): void
    {
        switch (node.nodeType)
        {
            case node.TEXT_NODE:
                if (this.Pattern.test(node.textContent))
                {
                    node.parentNode.replaceChild(node.ownerDocument.createCDATASection(node.textContent), node);
                }
                break;
            default:
                if (node.hasChildNodes())
                {
                    for (let i = 0; i < node.childNodes.length; i++)
                    {
                        let child = node.childNodes.item(i);
                        this.FixEJSTags(child);
                    }
                }
                break;
        }
    }
}
