import { EJSFileCompiler } from "./EJSFileCompiler";

/**
 * Provides the functionality to compile components to `xml`-files optimized for woltlab.
 *
 * @template T
 * The type of the item which can be compiled by this compiler.
 */
export abstract class WoltLabXMLCompiler<T> extends EJSFileCompiler<T>
{
    /**
     * Initializes a new instance of the {@link WoltLabXMLCompiler `WoltLabXMLCompiler<T>`} class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: T)
    {
        super(item);
    }

    /**
     * @inheritdoc
     */
    protected get TagName(): string
    {
        return "data";
    }

    /**
     * Gets the location of the schema for the instruction.
     */
    protected abstract get SchemaLocation(): string;

    /**
     * @inheritdoc
     *
     * @returns
     * The serialized document.
     */
    protected override CreateDocument(): Document
    {
        let document: Document = super.CreateDocument();
        document.documentElement.setAttribute("xmlns", "http://www.woltlab.com");
        document.documentElement.setAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instace");
        document.documentElement.setAttribute("xsi:schemaLocation", `http://www.woltlab.com ${this.SchemaLocation}`);
        return document;
    }
}
