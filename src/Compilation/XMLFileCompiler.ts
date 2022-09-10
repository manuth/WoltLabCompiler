import { XMLSerializer } from "@xmldom/xmldom";
import fs from "fs-extra";
import { XML } from "../Serialization/XML.js";
import { Compiler } from "./Compiler.js";

const { ensureFile, writeFile } = fs;

/**
 * Provides the functionality to compile components to `.xml`-files.
 *
 * @template T
 * The type of the item which can be compiled by this compiler.
 */
export abstract class XMLFileCompiler<T> extends Compiler<T>
{
    /**
     * Initializes a new instance of the {@link XMLFileCompiler `XMLFileCompiler<T>`} class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: T)
    {
        super(item);
    }

    /**
     * Gets the tag-name of the document-element of the `xml`-document.
     */
    protected abstract get TagName(): string;

    /**
     * @inheritdoc
     */
    protected async Compile(): Promise<void>
    {
        await ensureFile(this.DestinationPath);
        await writeFile(this.DestinationPath, this.Content);
    }

    /**
     * Gets the compiled `xml`-document of the component.
     */
    protected get Document(): Document
    {
        return this.CreateDocument();
    }

    /**
     * Gets the content of the `xml`-element as a string.
     */
    protected get Content(): string
    {
        return XML.Format(new XMLSerializer().serializeToString(this.Document));
    }

    /**
     * Creates the document to compile.
     *
     * @returns
     * The serialized document.
     */
    protected CreateDocument(): Document
    {
        return XML.CreateDocument(this.TagName);
    }
}
