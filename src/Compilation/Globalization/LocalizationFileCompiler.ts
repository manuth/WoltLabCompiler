import { XMLEditor } from "../../Serialization/XMLEditor";
import { WoltLabXMLCompiler } from "../WoltLabXMLCompiler";

/**
 * Provides the functionality to compile localization-files.
 */
export class LocalizationFileCompiler extends WoltLabXMLCompiler<[string, Record<string, Record<string, string>>]>
{
    /**
     * Initializes a new instance of the `LocalizationFileCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: [string, Record<string, Record<string, string>>])
    {
        super(item);
    }

    /**
     * @inheritdoc
     */
    protected get TagName(): string
    {
        return "language";
    }

    /**
     * @inheritdoc
     */
    protected get SchemaLocation(): string
    {
        return "http://www.woltlab.com/XSD/tornado/language.xsd";
    }

    /**
     * @inheritdoc
     *
     * @returns
     * The serialized document.
     */
    protected CreateDocument(): Document
    {
        let document: Document = super.CreateDocument();
        let editor: XMLEditor = new XMLEditor(document.documentElement);

        editor.SetAttribute("languagecode", this.Item[0]);

        for (let categoryName of Object.keys(this.Item[1]))
        {
            editor.AddElement(
                "category",
                (category: XMLEditor) =>
                {
                    category.SetAttribute("name", categoryName);

                    for (let messageName of Object.keys(this.Item[1][categoryName]))
                    {
                        category.AddCDATAElement("item", this.Item[1][categoryName][messageName], (item: XMLEditor) => item.SetAttribute("name", messageName));
                    }
                });
        }

        return document;
    }
}
