import { XMLEditor } from "../../Serialization/XMLEditor";
import { WoltLabXMLCompiler } from "../WoltLabXMLCompiler";

/**
 * Provides the functionality to compile localization-files.
 */
export class LocalizationFileCompiler extends WoltLabXMLCompiler<[string, Record<string, Record<string, string>>]>
{
    /**
     * Initializes a new instance of the {@link LocalizationFileCompiler `LocalizationFileCompiler`} class.
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
    protected override get TagName(): string
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
    protected override CreateDocument(): Document
    {
        let document: Document = super.CreateDocument();
        let editor: XMLEditor = new XMLEditor(document.documentElement);

        editor.SetAttribute("languagecode", this.Item[0]);

        for (let categoryName of Object.keys(this.Item[1]))
        {
            let categoryElement = editor.CreateElement("category");
            categoryElement.SetAttribute("name", categoryName);
            editor.Add(categoryElement);

            for (let messageName of Object.keys(this.Item[1][categoryName]))
            {
                let itemElement = categoryElement.CreateCDATAElement("item", this.Item[1][categoryName][messageName]);
                itemElement.SetAttribute("name", messageName);
                categoryElement.Add(itemElement);
            }
        }

        return document;
    }
}
